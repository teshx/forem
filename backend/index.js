import mysql from "mysql2";
import express from "express";
import { VARSE } from "./vars/var_dotenv.js";
import userRoute from "./routers/userRouters.js";
const app = express();

app.use("/api/users", userRoute);

// Start the Express server
app.listen(VARSE.PORT, () => {
  console.log(`Running on localhost:${VARSE.PORT}`);
});
