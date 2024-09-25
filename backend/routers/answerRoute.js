import express from "express";

import { authMiddleware } from "../middleware/authMiddleware.js";
import {
  Addanswer,
  specificAllanswer,
  oneanswer,
} from "../controlers/asworecontroler.js";
const route = express.Router();

route.post("/answerone", Addanswer);
route.post("/all-answer", specificAllanswer);
// route.post("/oneanswer", oneanswer);

export default route;
