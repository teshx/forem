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
    <div>
      <Link to="/"> go to home</Link>
      {mes?.message}
      <form onSubmit={handlesubmit}>
        <div>
          <input type="text" ref={Titledom} placeholder="Enter tittle" />
        </div>
        <div>
          <input
            type="text"
            ref={Descriptiondom}
            placeholder="Enterdescription"
          />
        </div>
        <div>
          <button type="submit">post Question</button>
        </div>
      </form>
    </div>
  );
}

export default Ask;
