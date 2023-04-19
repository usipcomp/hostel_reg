import React from 'react'
import { HiPencil } from 'react-icons/hi';
import Button from '../Components/Button';

const SingleHostelInfo = (props) => {
    const {h,gender,update_hostel_info} = props;
    return (
        <>
        <div className="p-6 bg-white m-4 rounded-xl hover:bg-gray-200 cursor-pointer duration-500 hover:scale-105">
        <div className="flex">
          <div className="font-semibold">Name</div>
          <div className="ml-2 text-gray-500 font-semibold">{h.Name}</div>
        </div>
        <div className="flex">
          <div className="font-semibold">Hostel ID</div>
          <div className="ml-2 text-gray-500 font-semibold">{h.HostelID}</div>
        </div>
        <div className="flex">
          <div className="font-semibold">Type</div>
          <div className="ml-2 text-gray-500 font-semibold">{gender}</div>
        </div>
        <div className="grid grid-cols-2">
          <div className="flex">
            <div className="font-semibold">1-Seater Beds</div>
            <div className="ml-2 text-gray-500 font-semibold">{h.oneS}</div>
          </div>
          <div className="flex">
            <div className="font-semibold">2-Seater Beds</div>
            <div className="ml-2 text-gray-500 font-semibold">{h.twoS}</div>
          </div>
          <div className="flex">
            <div className="font-semibold">3-Seater Beds (AC)</div>
            <div className="ml-2 text-gray-500 font-semibold">{h.threeSAC}</div>
          </div>
          <div className="flex">
            <div className="font-semibold">3-Seater Beds (Non-AC)</div>
            <div className="ml-2 text-gray-500 font-semibold">
              {h.threeSNAC}
            </div>
          </div>
          <div className="flex justify-end col-span-2">
            {/* <Button handleClick={()=>{delete_Hostel(h.HostelID)}} danger>
              <RxCross2 className="my-auto mr-1"></RxCross2>Delete
            </Button> */}
            <Button bgGreen handleClick={()=>{update_hostel_info(h)}}>
              <HiPencil className="my-auto mr-1"></HiPencil>Edit
            </Button>
          </div>
        </div>
      </div>
        </>
    )
}

export default SingleHostelInfo