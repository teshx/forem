import dotenv from "dotenv";
dotenv.config();
export const VARSE = {
  PORT: process.env.PORT || 4000,
  DB_HOST: process.env.DB_HOST,
  DB_USER: process.env.DB_USER,
  DB_PASS: process.env.DB_PASS,
  MYSQL_DB: process.env.MYSQL_DB,
  JWT_SECRET: process.env.JWT_SECRET,
};
