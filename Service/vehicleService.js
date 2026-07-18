import Vehicle from "../Models/Vehicle.js";

const vehicleService = async (data, user) => {
  const upperCase = data.vehicleNumber.trim().toUpperCase();

  const vehicle = await Vehicle.findOne({ vehicleNumber: upperCase });

  if (vehicle) {
    throw { statusCode: 400, message: "Vehicle is already registered" };
  }

  const createdVehicle = await Vehicle.create({
    owner: user,
    vehicleType: data.vehicleType,
    vehicleNumber: upperCase,
    vehicleModel: data.vehicleModel,
    waitingCharge: data.waitingCharge,
    vehicleStatus: "Pending",
  });

  return createdVehicle;
};

const getVehicleService = async (userId) => {
  const vehicle = await Vehicle.findOne({
    owner: userId,
  }).populate("User", "name email");

  return vehicle;
};

export { vehicleService, getVehicleService };
