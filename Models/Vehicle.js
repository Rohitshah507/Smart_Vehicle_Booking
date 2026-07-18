import mongoose from "mongoose";

const vehicleSchema = new mongoose.Schema(
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    vehicleType: {
      type: String,
      enum: ["Bike", "Car", "Bus"],
      required : true
    },
    vehicleNumber:{
      type: String,
      required: true,
      unique: true
    },
    vehicleModel: {
      type: String,
      default: null,
      required : true
    },
    waitingCharge: {
      type: Number,
      default: null
    },
    vehicleStatus: {
      type: String,
      enum: ["Approved", "Reject", "Pending"],
      default: "Pending",
    },
  },
  { timestamps: true },
);

const Vehicle = mongoose.model("Vehicle", vehicleSchema);

export default Vehicle;
