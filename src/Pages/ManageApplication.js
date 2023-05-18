import React,{useState,useEffect} from "react";
import Button from "../Components/Button";
import Navbar from "../Components/Navbar";
import axios from "axios";
import { Link } from "react-router-dom";
const ManageApplication = () => {
  const [applications, setApplications] = useState();
  const openCloseApplications = async(flag)=>{
    const response = await fetch("http://localhost:4000/hostels/acceptresponses",{
      method:"POST",
      headers:{
        'Content-Type':'application/json',
      },
      body:JSON.stringify({
        acceptResponses:flag,
      })
    })
    console.log(response);
  }
  useEffect(() => {
    const getApplications = async () => {
      try {
        const res = await axios.get(
          "http://localhost:4000/hostelreg/applications/auth/application"
        );
        const array = Array.from(res.data).filter((app)=>app.applicable!==false);
        setApplications(array.length);
      } catch (err) {
        console.log(err); 
      }
    };
    getApplications();
  }, []);
  return (
    <div className="w-full min-h-screen h-fit bg-[#edf6f9]">

      <div className="w-full h-full">
        <div className="flex justify-end">
          <div className="m-4">
            <Button handleClick={()=>{openCloseApplications(true)}} bgGreen>New Application</Button>
          </div>
        </div>
        <div className="flex w-full h-full">
          <div className="w-1/2 h-full m-auto text-center">
            <div className="font-semibold text-2xl">
              CURRENTLY ACTIVE APPLICATION
            </div>
            <div className="p-2 bg-gray-100 font-semibold text-xl">
              Started On: 01/01/2023
            </div>
            <div className="p-2 bg-gray-100 font-semibold text-xl">
              Last Date to Apply: 02/02/2023
            </div>
            <div className="p-2 bg-gray-100 font-semibold text-xl">
              Admission Year: 2023, 2022
            </div>
            <div className="p-2 bg-gray-100 font-semibold text-xl">
              Applications Received: {applications}
            </div>
            <div className="flex justify-center mt-4">
              <Link to="/submittedapplications">
                <Button bgGreen handleClick={() => {}}>
                  View All Applications
                </Button>
              </Link>
              <Button handleClick={()=>{openCloseApplications(false)}} danger>Close Application</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageApplication;
