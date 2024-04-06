const express = require("express");
const mongoose = require("mongoose");

const cors = require("cors");

const userRoutes = require("./routes/userRoutes");
const vehicleRoutes = require("./routes/vehicleRouts");
const parkingRoutes = require("./routes/parkingRouts");

mongoose.connect("mongodb://localhost:27017/park-buddy", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Database connected");
});

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("hi from home");
});

app.use("/user", userRoutes);
app.use("/vehicle", vehicleRoutes);
app.use("/parking", parkingRoutes);

app.listen(8080, () => {
  console.log("App in 8080");
});
