import express from "express";
import authController from "../Controller/authController.js";

const router = express.Router();

router.post("/signup", authController.signUP);
router.post("/verifyEmail", authController.verifyEmail);
router.post("/login", authController.login);

export default router;