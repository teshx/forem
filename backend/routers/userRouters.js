import express from "express";
import { registor, login, check } from "../controlers/userControl.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
const route = express.Router();

route.post("/registor", registor);
route.post("/login", login);




route.get("/check", authMiddleware, check);

export default route;
