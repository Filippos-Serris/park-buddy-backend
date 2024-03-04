const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const User = require("./models/user");

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

// Home
app.get("/", (req, res) => {
  res.send("Home");
});

// User
app.get("/user", async (req, res) => {
  const users = await User.find({});
  console.log(users);
  res.send("hi");
});

app.post("/user", async (req, res) => {
  const jsonData = req.body;
  console.log(jsonData);
  const user = new User(jsonData);
  await user.save();
  res.json({ user: "tobi" });

  /* console.log(req.query);
  res.json({ user: "tobi" }); */
  //const owner = new Owner(req.body.owner);
  //await owner.save();
});

/* const owner = new Owner({
  firstName: "Filippos",
  lastName: "Serris",
  username: "felix",
  email: "filipposserris@gmail.com",
  password: "A123456789a",
  contactInfo: 6980311787,
});
owner.save(); */

app.listen(8080, () => {
  console.log("App in 8080");
});
