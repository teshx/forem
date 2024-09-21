import jwt from "jsonwebtoken";
export const authMiddleware = async (req, res, next) => {
  const authheader = req.headers.authorization;
  if (!authheader || !authheader.startsWith("Bearer"))
    return res
      .status(401)
      .json({ success: false, message: "unauthorized -no token provided" });
  const token = authheader.split(" ")[1];
  try {
    const data = jwt.verify(token, "secret");
    if (!data)
      return res.status(401).json({
        success: false,
        message: "unauthorized -invalid token provided",
      });
    const { username, userid } = data;
    req.user = { username, userid };
    next();
  } catch (error) {
    console.log("error in verifyToken", error);
    return res.status(500).json({ success: false, message: "serveer error" });
  }
};
