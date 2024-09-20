import express from "express";
import { registor, login, check } from "../controlers/userControl.js";
const route = express.Router();

route.post("/registor", registor);
route.post("/login", login);
route.get("/check", check);

export default route;
