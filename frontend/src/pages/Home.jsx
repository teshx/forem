import React, { useEffect, useState } from "react";
import { Appstate } from "../App";
import { useContext } from "react";
import { axiosBase } from "../axiosConfig/axiosConfig.js";
import PersonIcon from "@mui/icons-material/Person";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { Link } from "react-router-dom";
import "./allstyle.css";
function Home() {
  const { user } = useContext(Appstate);

  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axiosBase.get("question/all-question");

        // Extract the 'questions' array from response.data
        if (response.data && response.data.allqu) {
          setQuestions(response.data.allqu);
        }
      } catch (error) {
        console.error("Error fetching questions:", error);
      }
    };

    fetchQuestions();
  }, []);
  console.log(questions);
  return (
    <section className="container">
      <div className="users">
        <div>
          <Link to="/ask" className="toask">
            Askquestion
          </Link>
        </div>
        <div className="username">Welcome: {user?.username}</div>
      </div>
      <div className="question">Questions</div>
      <div>
        {/* Render your questions */}
        {questions.length > 0 ? (
          <>
            {questions.map((question, i) => (
              <Link
                to={`/answer/${question.questionid}`}
                className="links"
                key={i}
              >
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
                    <div className="title">{question.title}</div>
                  </div>
                  <div>
                    <ArrowForwardIosIcon />
                  </div>
                </div>
              </Link>
            ))}
          </>
        ) : (
          <p>Loading questions...</p>
        )}
      </div>
    </section>
  );
}

export default Home;
