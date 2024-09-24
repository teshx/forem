import express from "express";

import { authMiddleware } from "../middleware/authMiddleware.js";
import {
  asking,
  allquestion,
  OnlyQuestion,
} from "../controlers/questionControler.js";
const route = express.Router();

route.post("/ask", asking);
// route.post("/one", OnlyQuestion);
route.get("/all-question", allquestion);

export default route;
