import React from "react";
import { useSelector } from "react-redux";
import Navbar from "../Components/Navbar";

function StudentHome() {
  const user = useSelector((state) => state.user.currentUser);

  return (
    <div className="w-full h-fit min-h-screen bg-[#edf6f9]">

      <div className="font-semibold m-10 text-2xl">
        Welcome! {user.student.fullname}
      </div>
    </div>
  );
  // return <div>Welcome! {user.student.fullname}</div>;
}

export default StudentHome;
