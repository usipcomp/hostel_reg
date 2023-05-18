import React, { useEffect, useState } from 'react'
import { useSelector } from "react-redux";
import { Link } from 'react-router-dom';
import { MdOutlinePictureAsPdf } from 'react-icons/md';

const MyProfile = () => {
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
        const json = await response.json();
        console.log(json)
        setSingleApplication(json);
    }
    useEffect(() => {
        getSingleApplication(user.student.roll_no);
        
    }, [user])
    return (
        <>


            <div>
                {singleApplication?<div className="container mx-auto my-5 p-5">
                    <div className="md:flex no-wrap md:-mx-2 ">
                        <div className="w-full md:w-3/12 md:mx-2">
                            <div className="bg-white p-3 border-t-4 border-green-400">
                                <div className="image overflow-hidden">
                                    <img className="h-auto w-full mx-auto"
                                        src={''}
                                        alt="" />
                                </div>
                                <h1 className="text-gray-900 font-bold text-xl leading-8 my-1">{user.student.fullname}</h1>
                                <h3 className="text-gray-600 font-lg text-semibold leading-6">{user.student.roll_no}</h3>
                                <ul
                                    className="bg-gray-100 text-gray-600 hover:text-gray-700 hover:shadow py-2 px-3 mt-3 divide-y rounded shadow-sm">
                                    <li className="flex items-center py-3">
                                        <span>Status</span>
                                        <span className="ml-auto"><span
                                            className="bg-green-500 py-1 px-2 rounded text-white text-sm">{singleApplication.allotedStatus}</span></span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="w-full md:w-9/12 mx-2 h-64 text-lg">
                            <div className="bg-white p-3 shadow-sm rounded-sm">
                                <div className="flex items-center space-x-2 font-semibold text-gray-900 leading-8">
                                    <span clas="text-green-500">
                                        <svg className="h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                            stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                        </svg>
                                    </span>
                                    <span className="tracking-wide">About</span>
                                </div>
                                <div className="text-gray-700">
                                    <div className="grid md:grid-cols-2 text-sm">
                                        <div className="grid grid-cols-2">
                                            <div className="px-4 py-2 font-semibold text-lg">First Name</div>
                                            <div className="px-4 py-2 text-lg">{user.student.f_name}</div>
                                        </div>
                                        <div className="grid grid-cols-2">
                                            <div className="px-4 py-2 font-semibold text-lg">Last Name</div>
                                            <div className="px-4 py-2 text-lg">{user.student.l_name}</div>
                                        </div>
                                        <div className="grid grid-cols-2">
                                            <div className="px-4 py-2 font-semibold text-lg">Gender</div>
                                            <div className="px-4 py-2 text-lg">{user.student.sex}</div>
                                        </div>
                                        <div className="grid grid-cols-2">
                                            <div className="px-4 py-2 font-semibold text-lg">Contact No.</div>
                                            <div className="px-4 py-2 text-lg">{user.student.phone}</div>
                                        </div>
                                        
                                        <div className="grid grid-cols-2">
                                            <div className="px-4 py-2 font-semibold text-lg">Email.</div>
                                            <div className="px-4 py-2">
                                                <a className="text-blue-800 text-lg" href={`mailto:${user.student.email}`}>{user.student.email}</a>
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-2">
                                            <div className="px-4 py-2 font-semibold text-lg">Admission Year</div>
                                            <div className="px-4 py-2 text-lg">{user.student.reg_year}</div>
                                        </div>
                                    </div>
                                </div>
                                <hr style={{border:"0.5px solid"}}/>
                                {<Link to={`/hostelid/${singleApplication._id}`} className="text-white text-xl cursor-pointer bg-[#006d77] p-2 border-none hover:scale-105 duration-500 h-10 mx-auto flex my-2 w-1/2">
                            <div className="mr-2"></div><div className='text-base'>Download/View Your Hostel ID Card</div>
                        </Link>}
                            </div>

                        </div>
                    </div>
                </div>:""}
            </div>
        </>
    )
}

export default MyProfile