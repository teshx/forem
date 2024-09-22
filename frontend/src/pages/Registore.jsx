import React from "react";
import { useRef } from "react";
import { axiosBase } from "../axiosConfig/axiosConfig";
import { Link, useNavigate } from "react-router-dom";

function Registore() {
  const navigate = useNavigate();
  const usernamedom = useRef();
  const firstnamedom = useRef();
  const lastnamedom = useRef();
  const emailsdom = useRef();
  const passworddom = useRef();
  const handlesubmit = async (e) => {
    const username = usernamedom.current.value;
    const firstname = firstnamedom.current.value;
    const lastname = lastnamedom.current.value;
    const email = emailsdom.current.value;
    const password = passworddom.current.value;
    e.preventDefault();
    if (!username || !firstname || !lastname || !email || !password) {
      alert("all input required nedded");
      return;
    }
    try {
      const response = await axiosBase.post("/users/registor", {
        username: username,
        firstname: firstname,
        lastname: lastname,
        email: email,
        password: password,
      });

      alert("rejstored sucessfull.please login");
      console.log(response);
      navigate("/login");
    } catch (error) {
      alert("something is wrong");
      console.log(error);
    }
  };

  return (
    <form onSubmit={handlesubmit}>
      <div className="app">
        <span>Username:-</span>
        <input ref={usernamedom} type="text" placeholder="username" />
      </div>
      <div>
        <span>Firstname:-</span>
        <input ref={firstnamedom} type="text" placeholder="Firstname" />
      </div>
      <div>
        <span>Lastname:-</span>
        <input ref={lastnamedom} type="text" placeholder="Lastname" />
      </div>
      <div>
        <span>email:-</span>
        <input ref={emailsdom} type="text" placeholder="email" />
      </div>
      <div>
        <span>password :-</span>
        <input ref={passworddom} type="text" placeholder="password" />
      </div>

      <div>
        <button type="submit">Rejstore</button>
      </div>

      <Link to="/login">Login</Link>
    </form>
  );
}

export default Registore;
