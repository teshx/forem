import dbconnection from "../db/dbConfig.js";
import bcryptjs from "bcryptjs";

export const asking = async (req, res) => {
  const { userid, questionid, title, description } = req.body;

  if (!userid || !questionid || !title || !description) {
    res
      .status(400)
      .json({ success: false, message: "please input all required field" });
  }

  try {
    const query = `
    INSERT INTO questions (userid, questionid, title, description)
    VALUES (?, ?, ?, ?)`;
    // console.log(hashedPassword);
    await dbconnection.query(query, [userid, questionid, title, description]);

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

export const allquestion = async (req, res) => {
  const query = `
  SELECT 
    USERS.username, 
    QUESTIONS.title,
    QUESTIONS.questionid 
  FROM 
    QUESTIONS 
  JOIN 
    USERS ON QUESTIONS.userid = USERS.userid
  ORDER BY 
    QUESTIONS.id DESC;  
`;
  const [allqu] = await dbconnection.query(query);

  res.status(201).json({
    success: true,
    allqu,
    message: "user is sucessfuly registored",
  });
};

export const OnlyQuestion = () => {};
