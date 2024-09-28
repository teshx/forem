import React, { useRef } from "react";
import { axiosBase } from "../axiosConfig/axiosConfig";
import { Link, useNavigate } from "react-router-dom";
function Logine() {
  const navigate = useNavigate();
  const emailsdom = useRef();
  const passworddom = useRef();
  const handlesubmit = async (e) => {
    const email = emailsdom.current.value;
    const password = passworddom.current.value;
    e.preventDefault();
    if (!email || !password) {
      alert("all input required nedded");
      return;
    }
    try {
      const { data } = await axiosBase.post("/users/login", {
        email: email,
        password: password,
      });

      alert("login sucessfull.");

      localStorage.setItem("token", data.token);
      //   console.log(data);
      navigate("/");
    } catch (error) {
      alert("something is wrong");
      console.log(error);
    }
  };
  return (
    <section className="login-wrape">
      <div className="login-container">
        <div className="forms">
          {/* <div className="form-content"> */}
          <h5>Login to your account</h5>
          <div className="accoutnt">
            <p>Dont have an account ?</p>
            <Link className="Lnk" to="/rejstor">
              Creat a new account
            </Link>
          </div>
          <form onSubmit={handlesubmit}>
            <div>
              <input className="login" type="text" ref={emailsdom} placeholder="email" />
            </div>
            <div>
              <input className="login" type="text" ref={passworddom} placeholder="password" />
            </div>
            <div>
              <button type="submit">submit</button>
              <p className="acount">
                <Link className="Link-acc" to="/rejstor">
                  creat an account ?
                </Link>{" "}
              </p>
            </div>
          </form>
          {/* </div> */}
        </div>
        <div className="forms2">
          <div className="form2-1">
            <p className="p1">home</p>
            <h1>Teshager Networks Q&A</h1>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Doloremque dicta dolorum cupiditate hic nisi rem voluptate
              pariatur deserunt ea neque ab? Nam, accusamus
            </p>
            <p>
              laborum illo necessitatibus. Quidem porro minus ipsa repudiandae
              incidunt quam facilis doloremque culpa, facilis magni nam,
              quibusdam
            </p>
            <p>
              error nisi iure, cum quisquam. Rerum, ipsa dolores nesciunt nam
              ducimus reiciendis iure sunt, non, porro! Error qui tenetur
              exercitationem,
            </p>
            <button>How it works</button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Logine;
