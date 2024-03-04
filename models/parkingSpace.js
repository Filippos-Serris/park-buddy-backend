const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const parkingSpaceSchema = new Schema({
  name: { type: String, required: true },
  location: {
    road: { type: String, required: true },
    number: { type: Number, required: true },
    postal: { type: Number, required: true },
    city: { type: String, required: true },
  },
  slots: { type: Number, required: true },
  pricing: {
    hourly: {
      type: Number,
      required: true,
    },
    daily: {
      type: Number,
      required: true,
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

const ParkingSpace = mongoose.model("ParkingSpace", parkingSpaceSchema);

module.exports = ParkingSpace;
