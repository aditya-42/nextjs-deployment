const jwt = require("jsonwebtoken");

const authenticateUser = (req, res, next) => {
  // Get token from NextAuth session
  const token = req.cookies["next-auth.session-token"]; 

  console.log("Token from cookies:", token);

  if (!token) {
    return res.status(401).json({ message: "Unauthorized: No token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Decoded token:", decoded);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized: Invalid token" });
  }
};

module.exports = authenticateUser;
