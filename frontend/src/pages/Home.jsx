import React, { useEffect, useState } from "react";
import { Appstate } from "../App";
import { useContext } from "react";
import { axiosBase } from "../axiosConfig/axiosConfig.js";

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
    <>
      <div>{user?.username}</div>
      <div>{user?.userid}</div>
    </>
  );
}

export default Home;
