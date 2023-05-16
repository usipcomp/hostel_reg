import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../Components/Navbar";

const AdminHome = () => {
  const Links = [
    { value: "Open/Close Application", redirect: "/manageapplications" },
    { value: "Submitted Applications", redirect: "/submittedapplications" },
    { value: "Rejected Application", redirect: "/rejected_applications" },
    { value: "Manage Hostels", redirect: "/managehostels" },
  ];

  return (
    <div className="w-full h-fit min-h-screen bg-[#edf6f9]">
      <Navbar Links={Links}></Navbar>
      <div className="font-semibold m-10 text-2xl">Welcome! Ayush Gupta</div>
    </div>
  );
};

export default AdminHome;
