import User from "../Models/User.js";
import {
  vehicleService,
  getVehicleService,
} from "../Service/vehicleService.js";

const vehicleController = async (req, res) => {
  try {
    const data = req.body;

    const user = await User.findOne({ _id: req.user._id });

    if (!data.vehicleType || !data.vehicleNumber || !data.vehicleModel) {
      return res.status(400).json({
        success: false,
        message: "All data is required",
      });
    }

    const vehicle = await vehicleService(data, req.user._id);
    if (user.partnerOnBoardingSteps < 1 || user.role !== "Partner") {
      if (user.partnerOnBoardingSteps < 1) {
        user.partnerOnBoardingSteps = 1;
      }
      user.role = "Driver";
      await user.save();
    }

    res.status(201).json({
      success: true,
      message: "Vehicle Created Successfully",
      vehicle,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getVehicles = async (req, res) => {
  try {
    const data = await getVehicleService(req.user._id);
    res.status(201).json({
      success: true,
      data,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export { vehicleController, getVehicles };
