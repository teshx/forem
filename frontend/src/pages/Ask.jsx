import React, { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { axiosBase } from "../axiosConfig/axiosConfig";
function Ask() {
  const navigate = useNavigate();
  const emailsdom = useRef();
  const passworddom = useRef();
  const handlesubmit = async (e) => {
    const email = emailsdom.current.value;
    const password = passworddom.current.value;
    e.preventDefault();
    // if (!email || !password) {
    //   alert("all input required nedded");
    //   return;
    // }
    try {
    //   const { data } = await axiosBase.post("/users/login", {
    //     email: email,
    //     password: password,
    //   });

    //   alert("login sucessfull.");

    //   localStorage.setItem("token", data.token);
      //   console.log(data);
    //   navigate("/");
    } catch (error) {
      alert("something is wrong");
      console.log(error);
    }
  };

  return (
    <div>
      <form onSubmit={handlesubmit}>
        <div>
          {/* <span>email:-</span> */}
          <input type="text" ref={emailsdom} placeholder="Enter tittle" />
        </div>
        <div>
          {/* <span>password :-</span> */}
          <input type="text" ref={passworddom} placeholder="enterdescription" />
        </div>
        <div>
          <button type="submit">post Question</button>
        </div>
      </form>
    </div>
  );
}

export default Ask;
