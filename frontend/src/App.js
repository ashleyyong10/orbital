import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "./components/Header";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Update from "./pages/Update";
import Gea from "./pages/Gea";
import Gec from "./pages/Gec";
import Gei from "./pages/Gei";
import Gen from "./pages/Gen";
import Ges from "./pages/Ges";
import Gex from "./pages/Gex";
import CoreMods from "./pages/CoreMods";
import Id from "./pages/Id";
import Cd from "./pages/Cd";
import Ue from "./pages/Ue";
import Ge from "./pages/Ge";
import Ethics from "./pages/Ethics";
import Pe from "./pages/Pe";

function App() {
  return (
    <>
      <Router>
        <div className="container">
          <Header />
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/update" element={<Update />} />
            <Route path="/ge" element={<Ge />} />
            <Route path="/gea" element={<Gea />} />
            <Route path="/gec" element={<Gec />} />
            <Route path="/gei" element={<Gei />} />
            <Route path="/gen" element={<Gen />} />
            <Route path="/ges" element={<Ges />} />
            <Route path="/gex" element={<Gex />} />
            <Route path="/core" element={<CoreMods />} />
            <Route path="/ue" element={<Ue />} />
            <Route path="/id" element={<Id />} />
            <Route path="/cd" element={<Cd />} />
            <Route path="/ethics" element={<Ethics />} />
            <Route path="/pe" element={<Pe />} />
          </Routes>
        </div>
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;
