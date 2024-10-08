import express from "express";
import { VARSE } from "./vars/var_dotenv.js";
import userRoute from "./routers/userRouters.js";
import questionRoutes from "./routers/questionRoutes.js";
import answerRoute from "./routers/answerRoute.js";
import { authMiddleware } from "./middleware/authMiddleware.js";
import dbconnection from "./db/dbConfig.js";
import cors from "cors";
const app = express();

// middleware
app.use(express.json());
app.use(cors());

//routes
app.use("/api/users", userRoute);
app.use("/api/answer", answerRoute);
app.use("/api/question", questionRoutes);

async function start() {
  try {
    const result = await dbconnection.execute("SELECT 'test'");
    console.log(result);
  } catch (error) {
    console.log(error.message);
  }
}

start();
// Start the Express server
app.listen(VARSE.PORT, () => {
  console.log(`Running on localhost:${VARSE.PORT}`);
});
