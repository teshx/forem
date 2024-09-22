import React from "react";

function Registore() {
  return (
    <div>
      <div className="app">
        <span>Username:-</span>
        <input type="text" placeholder="username" />
      </div>
      <div>
        <span>Firstname:-</span>
        <input type="text" placeholder="Firstname" />
      </div>
      <div>
        <span>Lastname:-</span>
        <input type="text" placeholder="Lastname" />
      </div>
      <div>
        <span>email:-</span>
        <input type="text" placeholder="email" />
      </div>
      <div>
        <span>password :-</span>
        <input type="text" placeholder="password" />
      </div>

      <div>
        <button type="submit">Rejstore</button>
      </div>
    </div>
  );
}

export default Registore;
