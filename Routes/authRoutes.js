import express from "express";
import authController from "../Controller/authController.js";

const router = express.Router();

console.log("Here is")
router.post("/signup", authController.signUP);

export default router;