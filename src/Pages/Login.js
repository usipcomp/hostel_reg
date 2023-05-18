import React, { useState } from "react";
import InputField from "../Components/InputField";
import Button from "../Components/Button";
import axios from "axios";
import { login } from "../redux/apiCalls";
import { useDispatch, useSelector } from "react-redux";

function Login() {
  const [rollNo, setRollNo] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const user = useSelector((state) => state);

  const handleRollNo = (e) => {
    setRollNo(e.target.value);
  };
  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleLogin = async () => {
    login(dispatch, { roll_no: rollNo, password: password });
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
        <div className="font-bold mx-auto text-3xl my-4">Login</div>
        <InputField
          label="Roll Number"
          placeholder="Example: 2K21/EE/87"
          type="text"
          textxl={true}
          handleChange={handleRollNo}
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
          <div className="font-semibold text-md my-auto">Not a student?</div>
        </div>
      </div>
    </div>
  );
}

export default Login;
