import bcrypt from "bcryptjs";

import User from "../Models/User.js";
import {
  generateResetCode,
  generateVerificationCode,
  sendResetCode,
  sendVerificationCode,
} from "../utils/otpCode.js";

const createUser = async (data) => {
  const existingUser = await User.findOne({ email: data.email });
  if (existingUser) {
    throw { statusCode: 400, message: "Email with this already exist" };
  }

  const generateCode = await generateVerificationCode();
  const hashedPassword = await bcrypt.hash(data.password, 10);

  const createdUser = await User.create({
    name: data.name,
    email: data.email,
    phoneNumber: data.phoneNumber,
    password: hashedPassword,
    address: data.address,
    role: data.role || "User",
    partnerOnBoardingSteps: 0,
    isLoggedIn: false,
    resetPasswordCode: null,
    resetCodeExpiry: null,
    verificationCode: generateCode,
    verificationCodeExpiryTime: Date.now() + 5 * 60 * 1000,
  });

  await sendVerificationCode(createdUser.email, createdUser.verificationCode);

  const userData = {
    _id: createdUser._id,
    name: createdUser.name,
    phoneNumber: createdUser.phoneNumber,
  };

  return userData;
};

const loginService = async (data) => {
  const user = await User.findOne({ email: data.email }).select("+password");

  if (!user) {
    throw { statusCode: 404, message: "User not Found" };
  }

  const isMatch = await bcrypt.compare(data.password, user.password);

  if (!isMatch) {
    throw { statusCode: 404, message: "Invalid Credentials" };
  }

  return user;
};

const resetOTPService = async (email) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw { statusCode: 401, message: "User is not Found" };
  }
  const resetCode = generateResetCode();
  const resetExpiry = Date.now() + 5 * 60 * 1000;

  user.resetPasswordCode = resetCode;
  user.resetCodeExpiry = resetExpiry;
  user.isOTPVerified = false;
  await user.save();

  await sendResetCode(user.email, resetCode);

  return {
    message: `Reset Code sent Successfully to ${user.email}`,
  };
};

const resetPasswordService = async (data) => {
  const user = await User.findOne({ email: data.email });

  if (user.isOTPVerified != true) {
    throw { statusCode: 401, message: "OTP needs to verify" };
  }

  const hashedPassword = await bcrypt.hash(data.newPassword, 10);

  user.password = hashedPassword;
  await user.save();

  return {
    success: true,
    message: "Password Reset Successfully",
  };
};

export { createUser, loginService, resetOTPService, resetPasswordService };
