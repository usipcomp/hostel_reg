import React from "react";
import { useSelector } from "react-redux";

function Home() {
  const user = "Aditya";
  // const user = useSelector((state) => state.currentUser);
  return <div>Welcome! {user}</div>;
  // return <div>Welcome! {user.student.fullname}</div>;
}

export default Home;
