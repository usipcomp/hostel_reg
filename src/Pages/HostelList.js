import React, { useEffect, useState } from "react";
import Button from "../Components/Button";
import { MdFileDownload } from "react-icons/md";
import axios from "axios";

const HostelList = ({showAlert}) => {
    // TO-DO - remove below queryparams code after integration.
    const queryParams = new URLSearchParams(window.location.search);
    const containsContact = queryParams.has('contact');
    const HostelLists = ['HID 1', 'HID 2', 'HID 3', 'HID 4', 'HID 5']
    const [list, setList] = useState(HostelLists)
    useEffect(() => {
        const getList = () => {
            if(containsContact) {
                getApplications();
                return
            } 
        };
        getList();       
    }, []);
    const getApplications = async () => {
        try {
          const res = await axios.get(
            "http://localhost:4000/hostelreg/applications/auth/application"
          );
          const array = Array.from(res.data).filter((app)=>app.applicable!==false);
          getUniqueBatches(array);
        } catch (err) {
          console.log(err); 
        }
      };
    
    const getUniqueBatches = (arr) => {
        const batch = [];
        if(arr.length > 0) {
            arr.forEach((result, i) => {
                const year = result.year_of_admission;
                if(!batch.includes(year)) {
                    batch.push(year);
                }
            });
        }
        setList(batch);
    }
    const renderHostelLists = list.map((hostel, ind) => {
        return (
            <div key={ind} className="w-full h-fit bg-gray-200 p-4 rounded-xl my-4 flex justify-between shadow-lg hover:scale-105 duration-500 hover:bg-gray-300 cursor-pointer">
                <div className="my-auto">
                    <div className="font-semibold text-gray-500 text-lg">
                        {hostel}
                    </div>
                </div>
                <div className="flex">
                    <Button handleClick={() => { }} danger>
                        <MdFileDownload className="my-auto mr-2"></MdFileDownload>Download Now
                    </Button>
                </div>
            </div>
        );
    });
    return (
        <div className="h-fit min-h-screen bg-[#edf6f9] w-full">

            <div className="w-full h-full flex">
                <div className="h-full w-2/3 mx-auto">{renderHostelLists}</div>
            </div>
        </div>
    );
}

export default HostelList