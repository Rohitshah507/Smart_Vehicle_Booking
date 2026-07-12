import config from "../Config/Config.js";
import jwt from "jsonwebtoken";

const generateToken = async (data) => {
  return jwt.sign(data, config.jwt_secret, { expiresIn: "2days" });
};

const verifyToken = async (token) => {
  const decodeToken = await new Promise((resolve, reject) => {
    jwt.verify(token, config.jwt_secret, (err, decoded) => {
      if (err) {
        return reject(err);
      }
      return resolve(decoded);
    });
    return decodeToken;
  });
};

export { generateToken, verifyToken };
