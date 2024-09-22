import React from "react";

function Logine() {
  return (
    <div>
      <div>
        <span>email:-</span>
        <input type="text" placeholder="email" />
      </div>
      <div>
        <span>password :-</span>
        <input type="text" placeholder="password" />
      </div>

      <div>
        <button type="submit">Login</button>
      </div>
    </div>
  );
}

export default Logine;
