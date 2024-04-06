const express = require("express");
const router = express.Router();
const authMiddleware = require("../authMiddleware");
const Vehicle = require("../models/vehicle");

router.post("/", authMiddleware, async (req, res) => {
  try {
    const jsonData = req.body;

    const userId = req.user._id;

    const vehicle = new Vehicle({ ...jsonData, owner: userId });
    await vehicle.save();
    res.status(200).json({ message: "Vehicle registration was successful" });
  } catch (error) {
    res.status(500).json({
      error:
        "Internal server error registration failed. Try again in a few moments.",
    });
  }
});

router.get("/", authMiddleware, async (req, res) => {
  try {
    const userId = req.user._id;
    const userVehicles = await Vehicle.find({ owner: userId });
    res.status(200).json({ vehicles: userVehicles });
  } catch (error) {
    res.status(500).json({
      error: "Internal server error. Try again in a few moments.",
    });
  }
});

module.exports = router;
