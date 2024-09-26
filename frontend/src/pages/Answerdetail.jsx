import React, { useEffect, useRef, useState } from "react";
import { Appstate } from "../App";
import { axiosBase } from "../axiosConfig/axiosConfig";
import { useContext } from "react";
import { useParams } from "react-router-dom";
import PersonIcon from "@mui/icons-material/Person";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
function Answerdetail() {
  const { questionid } = useParams();
  const { user } = useContext(Appstate);
  const [mes, setmessage] = useState();
  const Answerdom = useRef();

  const [answers, setQuestions] = useState([]);
  // console.log(answers[0]);
  const [uppdate, setupdate] = useState("");
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        // Fetch questions based on questionid
        const response = await axiosBase.post("answer/all-answer", {
          questionid: questionid, // Use the questionid directly from params
        });

        // Extract the 'questions' array from response.data
        if (response.data && response.data.rows) {
          setQuestions(response.data.rows);
        }
      } catch (error) {
        console.error("Error fetching questions:", error);
      }
    };

    // Call fetchQuestions when questionid changes
    fetchQuestions();
  }, [questionid, uppdate]);

  const handlesubmit = async (e) => {
    e.preventDefault(); // Prevent default

    const answer = Answerdom.current.value; // Get the answer from the ref
    setupdate(answer); //set answer to update answer when input answer
    const userid = user?.userid; // User ID from context
    // const questionid = questionids; // Use questionids from state
    // Check if all necessary inputs are provided
    if (!userid || !questionid || !answer) {
      alert("All input fields are required.");
      return;
    }

    try {
      // Make POST request to the backend API
      const { data } = await axiosBase.post("/answer/answerone", {
        userid: userid,
        questionid: questionid,
        answer: answer,
      });

      // Handle success
      //   alert("Answer submitted successfully.");
      setmessage(data); // Update state with response data of messages
      setupdate(answer); //set answer to update answer when input answer
      Answerdom.current.value = ""; //clear
    } catch (error) {
      // Log error details for debugging
      console.error("Error submitting answer:", error);
      if (error.response) {
        console.log("Error response:", error.response);
        alert(
          `Error: ${error.response.data.message || "Something went wrong"}`
        );
      } else {
        alert("Something is wrong, check your network or server.");
      }
    }
  };

  return (
    <div className="container">
      <div className="oneQuestion">
        <div>
          <h2>Questions</h2>
        </div>
        <div className="titleQ">
          <ArrowForwardIcon
            sx={{
              backgroundColor: "lightblue",
              borderRadius: "50%",
              color: "white",
              padding: "6px",
              width: "20px",
              height: "20px",
            }}
          />

          {answers[0]?.title}
        </div>
        <p>{answers[0]?.description}</p>
      </div>
      <h2>Answer from the Community</h2>

      <div className="all-answer">
        {answers?.map((question, i) => (
          <div key={i} className="answer-container-wrape">
            <div className="answer-container">
              <div className="persons">
                <PersonIcon
                  className="person-icon"
                  sx={{
                    padding: 1,
                    borderRadius: "50%",
                    color: "#B0B0B0",
                    width: 25,
                    height: 25,
                    border: "7px solid #B0B0B0",
                  }}
                />

                {question.username}
              </div>
              <div className="answers">{question.answer}</div>
            </div>
          </div>
        ))}
      </div>

      {mes?.message}
      <form onSubmit={handlesubmit}>
        <div>
          <input type="text" ref={Answerdom} placeholder="Enterdescription" />
        </div>
        <div>
          <button type="submit">post Answer</button>
        </div>
      </form>
    </div>
  );
}

export default Answerdetail;
