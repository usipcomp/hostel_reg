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
import StudentHome from "./Pages/StudentHome";
import AdminHome from "./Pages/AdminHome";
import ApplicationsList from "./Pages/ApplicationsList";
import ManageApplication from "./Pages/ManageApplication";
import ManageHostels from "./Pages/ManageHostels";
import NewHostel from "./Pages/NewHostel";
import AdminLogin from "./Pages/AdminLogin"
import StudentApplicationView from "./Pages/StudentApplicationView"
import RejectedApplications from "./Pages/RejectedApplications";
import AdminAppStatus from "./Pages/AdminAppStatus";
import StudentAppStatus from "./Pages/StudentAppStatus";
import OccupancyHistoryStudent from "./Pages/OccupancyHistoryStudent";
import Navbar from "./Components/Navbar";
import "./App.css"
import MyProfile from "./Pages/MyProfile";
import HostelIDCard from "./Pages/HostelDCard"

function App() {
  const user = useSelector((state) => state.user.currentUser);
  
  let Links=[]
  if(user && user.user!=="admin"){
    Links = [
      { value: "My Profile", redirect: "/hostelid" },
      {
        value: "Application Status",
        redirect: "/student_application_status",
      },
      { value: "Occupancy History", redirect: "/occupancyhistory" },
      { value: "New Application", redirect: "/application" },
      { value: "Change Password", redirect: "/changepassword" },
    ];
  }
  else{
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
    AdminApplicationStatus,
    StudentApplicationStatus,
    StudentOccupancyHistory,
    HostelID,
    hostelIDCard,
    NewHostelContent;
    console.log(user);
  if (!user) {
    homeContent = <Login></Login>;
    AdminHomeContent = <AdminLogin></AdminLogin>;
    ApplicationsListContent = <AdminLogin></AdminLogin>;
    ManageApplicationContent = <AdminLogin></AdminLogin>;
    RegFormContent = <Login></Login>;
    loginContent = <Login></Login>;
    ManageHostelsContent = <AdminLogin></AdminLogin>;
    NewHostelContent = <AdminLogin></AdminLogin>;
    rejectedapplications =  <AdminLogin></AdminLogin>;
    AdminApplicationStatus =  <AdminLogin></AdminLogin>;
    StudentApplicationStatus = <Login></Login>
    StudentOccupancyHistory = <Login></Login>
    HostelID = <Login></Login>;
    hostelIDCard = <HostelIDCard></HostelIDCard>
    
  } else {
    homeContent = <StudentHome></StudentHome>;
    AdminHomeContent = <AdminHome></AdminHome>;
    ApplicationsListContent = <ApplicationsList></ApplicationsList>;
    ManageApplicationContent = <ManageApplication></ManageApplication>;
    ApplicationView = <StudentApplicationView></StudentApplicationView>
    RegFormContent = <RegForm></RegForm>;
    loginContent = <StudentHome></StudentHome>;
    ManageHostelsContent = <ManageHostels></ManageHostels>;
    NewHostelContent = <NewHostel></NewHostel>;
    rejectedapplications = <RejectedApplications></RejectedApplications>
    AdminApplicationStatus = <AdminAppStatus></AdminAppStatus>
    StudentApplicationStatus = <StudentAppStatus></StudentAppStatus>
    StudentOccupancyHistory = <OccupancyHistoryStudent></OccupancyHistoryStudent>
    HostelID = <MyProfile></MyProfile>
    hostelIDCard = <HostelIDCard></HostelIDCard>
  }
  return (
    <div>
      <Router>
        {user?<Navbar Links={Links}></Navbar>:""}
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
          <Route
            path="/:id"
            element={ApplicationView}
          ></Route>
          <Route
            path="/hostelid/:id"
            element={hostelIDCard}
          ></Route>
          <Route path="/application" element={RegFormContent}></Route>
          <Route path="/" element={homeContent}></Route>
          <Route path="/managehostels" element={ManageHostelsContent}></Route>
          <Route path="/newhostel" element={NewHostelContent}></Route>
          <Route path="/rejected_applications" element={rejectedapplications}></Route>
          <Route path="/admin_application_status" element={AdminApplicationStatus}></Route>
          <Route path="/student_application_status" element={StudentApplicationStatus}></Route>
          <Route path="/occupancyhistory" element={StudentOccupancyHistory}></Route>
          <Route path="/hostelid" element={HostelID}></Route>

        </Routes>
      </Router>
    </div>
  );
}

export default App;
