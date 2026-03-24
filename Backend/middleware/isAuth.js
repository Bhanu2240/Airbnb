import jwt from "jsonwebtoken";

const isAuth = async (req, res, next) => {
  try {
    let { token } = req.cookies;

    if (!token) {
      return res.status(401).json({ message: "No token" });
    }

    let decoded;

    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
      return res.status(401).json({ message: "Invalid or expired token" });
    }

    req.userId = decoded.userId;   // ✅ FIXED
    next();

  } catch (error) {
    console.error("isAuth error:", error);
    return res.status(500).json({ message: "isAuth Error", error: error.message });
  }
};

export default isAuth;