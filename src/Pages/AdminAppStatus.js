import React,{useState,useEffect} from 'react'
import axios from 'axios';
import Navbar from '../Components/Navbar';
import { MdOutlinePictureAsPdf } from "react-icons/md";
import { GiCancel } from "react-icons/gi";
import { Link } from 'react-router-dom';
import Button from '../Components/Button';

const AdminAppStatus = () => {
  const [allotedApps, setAllotedApps] = useState([]);
  const [rejectedApps, setRejectedApps] = useState([])
  useEffect(() => {
    const getApplications = async () => {
      try {
        const res = await axios.get(
          "http://localhost:4000/hostelreg/applications/auth/application"
        );
        const arrayAllotedCopy = Array.from(res.data);
        const arrayRejectedCopy = Array.from(res.data);
        const arrayAlloted = arrayAllotedCopy.filter((app)=>app.allotedStatus==="accepted");
        const arrayRejected = arrayRejectedCopy.filter((app)=>app.allotedStatus==="rejected")
        setAllotedApps(arrayAlloted);
        setRejectedApps(arrayRejected)
      } catch (err) {
        console.log(err); 
      }
    };
    getApplications();
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
    let array = allotedApps.filter((app)=>app._id!==id)
    setAllotedApps(array);
    console.log(response);
  }
//   const restore_app = async (id) => {
//     const response = await fetch(`http://localhost:4000/hostelreg/applications/auth/application/${id}`, {
//         method: "PUT",
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({
//             alloted: "pending",

//         })
//         // authtoken to authorise the admin, for that we need a middleware that can be done later.
//     });
//     let array = applications.filter((app) => app._id !== id)
//     setApplications(array);
//     showAlert("success","Application restored")
//     console.log(response);
// }
  const acceptedApplications = allotedApps.map((app,ind) => {
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
  const rejectedApplications = rejectedApps.map((app,ind) => {
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
            <GiCancel className="my-auto mr-2"></GiCancel>Restore
          </Button>
        </div>
      </div>
    );
  });
  return (
    <div className="h-fit min-h-screen bg-[#edf6f9] w-full">

      <div className="flex w-full">
        <div className='flex-1'>
          <h4 className='text-center my-3 font-bold text-xl'>Alloted Applications</h4>
          <div className="w-full h-full flex">
            <div className="h-full w-2/3 mx-auto">{acceptedApplications}</div>
          </div>
        </div>
        <div className='flex-1'>
          <h4 className='text-center my-3 font-bold text-xl'>Rejected Applications</h4>
          <div className="w-full h-full flex">
            <div className="h-full w-2/3 mx-auto">{rejectedApplications}</div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default AdminAppStatus