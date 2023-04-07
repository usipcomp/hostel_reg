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

function App() {
  const user = useSelector((state) => state.user.currentUser);
  let homeContent,
    AdminHomeContent,
    ApplicationsListContent,
    ManageApplicationContent,
    RegFormContent,
    loginContent,
    ManageHostelsContent,
    NewHostelContent;
  if (!user) {
    homeContent = <Login></Login>;
    AdminHomeContent = <Login></Login>;
    ApplicationsListContent = <Login></Login>;
    ManageApplicationContent = <Login></Login>;
    RegFormContent = <Login></Login>;
    loginContent = <Login></Login>;
    ManageHostelsContent = <Login></Login>;
    NewHostelContent = <Login></Login>;
  } else {
    homeContent = <StudentHome></StudentHome>;
    AdminHomeContent = <AdminHome></AdminHome>;
    ApplicationsListContent = <ApplicationsList></ApplicationsList>;
    ManageApplicationContent = <ManageApplication></ManageApplication>;
    RegFormContent = <RegForm></RegForm>;
    loginContent = <StudentHome></StudentHome>;
    ManageHostelsContent = <ManageHostels></ManageHostels>;
    NewHostelContent = <NewHostel></NewHostel>;
  }
  return (
    <div>
      <Router>
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
          <Route path="/application" element={RegFormContent}></Route>
          <Route path="/" element={homeContent}></Route>
          <Route path="/managehostels" element={ManageHostelsContent}></Route>
          <Route path="/newhostel" element={NewHostelContent}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
