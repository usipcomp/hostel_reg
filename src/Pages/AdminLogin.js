import React, { useState } from "react";
import InputField from "../Components/InputField";
import Button from "../Components/Button";
import axios from "axios";
import { adminLogin } from "../redux/apiCalls";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

function Login() {
  const [AdminPassword, setAdminPassword] = useState("");
  const [AdminID, setAdminId] = useState("");
  const dispatch = useDispatch();
  const user = useSelector((state) => state);

  const handleAdminID = (e) => {
    setAdminId(e.target.value);
  };
  const handlePassword = (e) => {
    setAdminPassword(e.target.value);
  };

  const handleLogin = async () => {
    adminLogin(dispatch, { adminID: AdminID, password: AdminPassword });
  };
  // console.log(user);

  let error;
  if (user.error) {
    error = (
      <div className="text-red-500 font-semibold">
        Please enter the correct credentials
      </div>
    );
  }

  return (
    <div className="h-screen w-full flex">
      <div className="h-fit m-auto bg-[#dde5b6] w-1/3 p-10 rounded-lg">
        {error}
        <div className="font-bold mx-auto text-3xl my-4">Admin Login</div>
        <InputField
          label="Admin ID"
          placeholder=""
          type="text"
          textxl={true}
          handleChange={handleAdminID}
        ></InputField>
        <InputField
          label="Password"
          type="password"
          textxl={true}
          handleChange={handlePassword}
        ></InputField>
        <Button wide success rounded handleClick={handleLogin}>
          Login
        </Button>
        <div className="w-full justify-between mt-4 flex">
          <Link to="/login" className="font-semibold text-md my-auto">
            Are you a student?
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
