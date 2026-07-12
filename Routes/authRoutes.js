import express from "express";
import authController from "../Controller/authController.js";

const router = express.Router();

router.post("/signup", authController.signUP);
router.post("/verifyEmail", authController.verifyEmail);
router.post("/login", authController.login);
router.post("/resetOTP", authController.resetOTP)
router.post("/verifyResetOTP", authController.verifyResetOTP)
router.post("/resetPassword", authController.resetPassword)

export default router;