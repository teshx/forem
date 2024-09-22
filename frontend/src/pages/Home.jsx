import React from "react";
import { Appstate } from "../App";
import { useContext } from "react";

function Home() {
  const { user } = useContext(Appstate);
  return (
    <>
      <div>{user?.username}</div>
      <div>{user?.userid}</div>
    </>
  );
}

export default Home;
