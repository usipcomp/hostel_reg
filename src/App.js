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
import AdminPortal from "./Pages/AdminPortal";
import SubmittedApplications from "./Pages/SubmittedApplications";
import Navbar from "./Pages/Navbar";
import './App.css'
import StudentApplicationView from "./Pages/StudentApplicationView";
import OpenCloseApplication from "./Pages/OpenCloseApplication";

function App() {
  const user = useSelector((state) => state.currentUser);
  let loggedInContent;
  if (!user) {
    loggedInContent = <Login></Login>;
  } else {
    loggedInContent = <Home></Home>;
  }
  let admin = <AdminPortal></AdminPortal>;
  let sub_apps = <SubmittedApplications></SubmittedApplications>;
  let stud_app_view = <StudentApplicationView></StudentApplicationView>
  let open_close_application = <OpenCloseApplication></OpenCloseApplication>
  return (
    <div>
      <Navbar />
      <Router>
        <Routes>
          <Route path="/login" element={loggedInContent}></Route>
          <Route path="/admin_portal" element={admin}></Route>
          <Route path="/student_application_view/:id" element={stud_app_view}></Route>
          <Route path="/submitted_applications" element={sub_apps}></Route>
          <Route path="/open_close_applications" element={open_close_application}></Route>
          <Route path="/application" element={<RegForm></RegForm>}></Route>
          <Route path="/" element={<Home></Home>}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
