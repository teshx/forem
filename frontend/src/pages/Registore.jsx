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
    <section className="rejstor-wrape">
      <div className="rejstor-container">
        <div className="forms21">
          <h5>join the Networks</h5>
          <div className="have-acc">
            <p>Already have the account</p>
            <Link className="sign" to="/login">
              signin
            </Link>
          </div>
          <form className="forms-of-container" onSubmit={handlesubmit}>
            <div>
              <input
                className="Reje-input "
                ref={usernamedom}
                type="text"
                placeholder="username"
              />
            </div>
            <div className="first-last">
              <div>
                <input ref={firstnamedom} type="text" placeholder="Firstname" />
              </div>
              <div>
                <input ref={lastnamedom} type="text" placeholder="Lastname" />
              </div>
            </div>

            <div>
              <input
                className="Reje-input"
                ref={emailsdom}
                type="text"
                placeholder="email"
              />
            </div>
            <div>
              <input
                className="Reje-input"
                ref={passworddom}
                type="text"
                placeholder="password"
              />
            </div>
          </form>

          <div>
            <button type="submit">Rejstore</button>
          </div>
          <Link to="/login">
            <div className="have-accc">
              <p className="sign">Already have the account</p>
            </div>
          </Link>
        </div>
        <div className="forms22">
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

export default Registore;
