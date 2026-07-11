import User from "../Models/User.js";
import { createUser, loginService } from "../Service/authService.js";
import { generateToken } from "../utils/token.js";

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

const verifyEmail = async (req, res) => {
  try {
    const { email, verificationCode } = req.body;

    if (!email) {
      return res.status(501).json("Email is required to verify the OTP");
    }

    const user = await User.findOne({ email: email });

    if (!user) {
      return res.status(404).json("User not found");
    }

    if (user.isOTPVerified) {
      return res.status(400).json("User already verified");
    }

    if (user.verificationCode != verificationCode) {
      return res.status(400).json("Invalid verification code");
    }

    if (user.verificationCodeExpiryTime < Date.now()) {
      return res.status(400).json("Verification Code has Expired");
    }

    user.verificationCode = null;
    user.verificationCodeExpiryTime = null;
    user.isOTPVerified = true;
    await user.save();

    res.status(201).json({
      success: true,
      message: "Verified Successfully",
    });
  } catch (error) {
    return res.status(501).json({
      success: false,
      message: error.message,
    });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success:false,
        message: "Email and password are required"
      });
    }

    const user = await loginService({email, password});

    if (!user.isOTPVerified) {
      return res.status(400).json("OTP is not verify yet");
    }

    const token = await generateToken({ userID: user._id });

    res.cookie("authToken", token, {
      httpOnly: true,
      secure: false,
      sameSite: "strict",
    });

    user.isLoggedIn = true;
    await user.save();

    res.status(200).json({
      success: true,
      message: "Login Successfully",
      User: {
        _id: user._id,
        name: user.name,
        email: user.email,
        phoneNumber: user.phoneNumber,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success:false,
      message: `Error ${error.message}`
    })
  }
};

export default { signUP, verifyEmail, login };
