import React from "react";
import { useSelector } from "react-redux";
import Navbar from "../Components/Navbar";

function StudentHome() {
  const user = useSelector((state) => state.currentUser);
  const Links = [
    {
      value: "Application Status",
      redirect: "/applicationstatus",
    },
    { value: "Occupancy History", redirect: "/occupancyhistory" },
    { value: "New Application", redirect: "/application" },
    { value: "Change Password", redirect: "/changepassword" },
  ];
  return (
    <div className="w-full h-fit min-h-screen bg-[#edf6f9]">
      <Navbar Links={Links}></Navbar>
      <div className="font-semibold m-10 text-2xl">
        Welcome! {user.student.fullname}
      </div>
    </div>
  );
  // return <div>Welcome! {user.student.fullname}</div>;
}

export default StudentHome;
