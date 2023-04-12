import React, { useEffect } from "react";
import Navbar from "../Components/Navbar";
import Button from "../Components/Button";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getHostels } from "../redux/apiCalls";
import { RxCross2 } from "react-icons/rx";
import { HiPencil } from "react-icons/hi";
import { AiOutlinePlus } from "react-icons/ai";
import { deleteHostel } from "../redux/hostelRedux";

function ManageHostels() {
  const dispatch = useDispatch();
  const hostel = useSelector((state) => state.hostel);

  useEffect(() => {
    getHostels(dispatch);
  }, [dispatch]);

  console.log(hostel.hostels);

  const delete_Hostel = async (id)=>{
    const response = await fetch(`http://localhost:4000/hostels/${id}`,{
      method:"DELETE",
      // authtoken to authorise the admin, for that we need a middleware that can be done later.
    });
    dispatch(deleteHostel(id));
  }
  const update_Hostel = async (id)=>{
    const response = await fetch(`http://localhost:4000/hostels/${id}`,{
      method:"PUT",
      // authtoken to authorise the admin, for that we need a middleware that can be done later.
      body:JSON.stringify({
        // oneS:req.body.oneS,
        // twoS:req.body.twoS,
        // threeSNAC:req.body.threeSNAC,
        // threeSAC:req.body.threeSAC,
        // Type:req.body.Type,
      })
    });
    dispatch(update_Hostel(id));
  }
  const Links = [
    { value: "Open/Close Application", redirect: "/manageapplications" },
    { value: "Submitted Applications", redirect: "/submittedapplications" },
    { value: "Manage Hostels", redirect: "/managehostels" },
  ];

  const renderedHostels = hostel.hostels.map((h) => {
    let gender;
    if (h.Type === "G") {
      gender = "Girls";
    } else {
      gender = "Boys";
    }
    return (
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
            <Button handleClick={()=>{delete_Hostel(h.HostelID)}} danger>
              <RxCross2 className="my-auto mr-1"></RxCross2>Delete
            </Button>
            <Button bgGreen>
              <HiPencil className="my-auto mr-1"></HiPencil>Edit
            </Button>
          </div>
        </div>
      </div>
    );
  });

  return (
    <div className="w-full min-h-screen h-fit bg-[#edf6f9]">
      <Navbar Links={Links}></Navbar>
      <div className="w-full flex justify-center py-10">
        <Link to="/newhostel">
          <Button wide bgGreen handleClick={() => {}}>
            <AiOutlinePlus className="my-auto mr-2"></AiOutlinePlus>
            New Hostel
          </Button>
        </Link>
      </div>
      <div className="flex w-full">
        <div className="w-1/2 mx-auto">{renderedHostels}</div>
      </div>
    </div>
  );
}

export default ManageHostels;
