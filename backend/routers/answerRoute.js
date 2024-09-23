import express from "express";

import { authMiddleware } from "../middleware/authMiddleware.js";
import { answer, specificA } from "../controlers/asworecontroler.js";
const route = express.Router();

route.post("/answer", answer);
route.get("/all-answer", specificA);

export default route;
