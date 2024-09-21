import dbconnection from "../db/dbConfig.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { StatusCodes } from "http-status-codes";
export const registor = async (req, res) => {
  const { username, firstname, lastname, email, password } = req.body;
  try {
    if (!username || !firstname || !lastname || !email || !password) {
      res
        .status(400)
        .json({ success: false, message: "please input all required field" });
    }
    //checking existing of email or username
    const querys =
      "SELECT username, userid FROM users WHERE username = ? or email = ?";
    const values = [username, email];

    const [user] = await dbconnection.query(querys, values);
    if (user.length > 0) {
      return res.status(404).json({ message: "user is already rejstored" });
    }
    //checking length of password
    if (password.length <= 7) {
      return res.status(404).json({ message: "password al least 8 character" });
    }
    //hashed password
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);
    const query = `
    INSERT INTO users (username, firstname, lastname, email, password)
    VALUES (?, ?, ?, ?, ?)`;
    // console.log(hashedPassword);
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
      messaege: "something is wrong",
    });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res
      .status(400)
      .json({ success: false, message: "please input all required field" });
  }

  const query = "SELECT username, password, userid FROM users WHERE email = ?";
  const values = [email];

  try {
    const [user] = await dbconnection.query(query, values);

    if (user.length === 0) {
      return res.status(404).json({ message: "User credential incorrect!" });
    }
    const hashedPassword = user[0].password;
    const isMatch = await bcryptjs.compare(password.trim(), hashedPassword);

    if (!isMatch) {
      return res.status(404).json({ message: "User credential incorrect!" });
    }

    const username = user[0].username;
    const userid = user[0].userid;

    const token = jwt.sign({ username, userid }, "secret", { expiresIn: "1d" });
    res.status(200).json({ token, message: "User successfully logged in!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error." });
  }
};
export const check = async (req, res) => {
  const username = req.user.username;
  const userid = req.user.userid;
  res.status(200).json({ meaage: "teshx", username, userid });
};
