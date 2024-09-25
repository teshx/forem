import React, { useEffect, useRef, useState } from "react";
import { Appstate } from "../App";
import { axiosBase } from "../axiosConfig/axiosConfig";
import { useContext } from "react";
import { useParams } from "react-router-dom";
import PersonIcon from "@mui/icons-material/Person";
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
      <div>
        <h3>questions</h3>
        <h5>{answers[0]?.title}</h5>
        <p>{answers[0]?.description}</p>
      </div>
      <h2>Answer from the Community</h2>

      <div>
        {answers?.map((question, i) => (
          <div key={i} className="allquestion">
            <div className="profile-container">
              <div className="profile">
                <PersonIcon
                  className="person-icon"
                  sx={{
                    padding: 2, // Adjust padding for desired size
                    borderRadius: "50%", // This makes the border circular
                    color: "#012354",
                    width: 40, // Set width and height to make it a perfect circle
                    height: 40, // Set height equal to width
                    border: "2px solid #012354", // Change border color to blue
                  }}
                />

                {question.username}
              </div>
              <>{question.answer}</>
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
