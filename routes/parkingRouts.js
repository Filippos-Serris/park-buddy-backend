const express = require("express");
const router = express.Router();
const authMiddleware = require("../authMiddleware");
const Parking = require("../models/parking");

router.post("/", authMiddleware, async (req, res) => {
  try {
    const jsonData = req.body;

    const userId = req.user._id;

    const parking = new Parking({
      ...jsonData,
      availableSlots: {
        car: jsonData.slots.car,
        moto: jsonData.slots.moto,
      },
      owner: userId,
    });
    await parking.save();
    res.status(200).json({ message: "Registration successful" });
  } catch (error) {
    res.status(500).json({
      error:
        "Internal server error registration failed. Try again in a few moments.",
    });
  }
});

router.get("/details", authMiddleware, async (req, res) => {
  try {
    const parkingId = req.query.parkingId;

    const parking = await Parking.find({ _id: parkingId });
    console.log(parking);
    res.status(200).json({ parkingData: parking });
  } catch (error) {
    console.error("Error retrieving parking data:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/", authMiddleware, async (req, res) => {
  try {
    const city = req.query.city;
    //const arrivalDate = req.query.arrivalDate;
    //const arrivalTime = req.query.arrivalTime;
    //const departDate = req.query.departDate;
    //const departTime = req.query.departTime;
    //const vehicle = req.query.vehicle;

    const filteredParking = await Parking.find({ "location.city": city });

    res.status(200).json({ availableParkings: filteredParking });
  } catch (error) {
    console.error("Error retrieving parking data:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
