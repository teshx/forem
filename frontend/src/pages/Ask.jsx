import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Appstate } from "../App";

import { axiosBase } from "../axiosConfig/axiosConfig";

import { useContext } from "react";
import { v4 as uuidv4 } from "uuid";

function Ask() {
  const navigate = useNavigate();
  const { user } = useContext(Appstate);
  const [userid, setuserid] = useState("");
  const [questionid, setquestionid] = useState("");
  const [mes, setmessage] = useState();
  const question = uuidv4();
  useEffect(() => {
    setquestionid(question);
  }, []);

  const Titledom = useRef();
  const Descriptiondom = useRef();
  const handlesubmit = async (e) => {
    const title = Titledom.current.value;
    const description = Descriptiondom.current.value;
    e.preventDefault();

    if (userid || !questionid || !title || !description) {
      alert("all input required nedded");
      return;
    }
    try {
      const { data } = await axiosBase.post("/question/ask", {
        userid: user?.userid,
        questionid: questionid,
        title: title,
        description: description,
      });
      alert("asking sucessfull.");
      setmessage(data);
    } catch (error) {
      alert("something is wrong");
      console.log(error);
    }
  };

  return (
    <section className="containers ">
      <div className="stepsoflist steps">
        <h3>Steps to Write a good queestion</h3>
        <ul>
          <li>Summerize your problem in a one-line title.</li>
          <li>Describe your problem in moral detail.</li>
          <li>Describe what you tried and what you expected to happen.</li>
          <li>Review your question and post it to the site.</li>
        </ul>
      </div>
      <div className="containers-form">
        <Link to="/"> go to home</Link>
        {mes?.message}
        <form onSubmit={handlesubmit}>
          <div>
            <input
              className="input-style"
              type="text"
              ref={Titledom}
              placeholder="Enter tittle"
            />
          </div>
          <div>
            <input
              className="input-style input"
              type="text"
              ref={Descriptiondom}
              placeholder="Enterdescription"
            />
          </div>
          <div>
            <button className="toask" type="submit">
              post Question
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}

export default Ask;
