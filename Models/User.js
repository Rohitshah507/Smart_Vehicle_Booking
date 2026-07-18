import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      validate: {
        validator: (value) => {
          const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
          return emailRegex.test(value);
        },
        message: (email) => {
          return `${email.value} is not a valid email address`;
        },
      },
    },
    phoneNumber: {
      type: Number,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      minlength: [8, "Password must be at least 8 characters long"],
      required: true,
    },
    address: {
      street: String,
      city: String,
    },
    role: {
      type: String,
      enum: ["User", "Partner", "Admin"],
      default: "User",
    },
    partnerOnBoardingSteps: {
      type: Number,
      min: 0,
      max: 8,
      default: 0,
    },
    verificationCode: {
      type: Number,
    },
    verificationCodeExpiryTime: {
      type: Date,
      index: {
        expireAfterSeconds: 0,
      },
    },
    isOTPVerified: {
      type: Boolean,
      default: false,
    },
    isLoggedIn: {
      type: Boolean,
      default: false,
    },
    token: {
      type: String,
    },
    resetPasswordCode: {
      type: Number,
    },
    resetCodeExpiry: {
      type: Date,
    },
  },
  { timestamps: true },
);

const User = mongoose.model("User", userSchema);

export default User;
