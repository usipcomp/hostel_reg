import React from "react";
import { useSelector } from "react-redux";

const AdminHome = () => {
  
  const user = useSelector((state) => state.user.currentUser);
  if(user.user_desgn!=="admin"){
    return <div className="max-w-sm mx-auto my-5 rounded overflow-hidden shadow-lg">
    <div className="px-6 py-4">
      <div className="font-bold text-xl mb-2"><font color="red">Error! </font>You are unauthorised. </div>
    </div>
  </div>
  }
  return (
    <div className="w-full h-fit min-h-screen bg-[#edf6f9]">
      <div className="font-semibold m-10 text-2xl">Welcome! Admin</div>
    </div>
  );
};

export default AdminHome;
