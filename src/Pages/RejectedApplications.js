import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';
import Button from '../Components/Button';
import { MdOutlinePictureAsPdf } from "react-icons/md";
import { GiCancel } from "react-icons/gi";
import { useSelector } from "react-redux";

const RejectedApplications = ({showAlert}) => {
    const user = useSelector((state) => state.user.currentUser);
    const [applications, setApplications] = useState([]);
    useEffect(() => {
        const getApplications = async () => {
            try {
                const res = await axios.get(
                    "http://localhost:4000/hostelreg/applications/auth/application"
                );
                const array = Array.from(res.data).filter((app) => app.allotedStatus === "rejected");
                setApplications(array);
            } catch (err) {
                console.log(err);
            }
        };
        getApplications();
    }, []);
    if(user.user_desgn!=="admin"){
        return <div className="max-w-sm mx-auto my-5 rounded overflow-hidden shadow-lg">
        <div className="px-6 py-4">
          <div className="font-bold text-xl mb-2"><font color="red">Error! </font>You are unauthorised. </div>
        </div>
      </div>
      }
    const restore_app = async (id) => {
        const response = await fetch(`http://localhost:4000/hostelreg/applications/auth/application/${id}`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                alloted: "pending",

            })
            // authtoken to authorise the admin, for that we need a middleware that can be done later.
        });
        let array = applications.filter((app) => app._id !== id)
        setApplications(array);
        showAlert("success","Application restored")
        console.log(response);
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
    const renderedApplications = applications.map((app, ind) => {
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
                    <Button handleClick={() => { restore_app(app._id) }} danger>
                        <GiCancel className="my-auto mr-2"></GiCancel>Restore
                    </Button>
                </div>
            </div>
        );
    });
    return (
        <div className="h-fit min-h-screen bg-[#edf6f9] w-full">

            <div className="w-full h-full flex">
                <div className="h-full w-2/3 mx-auto">{renderedApplications}</div>
            </div>
        </div>
    );
}

export default RejectedApplications