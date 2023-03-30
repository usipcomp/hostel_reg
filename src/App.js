import React from "react";
import RegForm from "./Pages/RegForm";
import Login from "./Pages/Login";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/login" element={<Login></Login>}></Route>
          <Route
            path="/application/:studentID"
            element={<RegForm></RegForm>}
          ></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
