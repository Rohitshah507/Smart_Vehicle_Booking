import bcrypt from "bcryptjs"

import User from "../Models/User.js";


const createUser = async (data) => {
  const existingUser = await User.findOne({ email: data.email });
  if (existingUser) {
    throw { StatusCode: 400, message: "Email with this already exist" };
  }

  const hashedPassword = await bcrypt.hash(data.password, 10);

  const createdUser = await User.create({
    name: data.name,
    email: data.email,
    phoneNumber: data.phoneNumber,
    password: hashedPassword,
  });

  return createdUser;
};

export { createUser };
