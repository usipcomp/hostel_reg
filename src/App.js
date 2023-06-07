import React, { useState } from "react";
import RegForm from "./Pages/RegForm";
import Login from "./Pages/Login";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useSelector } from "react-redux";
import StudentHome from "./Pages/StudentHome";
import AdminHome from "./Pages/AdminHome";
import ApplicationsList from "./Pages/ApplicationsList";
import ManageApplication from "./Pages/ManageApplication";
import ManageHostels from "./Pages/ManageHostels";
import NewHostel from "./Pages/NewHostel";
import AdminLogin from "./Pages/AdminLogin";
import StudentApplicationView from "./Pages/StudentApplicationView";
import RejectedApplications from "./Pages/RejectedApplications";
import HostelList from "./Pages/HostelList";
import AdminAppStatus from "./Pages/AdminAppStatus";
import StudentAppStatus from "./Pages/StudentAppStatus";
import OccupancyHistoryStudent from "./Pages/OccupancyHistoryStudent";
import Navbar from "./Components/Navbar";
import "./App.css";
import MyProfile from "./Pages/MyProfile";
import HostelIDCard from "./Pages/HostelDCard";
import Alert from "./Components/Alert";

function App() {
  const user = useSelector((state) => state.user.currentUser);
  const [alert, setAlert] = useState(null);
  const showAlert = (type, display) => {
    setAlert({
      theme: type,
      message: display,
    });
    setTimeout(() => {
      setAlert(null);
    }, 2000);
  };
  let Links = [];
  if (user && user.user_desgn !== "admin") {
    Links = [
      { value: "My Profile", redirect: "/hostelid" },
      {
        value: "Application Status",
        redirect: "/student_application_status",
      },
      { value: "Occupancy History", redirect: "/occupancyhistory" },
      { value: "New Application", redirect: "/application" },
    ];
  } else {
    Links = [
      { value: "Open/Close Application", redirect: "/manageapplications" },
      { value: "Submitted Applications", redirect: "/submittedapplications" },
      { value: "Rejected Application", redirect: "/rejected_applications" },
      { value: "Manage Hostels", redirect: "/managehostels" },
      { value: "Application Status", redirect: "/admin_application_status" },
    ];
  }
  let homeContent,
    AdminHomeContent,
    ApplicationsListContent,
    ApplicationView,
    ManageApplicationContent,
    RegFormContent,
    loginContent,
    ManageHostelsContent,
    rejectedapplications,
    hostelList,
    AdminApplicationStatus,
    StudentApplicationStatus,
    StudentOccupancyHistory,
    HostelID,
    hostelIDCard,
    NewHostelContent;
  console.log(user);
  if (!user) {
    homeContent = <Login showAlert={showAlert}></Login>;
    AdminHomeContent = <AdminLogin showAlert={showAlert}></AdminLogin>;
    ApplicationsListContent = <AdminLogin showAlert={showAlert}></AdminLogin>;
    ManageApplicationContent = <AdminLogin showAlert={showAlert}></AdminLogin>;
    RegFormContent = <Login showAlert={showAlert}></Login>;
    loginContent = <Login showAlert={showAlert}></Login>;
    ManageHostelsContent = <AdminLogin showAlert={showAlert}></AdminLogin>;
    NewHostelContent = <AdminLogin showAlert={showAlert}></AdminLogin>;
    rejectedapplications = <AdminLogin showAlert={showAlert}></AdminLogin>;
    hostelList = <AdminLogin showAlert={showAlert}></AdminLogin>;
    AdminApplicationStatus = <AdminLogin showAlert={showAlert}></AdminLogin>;
    StudentApplicationStatus = <Login showAlert={showAlert}></Login>;
    StudentOccupancyHistory = <Login showAlert={showAlert}></Login>;
    HostelID = <Login showAlert={showAlert}></Login>;
    hostelIDCard = <Login></Login>;
  } else {
    if (user.user_desgn == "admin") {
      AdminHomeContent = <AdminHome></AdminHome>;
    } else if (user.user_desgn == "student") {
      homeContent = <StudentHome></StudentHome>;
    }
    ApplicationsListContent = (
      <ApplicationsList showAlert={showAlert}></ApplicationsList>
    );
    ManageApplicationContent = (
      <ManageApplication showAlert={showAlert}></ManageApplication>
    );
    ApplicationView = <StudentApplicationView></StudentApplicationView>;
    RegFormContent = <RegForm showAlert={showAlert}></RegForm>;
    loginContent = <StudentHome showAlert={showAlert}></StudentHome>;
    ManageHostelsContent = (
      <ManageHostels showAlert={showAlert}></ManageHostels>
    );
    NewHostelContent = <NewHostel showAlert={showAlert}></NewHostel>;
    rejectedapplications = (
      <RejectedApplications showAlert={showAlert}></RejectedApplications>
    );
    hostelList = (
      <HostelList showAlert={showAlert}></HostelList>
    );
    AdminApplicationStatus = (
      <AdminAppStatus showAlert={showAlert}></AdminAppStatus>
    );
    StudentApplicationStatus = (
      <StudentAppStatus showAlert={showAlert}></StudentAppStatus>
    );
    StudentOccupancyHistory = (
      <OccupancyHistoryStudent showAlert={showAlert}></OccupancyHistoryStudent>
    );
    HostelID = <MyProfile showAlert={showAlert}></MyProfile>;
    hostelIDCard = <HostelIDCard></HostelIDCard>;
  }
  return (
    <div>
      <Router>
        {user ? <Navbar Links={Links}></Navbar> : ""}
        <Alert alert={alert}></Alert>
        <Routes>
          <Route path="/login" element={loginContent}></Route>
          <Route path="/admin" element={AdminHomeContent}></Route>
          <Route
            path="/submittedapplications"
            element={ApplicationsListContent}
          ></Route>
          <Route
            path="/manageapplications"
            element={ManageApplicationContent}
          ></Route>
          <Route path="/:id" element={ApplicationView}></Route>
          <Route path="/hostelid/:id" element={hostelIDCard}></Route>
          <Route path="/application" element={RegFormContent}></Route>
          <Route path="/" element={homeContent}></Route>
          <Route path="/managehostels" element={ManageHostelsContent}></Route>
          <Route path="/newhostel" element={NewHostelContent}></Route>
          <Route
            path="/rejected_applications"
            element={rejectedapplications}
          ></Route>
          <Route
            path="/admin_application_status"
            element={AdminApplicationStatus}
          ></Route>
          <Route
            path="/student_application_status"
            element={StudentApplicationStatus}
          ></Route>
          <Route
            path="/occupancyhistory"
            element={StudentOccupancyHistory}
          ></Route>
          <Route path="/hostelid" element={HostelID}></Route>
          <Route path="/hostelList" element={hostelList}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
