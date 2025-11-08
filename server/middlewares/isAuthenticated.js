import jwt from "jsonwebtoken";

const isAuthenticated = (req, res, next) => {
  try {
    // ✅ Token from Header OR Query (certificate download support)
    const token =
      req.headers.authorization?.split(" ")[1] || req.query.token;

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized: No token provided",
      });
    }

    // ✅ Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.id = decoded.userId; // ✅ store user ID
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token",
    });
  }
};

export default isAuthenticated;
