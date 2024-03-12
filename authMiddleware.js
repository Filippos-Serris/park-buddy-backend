const jwt = require("jsonwebtoken");
const User = require("./models/user");

const authMiddleware = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res
      .status(401)
      .json({ success: false, message: "Unauthorized: No token provided" });
  }

  try {
    const decodedToken = jwt.verify(token, "dummy-secret");

    const user = await User.findById(decodedToken.userId);
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }
    req.user = user;

    next();
  } catch (error) {
    return res.status(403).json({ message: "Forbidden: Invalid token" });
  }
};

module.exports = authMiddleware;
