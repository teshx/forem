import { useEffect, useState, createContext } from "react";
import Home from "./pages/Home.jsx";
import Logine from "./pages/Logine.jsx";
import { axiosBase } from "./axiosConfig/axiosConfig.js";
import Registore from "./pages/Registore.jsx";
import { Route, Routes } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export const Appstate = createContext();
function App() {
  const [user, setuser] = useState();
  const Navigates = useNavigate();
  const checkuser = async () => {
    const token = localStorage.getItem("token");
    // console.log(token)
    // console.log(token);

    try {
      const { data } = await axiosBase.get("users/check", {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      setuser(data);
      console.log(data);
    } catch (error) {
      console.log(error.response.data);
      Navigates("/login");
    }
  };
  useEffect(() => {
    checkuser();
  }, []);
  return (
    <Appstate.Provider value={{ user, setuser }}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="login" element={<Logine />} />
        <Route path="rejstor" element={<Registore />} />
      </Routes>
    </Appstate.Provider>
  );
}

export default App;
