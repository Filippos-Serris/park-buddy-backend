const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const parkingSchema = new Schema({
  name: { type: String, required: true },
  location: {
    street: { type: String, required: true },
    number: { type: Number, required: true },
    postal: { type: Number, required: true },
    city: { type: String, required: true },
  },
  slots: {
    car: { type: Number, required: true },
    moto: { type: Number, required: true },
  },
  availableSlots: {
    car: { type: Number, required: true },
    moto: { type: Number, required: true },
  },
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

const Parking = mongoose.model("Parking", parkingSchema);

module.exports = Parking;
