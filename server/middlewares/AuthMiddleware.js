const { verify } = require("jsonwebtoken");

const validateToken = (req, res, next) => {
  const accessToken = req.header("accessToken");

  if (!accessToken) {
    return res.status(401).json({ 
      error: "Access token required",
      message: "Please log in to access this resource"
    });
  }

  try {
    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET environment variable is not configured");
    }
    const validToken = verify(accessToken, process.env.JWT_SECRET);
    req.user = validToken;
    return next();
  } catch (err) {
    return res.status(401).json({ 
      error: "Invalid token",
      message: "Your session has expired. Please log in again."
    });
  }
};

module.exports = { validateToken };
