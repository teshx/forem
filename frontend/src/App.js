import Home from "./pages/Home.jsx";
import Logine from "./pages/Logine.jsx";

import Registore from "./pages/Registore.jsx";
import { Route, Routes } from "react-router-dom";
function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="login" element={<Logine />} />
        <Route path="rejstor" element={<Registore />} />
      </Routes>
    </div>
  );
}

export default App;
