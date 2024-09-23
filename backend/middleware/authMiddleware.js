import jwt from "jsonwebtoken";
import dbconnection from "../db/dbConfig.js";
import { VARSE } from "../vars/var_dotenv.js";
export const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res
      .status(401)
      .json({ success: false, message: "Unauthorized - no token provided" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const data = jwt.verify(token, VARSE.JWT_SECRET);
    if (!data)
      return res.status(401).json({
        success: false,
        message: "unauthorized -invalid token provided",
      });
    const { username, userid } = data;
    req.user = { username, userid };
    next();
  } catch (error) {
    console.log("Error in verifyToken", error);
    return res.status(500).json({ success: false, message: "serveer error" });
  }
};
