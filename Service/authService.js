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

const loginService = async (data) => {
  const user = await User.findOne({email: data.email}).select("+password");

  if(!user){
    throw {statusCode:404, message:"User not Found"};
  }
  console.log(user.email)

  const isMatch = await bcrypt.compare(data.password, user.password);

  if(!isMatch){
    throw{StatusCode:404, message:"Invalid Credentials"}
  }

  return user;
}

export { createUser, loginService };
