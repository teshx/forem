import React, { useEffect, useRef, useState } from "react";
import { Appstate } from "../App";
import { axiosBase } from "../axiosConfig/axiosConfig";
import { useContext } from "react";
import { useParams } from "react-router-dom";

function Answerdetail() {
  const [questionids, setquestion] = useState("");
  const { questionid } = useParams();

  const { user } = useContext(Appstate);

  //   const [userid, setuserid] = useState("");

  const [mes, setmessage] = useState();
  const Answerdom = useRef();

  const [questions, setQuestions] = useState([]);
  console.log(questions);
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

    // Log the values before the validation check purpose
    /* console.log("Answer:", answer);
    console.log("User ID:", userid);
    console.log("Question ID:", questionid); */

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
      alert("Answer submitted successfully.");
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
    <div>
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
