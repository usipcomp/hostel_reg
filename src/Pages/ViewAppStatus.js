import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const ViewAppStatus = (props) => {
    const [bednPriceData, setBednPriceData] = useState(null)
    const getAllotedData = async () => {
        const response = await fetch("http://localhost:4000/hostelreg/applications/auth/getAllotedData", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                roll_no: props.application.roll_no,
            })
        })
        const json = await response.json();
        console.log(json);
        setBednPriceData(json);
    }
    useEffect(() => {
        getAllotedData();
    }, [])
    return (
        <>
            {bednPriceData ?
                <>
                    <h2 className='text-center my-2 font-bold text-xl'>Allotment Details and Fee Payment</h2>
                    <div className="flex justify-center">
                        <div className="p-6 w-1/2 bg-white m-4 rounded-xl hover:bg-gray-200 cursor-pointer duration-500 hover:scale-105 flex flex-col">
                            <h2 className='text-center my-2 font-bold text-xl'>Bed Details</h2>
                            <div className="flex">
                                <div className="font-semibold">BedID</div>
                                <div className="ml-2 text-gray-500 font-semibold">{bednPriceData.BedData.BedID}</div>
                            </div>
                            <div className="flex">
                                <div className="font-semibold">Bed Number</div>
                                <div className="ml-2 text-gray-500 font-semibold">{bednPriceData.BedData.BedNo}</div>
                            </div>
                            <div className="flex">
                                <div className="font-semibold">Room No</div>
                                <div className="ml-2 text-gray-500 font-semibold">{bednPriceData.BedData.RoomNo}</div>
                            </div>
                            <div className="flex">
                                <div className="font-semibold">Room Type</div>
                                <div className="ml-2 text-gray-500 font-semibold">{bednPriceData.BedData.RoomType}</div>
                            </div>
                            <div className="flex">
                                <div className="font-semibold">Application ID</div>
                                <div className="ml-2 text-gray-500 font-semibold">{bednPriceData.BedData.ApplicationID}</div>
                            </div>
                            <div className="flex">
                                <div className="font-semibold">Floor</div>
                                <div className="ml-2 text-gray-500 font-semibold">{bednPriceData.BedData.Floor}</div>
                            </div>
                            <div className="flex">
                                <div className="font-semibold">Price</div>
                                <div className="ml-2 text-gray-500 font-semibold">{bednPriceData.BedPriceData.Price}</div>
                            </div>
                        </div>
                        <div className="p-6 w-1/2 bg-white m-4 rounded-xl hover:bg-gray-200 cursor-pointer duration-500 hover:scale-105 flex flex-col">
                            <h2 className='text-center my-2 font-bold text-xl'>Hostel Details</h2>
                            <div className="flex">
                                <div className="font-semibold">HostelID</div>
                                <div className="ml-2 text-gray-500 font-semibold">{bednPriceData.HostelData.HostelID}</div>
                            </div>
                            <div className="flex">
                                <div className="font-semibold">Name</div>
                                <div className="ml-2 text-gray-500 font-semibold">{bednPriceData.HostelData.Name}</div>
                            </div>
                            <div className="flex">
                                <div className="font-semibold">Type</div>
                                <div className="ml-2 text-gray-500 font-semibold">{bednPriceData.HostelData.Type}</div>
                            </div>
                        </div>
                    </div>
                        <div className="flex w-full">
                            {/* check fee paid or not if fee is due then display the link to pay*/}
                            {<Link className="text-white self-center cursor-pointer bg-[#006d77] p-2 border-none hover:scale-105 duration-500 h-10 mx-auto flex" to="/">Pay Fee</Link>}
                        </div>
                </>
                : "Loading"
            }
        </>
    )
}

export default ViewAppStatus