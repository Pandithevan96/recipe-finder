import { Route, Routes } from "react-router-dom";
import Favorite from "./Favorite";
import Home from "./Home"; // Import the Home component
import "./index.css";
import Navbar from "./Navbar";
function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/favorite" element={<Favorite />} />
      </Routes>
    </>
  );
}

export default App;
