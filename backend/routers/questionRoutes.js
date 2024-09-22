import express from "express";

import { authMiddleware } from "../middleware/authMiddleware.js";
import { asking } from "../controlers/questionControler.js";
const route = express.Router();

route.post("/all-question", asking);

export default route;
