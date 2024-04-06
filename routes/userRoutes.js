const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

router.post("/", async (req, res) => {
  try {
    const jsonData = req.body;

    const hash = await bcrypt.hash(jsonData.password, 12);

    const user = new User({ ...jsonData, password: hash });
    await user.save();
    res
      .status(200)
      .json({ message: "Registration successful", role: user.role });
  } catch (error) {
    res.status(500).json({
      error:
        "Internal server error registration failed. Try again in a few moments.",
    });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ error: "User not found" });
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res
        .status(401)
        .json({ error: "Incorrect username or password try again" });
    }

    if (validPassword) {
      const token = jwt.sign({ userId: user._id }, "dummy-secret", {
        expiresIn: "1h",
      });
      res.status(200).json({ token, id: user._id, role: user.role });
    }
  } catch (error) {
    res.status(500).json({
      error: "Internal server error. Try again in a few moments.",
    });
  }
});

module.exports = router;
