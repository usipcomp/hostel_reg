import React, { useEffect, useState } from 'react'
import { useSelector } from "react-redux";
import { Link } from 'react-router-dom';
import { MdOutlinePictureAsPdf } from 'react-icons/md';
import ViewAppStatus from './ViewAppStatus';

const StudentAppStatus = (roll_no) => {
    const [singleApplication, setSingleApplication] = useState(null)
    const user = useSelector((state) => state.user.currentUser);

    const getSingleApplication = async (roll_no) => {
        const response = await fetch("http://localhost:4000/hostelreg/applications/auth/get_application_details", {
            method: "POST",
            headers: {
                'Content-Type': "application/json",
            },
            body: JSON.stringify({
                roll_no: roll_no
            })

        });
        console.log(response)
        const json = await response.json();
        setSingleApplication(json);
    }
    useEffect(() => {
        getSingleApplication(user.student.roll_no);
        
    }, [user])
    return (
        <>
            <div className="w-full h-fit min-h-screen bg-[#edf6f9]">
                <h4 className='text-center my-2 font-bold text-xl'>Application Status</h4>
                {singleApplication && <>
                    <div className="font-semibold m-10 text-2xl">
                        <p>Your Application Status is <strong>{singleApplication.allotedStatus}</strong></p>
                    </div>
                    <div className="font-semibold m-10 text-2xl w-1/1 flex">
                        <p>Download/View your application &rarr;</p>
                        <Link to={`/${singleApplication._id}`} className="text-white text-xl self-center cursor-pointer bg-[#006d77] p-2 border-none hover:scale-105 duration-500 h-10 mr-auto ml-4 flex w-1/12">
                            <MdOutlinePictureAsPdf className="mr-2"></MdOutlinePictureAsPdf><div className='text-base'>PDF</div>
                        </Link>
                    </div>
                    {singleApplication.allotedStatus==="accepted"?<div>
                        <ViewAppStatus application={singleApplication}></ViewAppStatus>
                        {/* <div>hostel name</div> */}
                    </div>:<div></div>}
                </>
                }
            </div>
        </>
    )
}

export default StudentAppStatus