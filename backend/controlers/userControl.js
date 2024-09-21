import dbconnection from "../db/dbConfig.js";
import bryptjs from "bcryptjs";
import { StatusCodes } from "http-status-codes";
export const registor = async (req, res) => {
  const { username, firstname, lastname, email, password } = req.body;
  try {
    if (!username || !firstname || !lastname || !email || !password) {
      res
        .status(400)
        .json({ success: false, message: "please input all required field" });
    }

    const querys =
      "SELECT username, userid FROM users WHERE username = ? or email = ?";
    const values = [username, email];

    const [user] = await dbconnection.query(querys, values);
    if (user.length > 0) {
      return res.status(404).json({ message: "user is already rejstored" });
    }

    if (password.length <= 7) {
      return res.status(404).json({ message: "password al least 8 character" });
    }

    const salt = await bryptjs.genSalt(10);
    const hashedPassword = await bryptjs.hash(password, salt);
    const query = `
    INSERT INTO users (username, firstname, lastname, email, password)
    VALUES (?, ?, ?, ?, ?)`;

    await dbconnection.query(query, [
      username,
      firstname,
      lastname,
      email,
      hashedPassword,
    ]);

    res.status(201).json({
      success: true,
      message: "user is sucessfuly registored",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "something is wrong",
    });
  }
};
export const login = async (req, res) => {
  res.send("login");
};
export const check = async (req, res) => {
  res.send("check");
};
