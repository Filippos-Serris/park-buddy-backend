const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const clientSchema = new Schema({
  brand: { type: String, required: true },
  model: { type: String, required: true },
  color: { type: String, required: true },
  plate: { type: String, required: true },
  size: { type: String, enum: ["small", "medium", "large"] },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

const Vehicle = mongoose.model("Vehicle", clientSchema);

module.exports = Vehicle;
