import React from "react";
import InputField from "../Components/InputField";
import Button from "../Components/Button";
import { FcGoogle } from "react-icons/fc";

function Login() {
  return (
    <div className="h-screen bg-[#f0ead2] w-full flex">
      <div className="h-fit m-auto bg-[#dde5b6] w-1/3 p-10 rounded-lg">
        <div className="font-bold mx-auto text-3xl my-4">Login</div>
        <InputField
          label="Roll Number"
          placeholder="Example: 2K21/EE/87"
          type="text"
          textxl={true}
        ></InputField>
        <InputField label="Password" type="password" textxl={true}></InputField>
        <Button wide success rounded>
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
