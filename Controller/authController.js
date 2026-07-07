import User from "../Models/User.js";
import { createUser } from "../Service/authService.js";

const signUP = async (req, res) => {
  try {
    const userData = req.body;

    if (
      !userData.name ||
      !userData.email ||
      !userData.password ||
      !userData.phoneNumber
    ) {
      return res.status(501).json("All Fields required to signup");
    }

    if (userData.phoneNumber.length != 10) {
      return res.status(501).json("Phone Number need to be 10 digit");
    }

    const user = await createUser(userData);

    res.status(201).json({
      success: true,
      message: "Check the email to verify the OTP",
    });
  } catch (error) {
    return res.status(501).json({
      success: false,
      message: error.message,
    });
  }
};

export default { signUP };
