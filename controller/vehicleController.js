import Vehicle from "../model/vehicleModel.js";

const vehicleController = {
  createVehicle: async (req, res) => {
    try {
      const { date, comment, vehicleName, vehicleModel, location, amount } =
        req.body;
      if (
        !date ||
        !comment ||
        !vehicleName ||
        !vehicleModel ||
        !location ||
        !amount
      ) {
        return res.status(201).json({ message: "Required fields issing !!" });
      }
      const newVehicle = new Vehicle({
        date,
        comment,
        vehicleName,
        vehicleModel,
        location,
        amount,
      });
      await newVehicle.save();
      res.status(201).json({ message: "Successfully data added" });
    } catch (error) {
      res.status(500).json({ error: "Internal server" });
    }
  },
  getAllVehicle: async (req, res) => {
    try {
      const getData = await Vehicle.find();
      res.status(200).json(getData);
    } catch (error) {
      res.status(500).json({ error: "Failed to get the data" });
    }
  },
};
export default vehicleController;
