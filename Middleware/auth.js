import User from "../Models/User.js";
import { verifyToken } from "../utils/token.js";

const auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).send("User is not authenticated");
    }

    const decode = verifyToken(token);
    const user = await User.findById(decode.userID);

    if (!user) {
      return res.status(400).send("User is not found");
    }

    req.user = decode;

    next();
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export { auth };
