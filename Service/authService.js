import bcrypt from "bcryptjs";

import User from "../Models/User.js";
import {
  generateVerificationCode,
  sendVerificationCode,
} from "../utils/otpCode.js";

const createUser = async (data) => {
  const existingUser = await User.findOne({ email: data.email });
  if (existingUser) {
    throw { StatusCode: 400, message: "Email with this already exist" };
  }

  const generateCode = await generateVerificationCode();
  const hashedPassword = await bcrypt.hash(data.password, 10);

  const createdUser = await User.create({
    name: data.name,
    email: data.email,
    phoneNumber: data.phoneNumber,
    password: hashedPassword,
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

export { createUser };
