const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcrypt");
const session = require("express-session");
const jwt = require("jsonwebtoken");
const authMiddleware = require("./authMiddleware");

const User = require("./models/user");
const Vehicle = require("./models/vehicle");
const Parking = require("./models/parking");

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
app.use(
  session({ secret: "dummy-secret", resave: false, saveUninitialized: true })
);

app.get("/", (req, res) => {
  res.send("hi from home");
});

// --------- User --------

// register
app.post("/user", async (req, res) => {
  const jsonData = req.body;

  const hash = await bcrypt.hash(jsonData.password, 12);

  const user = new User({ ...jsonData, password: hash });
  await user.save();
  res.status(200).json({ message: "Registration successful", role: user.role });
});

// log-in
app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username });
  if (!user) {
    return res.status(401).json({ error: "User not found" });
  }

  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) {
    return res
      .status(401)
      .json({ success: false, error: "Incorrect username or password" });
  }

  if (validPassword) {
    console.log(`${username} connected`);
    const token = jwt.sign({ userId: user._id }, "dummy-secret", {
      expiresIn: "1h",
    });
    res
      .status(200)
      .json({ success: true, token, id: user._id, role: user.role });
  }
});

// --------- Vehicle -----------

// register vehicle
app.post("/vehicle", authMiddleware, async (req, res) => {
  const jsonData = req.body;
  console.log(jsonData);

  const userId = req.user._id;
  console.log(userId);

  const vehicle = new Vehicle({ ...jsonData, owner: userId });
  await vehicle.save();
  res.status(200).json({ message: "Registration successful" });
});

// --------- Parking -----------

// register parking
app.post("/parking", authMiddleware, async (req, res) => {
  const jsonData = req.body;
  console.log(jsonData);

  const userId = req.user._id;
  console.log(userId);

  const parking = new Parking({ ...jsonData, owner: userId });
  await parking.save();
  res.status(200).json({ message: "Registration successful" });
});

app.listen(8080, () => {
  console.log("App in 8080");
});
