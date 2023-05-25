import React from "react";
import { useSelector } from "react-redux";

function StudentHome() {
  const user = useSelector((state) => state.user.currentUser);

  return (
    <>

      {user?<div className="w-full h-fit min-h-screen bg-[#edf6f9]">

        <div className="font-semibold m-10 text-2xl">
          Welcome! {user.student.fullname}
        </div>
      </div>:<div>LOADING....</div>}
    </>
  );
  // return <div>Welcome! {user.student.fullname}</div>;
}

export default StudentHome;
