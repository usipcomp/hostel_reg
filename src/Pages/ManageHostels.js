import React, { useEffect, useState } from "react";
import Navbar from "../Components/Navbar";
import Button from "../Components/Button";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getHostels } from "../redux/apiCalls";
// import { HiPencil } from "react-icons/hi";
import { AiOutlinePlus } from "react-icons/ai";
import InputField from "../Components/InputField";
import Dropdown from "../Components/Dropdown";
import SingleHostelInfo from "./SingleHostelInfo";
import axios from "axios";
import { MdFileDownload } from "react-icons/md";

function ManageHostels() {
  const dispatch = useDispatch();
  const hostel = useSelector((state) => state.hostel);
  const user = useSelector((state) => state.user.currentUser);
  const [updateHostel, setUpdateHostel] = useState({});

  // const [updatehostel, setUpdatehostel] = useState({ HostelID: "", Name: "", Type: "", oneS: 0, twoS: 0, threeSAC:0, threeSNAC: 0 });
  const [prevID, setPrevID] = useState("");
  const [toggleButton, setToggleButton] = useState(false);
  useEffect(() => {
    getHostels(dispatch);
  }, [dispatch]);

  const update_hostel_info = (hostelInfo) => {
    setToggleButton(!toggleButton);
    setPrevID(hostelInfo.HostelID);
    setUpdateHostel(hostelInfo);
    // setUpdatehostel({ HostelID: hostelInfo.HostelID, Name: hostelInfo.Name, Type: hostelInfo.Type, oneS: hostelInfo.oneS, twoS: hostelInfo.twoS, threeSAC: hostelInfo.threeSAC, threeSNAC: hostelInfo.threeSNAC })
  };
  console.log(updateHostel);
  const update_Hostel = async (event) => {
    event.preventDefault();
    let tempFormData = {};
    tempFormData["PrevID"] = prevID;
    for (let i = 0; i < event.target.length; i++) {
      tempFormData[event.target[i].id] = event.target[i].value;
    }
    const res = await axios.put("http://localhost:4000/hostels", tempFormData);
    setToggleButton(!toggleButton);
    getHostels(dispatch);
  };
  const renderedHostels = hostel.hostels.map((h, ind) => {
    let gender;
    if (h.Type === "G") {
      gender = "Girls";
    } else {
      gender = "Boys";
    }
    return (
      <SingleHostelInfo
        h={h}
        gender={gender}
        key={ind}
        update_hostel_info={update_hostel_info}
      />
    );
  });
  const options = [
    { label: "Boys", value: "B" },
    { label: "Girls", value: "G" },
  ];
  if (user.user_desgn !== "admin") {
    return (
      <div className="max-w-sm mx-auto my-5 rounded overflow-hidden shadow-lg">
        <div className="px-6 py-4">
          <div className="font-bold text-xl mb-2">
            <font color="red">Error! </font>You are unauthorised.{" "}
          </div>
        </div>
      </div>
    );
  }
  let defaultGender = "";
  if (updateHostel.Type == "B") {
    defaultGender = "Boys";
  } else {
    defaultGender = "Girls";
  }
  return (
    <>
      <div className="w-full min-h-screen h-fit bg-[#edf6f9]">
        {toggleButton && (
          <div
            id="authentication-modal"
            tabIndex="-1"
            aria-hidden="true"
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none bg-gray-600/75"
          >
            <div className="relative w-full max-w-md max-h-full">
              <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                <button
                  type="button"
                  className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
                  onClick={() => {
                    setToggleButton(!toggleButton);
                  }}
                >
                  <svg
                    aria-hidden="true"
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  <span className="sr-only">Close modal</span>
                </button>
                <div className="px-6 py-6 lg:px-8 w-full">
                  <h3 className="mb-4 text-xl font-medium text-gray-900 dark:text-white">
                    Edit
                  </h3>
                  <form
                    className="w-1/1 mx-auto my-10"
                    onSubmit={(event) => update_Hostel(event)}
                  >
                    <InputField
                      name="Name"
                      id="Name"
                      type="text"
                      label="Hostel Name"
                      required
                      default={updateHostel.Name}
                    ></InputField>

                    <div className="w-full flex gap-20">
                      <InputField
                        name="HostelID"
                        id="HostelID"
                        type="text"
                        placeholder="A1"
                        label="Hostel ID"
                        required
                        isDisabled={true}
                        default={updateHostel.HostelID}
                      ></InputField>
                      <Dropdown
                        label="Type"
                        name="Type"
                        placeholder="Boys/Girls"
                        id="Type"
                        default={defaultGender}
                        options={[
                          { label: "Boys", value: "B" },
                          { label: "Girls", value: "G" },
                        ]}
                      ></Dropdown>
                    </div>
                    <hr className="my-4"></hr>
                    <h3 className="font-semibold text-2xl my-4">
                      Number of Beds
                    </h3>
                    <div className="flex w-full gap-2 my-3">
                      <InputField
                        name="oneS"
                        label="One Seater"
                        type="number"
                        id="oneS"
                        required
                        default={updateHostel.oneS}
                      ></InputField>
                      <InputField
                        name="twoS"
                        label="Two Seater"
                        type="number"
                        id="twoS"
                        required
                        default={updateHostel.twoS}
                      ></InputField>
                      <InputField
                        name="threeSAC"
                        label="Three Seater (AC)"
                        type="number"
                        id="threeSAC"
                        required
                        default={updateHostel.threeSAC}
                      ></InputField>
                      <InputField
                        name="threeSNAC"
                        label="Three Seater (Non-AC)"
                        type="number"
                        id="threeSNAC"
                        required
                        default={updateHostel.threeSNAC}
                      ></InputField>
                    </div>
                    <Button bgGreen wide>
                      Submit
                    </Button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        )}
        <div className="w-full flex justify-center py-10">
        <Link to="/hostelList?contact">
                <Button bgGreen handleClick={() => {}}>
                <MdFileDownload className="my-auto mr-2"></MdFileDownload>
                  Batch wise List
                </Button>
              </Link>
              <Link to="/hostelList">
                <Button bgGreen handleClick={() => {}}>
                <MdFileDownload className="my-auto mr-2"></MdFileDownload>
                  Hostel wise List
                </Button>
              </Link>
              </div>
        <div className="w-full flex justify-center pb-10">
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
    </>
  );
}

export default ManageHostels;
