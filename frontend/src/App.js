import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "./components/Header";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Update from "./pages/Update";
import CoreMods from "./pages/CoreMods";
import Id from "./pages/Id";
import Cd from "./pages/Cd";
import Ue from "./pages/Ue";

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
            <Route path="/core" element={<CoreMods />} />
            <Route path="/ue" element={<Ue />} />
            <Route path="/id" element={<Id />} />
            <Route path="/cd" element={<Cd />} />
          </Routes>
        </div>
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;
