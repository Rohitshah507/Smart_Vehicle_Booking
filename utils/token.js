import config from "../Config/Config.js";
import jwt from "jsonwebtoken";

const generateToken = async (data) => {
  return jwt.sign(data, config.jwt_secret, { expiresIn: "2days" });
};

export {generateToken}