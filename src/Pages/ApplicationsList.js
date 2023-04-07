import React, { useEffect, useState } from "react";
import Button from "../Components/Button";
import Navbar from "../Components/Navbar";
import { MdOutlineDone } from "react-icons/md";
import { GiCancel } from "react-icons/gi";
import axios from "axios";

const ApplicationsList = () => {
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    const getApplications = async () => {
      try {
        const res = await axios.get(
          "http://localhost:4000/hostelreg/applications/auth/application"
        );
        setApplications(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getApplications();
  }, []);

  const Links = [
    { value: "Open/Close Application", redirect: "/manageapplications" },
    { value: "Submitted Applications", redirect: "/submittedapplications" },
    { value: "Manage Hostels", redirect: "/managehostels" },
  ];
  // const applications = [
  //   {
  //     name: "Ayush Gupta",
  //     roll: "2k21/ee/85",
  //     applied_on: "26/01/2023",
  //     app_id: 123123,
  //   },
  //   {
  //     name: "Ayush Gupta",
  //     roll: "2k21/ee/85",
  //     applied_on: "26/01/2023",
  //     app_id: 232342,
  //   },
  //   {
  //     name: "Ayush Gupta",
  //     roll: "2k21/ee/85",
  //     applied_on: "26/01/2023",
  //     app_id: 21312412,
  //   },
  // ];
  const renderedApplications = applications.map((app) => {
    return (
      <div className="w-full h-fit bg-gray-200 p-4 rounded-xl my-4 flex justify-between shadow-lg hover:scale-105 duration-500 hover:bg-gray-300 cursor-pointer">
        <div className="flex flex-col">
          <div className="flex">
            <div className="font-semibold text-gray-500 text-lg">
              {app.name}
            </div>
            <div className="font-semibold text-gray-500 text-lg ml-2">
              {app.roll_no}
            </div>
          </div>
          <div className="text-gray-500">Applied On: {app.applied_on}</div>
        </div>
        <div className="flex">
          <Button bgGreen>
            <MdOutlineDone className="my-auto mr-2"></MdOutlineDone>Accept
          </Button>
          <Button danger>
            <GiCancel className="my-auto mr-2"></GiCancel>Reject
          </Button>
        </div>
      </div>
    );
  });
  return (
    <div className="h-fit min-h-screen bg-[#edf6f9] w-full">
      <Navbar Links={Links}></Navbar>
      <div className="w-full h-full flex">
        <div className="h-full w-2/3 mx-auto">{renderedApplications}</div>
      </div>
      <div className="flex w-full justify-center">
        <Button bgGreen>Run Allotment Algorithm</Button>
      </div>
    </div>
  );
};

export default ApplicationsList;
