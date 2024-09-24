import dbconnection from "../db/dbConfig.js";
export const Addanswer = async (req, res) => {
  const { userid, questionid, answer } = req.body;

  if (!userid || !questionid || !answer) {
    res
      .status(400)
      .json({ success: false, message: "please input all required field" });
  }

  try {
    const query = `
    INSERT INTO answers (userid, questionid, answer)
    VALUES (?, ?, ?)`;

    await dbconnection.query(query, [userid, questionid, answer]);

    res.status(201).json({
      success: true,
      message: "answer is sucessfuly registored",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      messaege: "something is wrong",
    });
  }
};

export const specificAllanswer = async (req, res) => {
  const questionId = "12345678"; // Replace with the actual question ID
  const query = `
    SELECT DISTINCT
        USERS.username, 
        ANSWERS.answer,
        QUESTIONS.title,
        QUESTIONS.description
    FROM 
        ANSWERS 
    JOIN 
        USERS ON ANSWERS.userid = USERS.userid 
    JOIN 
        QUESTIONS ON ANSWERS.questionid = QUESTIONS.questionid
    WHERE 
        ANSWERS.questionid = ?;
  `;

  try {
    const [rows] = await dbconnection.query(query, [questionId]);

    return res
      .status(200)
      .json({ rows, message: "User successfully logged in!" });
  } catch (error) {
    console.error("Error executing query:", error);
    res.status(500).json({
      message: "Something is wrong",
    });
  }
};
export const oneanswer = () => {};
