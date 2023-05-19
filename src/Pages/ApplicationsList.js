import React, { useEffect, useState } from "react";
import Button from "../Components/Button";
import Navbar from "../Components/Navbar";
import { MdOutlinePictureAsPdf } from "react-icons/md";
import { GiCancel } from "react-icons/gi";
import axios from "axios";
import { Link } from "react-router-dom";
import InputField from "../Components/InputField";
import { useSelector } from "react-redux";

const ApplicationsList = ({showAlert}) => {
  const [applications, setApplications] = useState([]);
  const [toggleButton, setToggleButton] = useState(false)
  const user = useSelector((state) => state.user.currentUser);

  useEffect(() => {
    if(user.user==="admin"){
      const getApplications = async () => {
        try {
          const res = await axios.get(
            "http://localhost:4000/hostelreg/applications/auth/application"
          );
          const array = Array.from(res.data).filter((app)=>{
            return (app.allotedStatus!=="rejected")&&(app.allotedStatus!=="accepted")
          });
          setApplications(array);
        } catch (err) {
          console.log(err); 
        }
      };
      getApplications();
    }
    else{
      alert("You are not authorised")
    }
  }, []);
  const remove_app = async(id)=>{
    const response = await fetch(`http://localhost:4000/hostelreg/applications/auth/application/${id}`,{
      method:"PUT",
      headers:{
        'Content-Type':'application/json'
      },
      body:JSON.stringify({
        allotedStatus:"rejected",
        
      })
      // authtoken to authorise the admin, for that we need a middleware that can be done later.
    });
    let array = applications.filter((app)=>app._id!==id)
    setApplications(array);
    showAlert("success","Application Rejected")
    console.log(response);
  }
  const runAlgo = async(event)=>{
    event.preventDefault();
    let array = [];
    applications.forEach(element => {
      array.push(element)
    });
    let fromdate = (event.target[0].id==="from_date")?(event.target[0].value):"01/01/2023";
    let todate = (event.target[1].id==="to_date")?(event.target[1].value):"01/01/2023";
    let admn_year = (event.target[2].id==="admn_year")?(event.target[2].value):"2019";
    console.log(admn_year)
    const response = await fetch("http://localhost:4000/hostels/allocate",{
      method:"POST",
      headers:{
        'Content-Type':'application/json'
      },
      body:JSON.stringify({
        applications:array,
        from:fromdate,
        to:todate,
        admn_year:admn_year,
      }),
    });
    console.log(response)
  }
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
  const renderedApplications = applications.map((app,ind) => {
    return (
      <div key={ind} className="w-full h-fit bg-gray-200 p-4 rounded-xl my-4 flex justify-between shadow-lg hover:scale-105 duration-500 hover:bg-gray-300 cursor-pointer">
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
          <Link to={`/${app._id}`} className="text-white self-center cursor-pointer bg-[#006d77] p-2 border-none hover:scale-105 duration-500 h-10 mx-auto flex">
              <MdOutlinePictureAsPdf className="mr-2"></MdOutlinePictureAsPdf><div>PDF</div>
          </Link>
          <Button handleClick={()=>{remove_app(app._id)}} danger>
            <GiCancel className="my-auto mr-2"></GiCancel>Reject
          </Button>
        </div>
      </div>
    );
  });
  return (
    <div className="h-fit min-h-screen bg-[#edf6f9] w-full">

      {toggleButton && <div id="authentication-modal" tabIndex="-1" aria-hidden="true" className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none bg-gray-600/75">
          <div className="relative w-full max-w-md max-h-full">

            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
              <button type="button" className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white" onClick={() => { setToggleButton(!toggleButton) }}>
                <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                <span className="sr-only">Close modal</span>
              </button>
              <div className="px-6 py-6 lg:px-8 w-full">
                <h3 className="mb-4 text-xl font-medium text-gray-900 dark:text-white">Edit</h3>
                <form className="w-1/1 mx-auto my-10" onSubmit={(event)=>runAlgo(event)}>
                  <InputField
                    name="from_date"
                    id="from_date"
                    type="date"
                    label="From Date"
                    required
                  ></InputField>
                  <InputField
                    name="to_date"
                    id="to_date"
                    type="date"
                    label="To Date"
                    required
                  ></InputField>
                  <InputField
                    name="admn_year"
                    id="admn_year"
                    type="number"
                    label="For Year"
                    required
                  ></InputField>

                  
                  <Button bgGreen wide>
                    Submit
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </div>}
      <div className="w-full h-full flex">
        <div className="h-full w-2/3 mx-auto">{renderedApplications}</div>
      </div>
      <div className="flex w-full justify-center">
        <Button handleClick={()=>{
          setToggleButton(!toggleButton);
          
          }} bgGreen>Run Allotment Algorithm</Button>
      </div>
    </div>
  );
};

export default ApplicationsList;
