import React, { useState } from "react";
import InputField from "../Components/InputField";
import Button from "../Components/Button";
import axios from "axios";
import { login } from "../redux/apiCalls";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

function Login() {
  const [rollNo, setRollNo] = useState("");
  const [password, setPassword] = useState("");
  const [fieldType, setFieldType] = useState("password");
  const [errorContent, setErrorContent] = useState(<div></div>);
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
    if (user.user.error) {
      setErrorContent(
        <div className="text-red-500 font-semibold">
          Please enter the correct credentials
        </div>
      );
    }
  };
  // console.log(user);

  let eye = (
    <AiOutlineEye
      className="my-auto ml-4 cursor-pointer"
      onClick={() => {
        setFieldType("string");
      }}
      size={30}
    ></AiOutlineEye>
  );
  if (fieldType == "string") {
    eye = (
      <AiOutlineEyeInvisible
        className="my-auto ml-4 cursor-pointer"
        onClick={() => {
          setFieldType("password");
        }}
        size={30}
      ></AiOutlineEyeInvisible>
    );
  } else {
    eye = (
      <AiOutlineEye
        className="my-auto ml-4 cursor-pointer"
        onClick={() => {
          setFieldType("string");
        }}
        size={30}
      ></AiOutlineEye>
    );
  }

  return (
    <div className="h-screen w-full flex">
      <div className="h-fit m-auto bg-[#dde5b6] w-1/3 p-10 rounded-lg">
        {errorContent}
        <div className="font-bold mx-auto text-3xl my-4">Login</div>
        <InputField
          label="Roll Number"
          placeholder="Example: 2K21/EE/87"
          type="text"
          textxl={true}
          handleChange={handleRollNo}
        ></InputField>
        <div className="flex items-center">
          <InputField
            label="Password"
            type={fieldType}
            textxl={true}
            handleChange={handlePassword}
          ></InputField>
          {eye}
        </div>

        <Button wide success rounded handleClick={handleLogin}>
          Login
        </Button>
        <div className="w-full justify-between mt-4 flex">
          <Link to="/admin" className="font-semibold text-md my-auto">
            Not a student?
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
