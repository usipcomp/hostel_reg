import React, { useEffect, useState } from 'react'
import Navbar from "../Components/Navbar";
import { useSelector } from "react-redux";

const OccupancyHistoryStudent = () => {
    const user = useSelector((state) => state.user.currentUser);
    const [data, setData] = useState([]);
    const getOccupancyHistoryData = async (roll_no) => {
        const response = await fetch("http://localhost:4000/hostelreg/applications/auth/occupancyhistory", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                roll_no: roll_no,
            })
        })
        const json = await response.json();
        setData(json);
    }
    useEffect(() => {
        if(user.user!=="admin"){
            getOccupancyHistoryData(user.student.roll_no)
        }
    }, [user])

    return (
        <div className="w-full h-fit min-h-screen bg-[#edf6f9]">
            <div className="font-semibold m-10 text-2xl">
                Your Occupancy history
                {data && data.map((historyObj, index) => {
                    return <div className="p-6 bg-white m-4 rounded-xl hover:bg-gray-200 cursor-pointer duration-500 hover:scale-105" key={index}>
                        <div className="flex">
                            <div className="font-semibold">Roll No</div>
                            <div className="ml-2 text-gray-500 font-semibold">{historyObj.StudentRollNo}</div>
                        </div>
                        <div className="flex">
                            <div className="font-semibold">Bed ID</div>
                            <div className="ml-2 text-gray-500 font-semibold">{historyObj.BedID}</div>
                        </div>
                        <div className="flex">
                            <div className="font-semibold">Year of admission</div>
                            <div className="ml-2 text-gray-500 font-semibold">{historyObj.StudentYear}</div>
                        </div>
                            <div className="flex">
                                <div className="font-semibold">Application Number</div>
                                <div className="ml-2 text-gray-500 font-semibold">{historyObj.ApplicationNumber}</div>
                            </div>
                        <div className="grid grid-cols-2">
                            <div className="flex">
                                <div className="font-semibold">From Date</div>
                                <div className="ml-2 text-gray-500 font-semibold">{new Date(historyObj.FromDate).toDateString()}</div>
                            </div>
                            <div className="flex">
                                <div className="font-semibold">To Date</div>
                                <div className="ml-2 text-gray-500 font-semibold">{new Date(historyObj.ToDate).toDateString()}</div>
                            </div>
                        </div>

                    </div>
                })}
            </div>
        </div>
    )
}

export default OccupancyHistoryStudent