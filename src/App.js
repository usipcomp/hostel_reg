import React from "react";
import RegForm from "./Pages/RegForm";
import Login from "./Pages/Login";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useSelector } from "react-redux";
import Home from "./Pages/Home";

function App() {
  const user = useSelector((state) => state.currentUser);
  let loggedInContent;
  if (!user) {
    loggedInContent = <Login></Login>;
  } else {
    loggedInContent = <Home></Home>;
  }
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/login" element={loggedInContent}></Route>
          <Route path="/application" element={<RegForm></RegForm>}></Route>
          <Route path="/" element={<Home></Home>}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
