import React, { useEffect, useState } from "react";
import Dropdown from "../Components/Dropdown";
import InputField from "../Components/InputField";
import Button from "../Components/Button";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function RegForm({ showAlert }) {
  const user = useSelector((state) => state.user.currentUser.student);
  const [acceptingResponses, setAcceptingResponses] = useState(null);
  const [region, setRegion] = useState("Outside Delhi");
  const [image, setImage] = useState();
  const genderOptions = [
    { label: "Male", value: "male" },
    { label: "Female", value: "female" },
  ];
  const navigate = useNavigate();

  let distanceInput = (
    <InputField
      id="distance"
      label="Enter distance of residence district from DTU (rounded off)"
      type="number"
    ></InputField>
  );
  if (region == "Outside Delhi") {
    distanceInput = (
      <InputField
        id="distance"
        label="Enter distance of residence district from DTU (rounded off)"
        type="number"
      ></InputField>
    );
  } else if (region == "Outside Delhi but schooling from Delhi") {
    distanceInput = (
      <InputField
        id="distance"
        label="Enter distance of residence district from DTU (rounded off)"
        type="number"
      ></InputField>
    );
  } else {
    distanceInput = (
      <InputField
        id="distance"
        label="Enter distance of residence pincode from 110042"
        type="number"
      ></InputField>
    );
  }

  const bloodGroupOptions = [
    { label: "A+", value: "A+" },
    { label: "A-", value: "A-" },
    { label: "B+", value: "B+" },
    { label: "B-", value: "B-" },
    { label: "O+", value: "O+" },
    { label: "O-", value: "O-" },
    { label: "AB+", value: "AB+" },
    { label: "AB-", value: "AB-" },
  ];

  const PWDOptions = [
    { label: "Yes", value: true },
    { label: "No", value: false },
  ];

  const year = 3;

  const preferenceOptions = [
    [{ label: "3-Seater Non-AC", value: "3SNAC" }],
    [
      { label: "3-Seater AC", value: "3SAC" },
      { label: "3-Seater Non-AC", value: "3SNAC" },
      { label: "2 Seater", value: "2S" },
    ],
    [
      { label: "3-Seater AC", value: "3SAC" },
      { label: "1-Seater", value: "1S" },
      { label: "2-Seater", value: "2S" },
    ],
    [
      { label: "3-Seater AC", value: "3SAC" },
      { label: "1-Seater", value: "1S" },
      { label: "2-Seater", value: "2S" },
    ],
  ];

  const handleSubmit = async (event) => {
    event.preventDefault();
    let tempFormData = {};
    tempFormData["allotedStatus"] = "pending";
    for (let i = 0; i < event.target.length; i++) {
      if (event.target[i].type === "file" && event.target[i].files.length) {
        tempFormData[event.target[i].id] = event.target[i].files[0].name;
      } else {
        const field = event.target[i].id;
        tempFormData[field] = event.target[i].value;
      }
    }
    console.log(event.target[0].files);
    tempFormData.ProfilePic = tempFormData.roll_no;
    const form_data = new FormData();
    form_data.append("filename", tempFormData.roll_no);
    form_data.append("image", image);
    // const resp = await fetch("http://localhost:4000/upload",{
    //   method:"POST",
    //   headers:{
    //     'Content-Type':'multipart/form-data'
    //   },
    //   body:JSON.stringify({
    //     roll_no:tempFormData.roll_no,
    //   }),
    //   file:photo
    // })
    axios
      .post("http://localhost:4000/upload", form_data, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      });
    axios
      .post(
        "http://localhost:4000/hostelreg/applications/auth/application",
        tempFormData
      )
      .then(function (response) {
        console.log("success", response.data);
        showAlert("success", "form submitted successfully");
        navigate("/");
      })
      .catch(function (err) {
        console.log("oops", err);
        showAlert("danger", "some error occured");
      });
  };

  let photo;
  if (user.photo === "NULL") {
    photo =
      "https://cdn.vectorstock.com/i/1000x1000/77/30/default-avatar-profile-icon-grey-photo-placeholder-vector-17317730.webp";
  } else {
    photo = user.photo;
  }
  useEffect(() => {
    const checkFormAcceptance = async () => {
      const response = await fetch(
        "http://localhost:4000/hostels/acceptresponses",
        {
          method: "GET",
        }
      );
      const json = await response.json();
      setAcceptingResponses(json.acceptResponses);
    };
    checkFormAcceptance();
  }, []);

  return (
    <>
      {acceptingResponses ? (
        <div className="w-full bg-slate-100">
          <div className="sm:w-2/3 mx-auto sm:p-4">
            <h1 className="mx-auto font-bold text-5xl">
              HOSTEL ALLOTMENT FORM
            </h1>
            <h3 className="mx-auto font-semibold text-2xl">
              ACADEMIC YEAR 2022-2023
            </h3>
            {/* <form action="http://localhost:4000/upload" method="POST" encType="multipart/form-data">
          <h4 className="font-semibold text-2xl">Upload Photo</h4>
            <InputField
                isDisabled
                id="file_saveas"
                label="Save As"
                type="text"
                name="saveAs"
                value={user.roll_no}
              ></InputField>
            <Button primary wide>
              Submit
            </Button>
          </form> */}
            <form
              className="m-10"
              onSubmit={(event) => handleSubmit(event)}
              encType="multipart/form-data"
            >
              <h4 className="font-semibold text-2xl">Personal Details</h4>
              <InputField
                id="student_photo"
                type="file"
                label="Profile Pic"
                name="image"
                handleChange={(event) => setImage(event.target.files[0])}
              ></InputField>
              <div className="grid gap-6 mb-6 md:grid-cols-2 my-4">
                <InputField
                  isDisabled
                  id="roll_no"
                  label="Roll Number"
                  type="text"
                  value={user.roll_no}
                ></InputField>
                <InputField
                  id="name"
                  label="Name"
                  type="text"
                  isDisabled
                  value={user.fullname}
                ></InputField>
                <InputField
                  id="email"
                  label="Email"
                  type="text"
                  isDisabled
                  value={user.email}
                ></InputField>
                <Dropdown
                  options={genderOptions}
                  label="Gender"
                  isDisabled
                  placeholder="Male"
                  id="gender"
                  value={user.sex}
                ></Dropdown>
                <InputField
                  label="Mobile Number"
                  type="number"
                  id="phone_no"
                  isDisabled
                  value={user.phone}
                ></InputField>
                <Dropdown
                  options={bloodGroupOptions}
                  label="Blood Group"
                  id="blood_group"
                ></Dropdown>
                <div>
                  <label
                    htmlFor="region"
                    className="block mb-2 text-lg font-semibold text-gray-900"
                  >
                    Region
                  </label>
                  <select
                    id="region"
                    onChange={(e) => {
                      setRegion(e.target.value);
                    }}
                    className="bg-gray-50 border-gray-300 border-2 text-gray-900 font-semibold text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 w-fit block p-3 cursor-pointer h-fit my-auto"
                  >
                    <option
                      label="Outside Delhi"
                      value="Outside Delhi"
                    ></option>
                    <option label="Delhi" value="Delhi"></option>
                    <option
                      label="Outside Delhi but schooling from Delhi"
                      value="Outside Delhi but schooling from Delhi"
                    ></option>
                  </select>
                </div>

                {distanceInput}
              </div>
              <hr className="my-3"></hr>
              <h4 className="font-semibold text-2xl">Academic Details</h4>
              <div className="grid gap-6 mb-6 md:grid-cols-2 my-4">
                <InputField
                  label="Course"
                  value={user.aprog}
                  isDisabled
                  id="course"
                  type="text"
                ></InputField>
                <InputField
                  label="Branch"
                  id="branch"
                  isDisabled
                  value={user.sp_code}
                  type="text"
                ></InputField>
                <InputField
                  label="Semester"
                  id="semester"
                  isDisabled
                  value={2}
                  type="number"
                ></InputField>
                <InputField
                  label="Back Papers"
                  id="back_papers"
                  isDisabled
                  value={0}
                  type="number"
                ></InputField>

                <InputField
                  label="Year of Admission"
                  id="year_of_admission"
                  isDisabled
                  value={user.reg_year}
                  type="number"
                ></InputField>
                <InputField
                  label="SGPA (Latest)"
                  id="sgpa"
                  isDisabled
                  value={9.8}
                  type="number"
                ></InputField>
                <InputField
                  label="Chronic Problems"
                  id="chronic_problems"
                  type="text"
                  placeholder="Comma separated values"
                ></InputField>
                <InputField
                  type="file"
                  label="Medical Records"
                  id="upload"
                ></InputField>
                <Dropdown label="PWD" id="PWD" options={PWDOptions}></Dropdown>
                <div className="bg-teal-100 col-span-2 flex p-3">
                  <div className="font-semibold text-lg">
                    Only PDF file of a medical record issued by competent
                    authority clearly stating the state of mentioned chronic
                    problems will be considered.
                  </div>
                </div>
              </div>
              <hr className="my-3"></hr>
              <h4 className="font-semibold text-2xl">
                Room Preference Details
              </h4>
              <div className="grid gap-6 mb-6 md:grid-cols-2 my-4">
                <Dropdown
                  label="First Preference"
                  id="first_preference"
                  options={preferenceOptions[year - 1]}
                ></Dropdown>
                <Dropdown
                  label="Second Preference"
                  id="second_preference"
                  options={preferenceOptions[year - 1]}
                ></Dropdown>
                <Dropdown
                  label="Third Preference"
                  id="third_preference"
                  options={preferenceOptions[year - 1]}
                ></Dropdown>
                <Dropdown
                  label="Fourth Preference"
                  id="fourth_preference"
                  options={preferenceOptions[year - 1]}
                ></Dropdown>
              </div>
              <hr className="my-3"></hr>
              <h4 className="font-semibold text-2xl">Father's Details</h4>
              <div className="grid gap-6 mb-6 md:grid-cols-2 my-4">
                <InputField
                  label="Father Name"
                  id="father_name"
                  type="text"
                  isDisabled
                  value={user.fathername}
                ></InputField>
                <InputField
                  label="Father Mobile Number"
                  id="father_phone_no"
                  type="String"
                  isDisabled
                  value={user.f_phone}
                ></InputField>
                <InputField
                  label="Father Email"
                  id="father_email"
                  type="text"
                ></InputField>
                <InputField
                  label="Father Occupation"
                  id="father_occupation"
                  type="text"
                ></InputField>
                <InputField
                  label="Father Office Address"
                  id="father_office_address"
                  type="text"
                ></InputField>
                <InputField
                  label="Father Office Mobile Number"
                  id="father_office_phone_no"
                  type="number"
                ></InputField>
              </div>
              <hr className="my-3"></hr>
              <h4 className="font-semibold text-2xl">Mother's Details</h4>
              <div className="grid gap-6 mb-6 md:grid-cols-2 my-4">
                <InputField
                  label="Mother Name"
                  id="mother_name"
                  type="text"
                  isDisabled
                  value={user.mothername}
                ></InputField>
                <InputField
                  label="Mother Mobile Number"
                  id="mother_phone_no"
                  type="String"
                  isDisabled
                  value={user.m_phone}
                ></InputField>
                <InputField
                  label="Mother Email"
                  id="mother_email"
                  type="text"
                ></InputField>
                <InputField
                  label="Mother Occupation"
                  id="mother_occupation"
                  type="text"
                ></InputField>
                <InputField
                  label="Mother Office Address"
                  id="mother_office_address"
                  type="text"
                ></InputField>
                <InputField
                  label="Mother Office Mobile Number"
                  id="mother_office_phone_no"
                  type="number"
                ></InputField>
              </div>
              <hr className="my-3"></hr>
              <h4 className="font-semibold text-2xl">Bank Details</h4>
              <div className="grid gap-6 mb-6 md:grid-cols-2 my-4">
                <InputField
                  label="Bank Account No."
                  id="acc_no"
                  type="text"
                ></InputField>
                <InputField
                  label="Account Holder's Name"
                  id="acc_holder_name"
                  type="text"
                ></InputField>
                <InputField
                  label="Bank Name"
                  id="bank_name"
                  type="text"
                ></InputField>
                <InputField
                  label="IFSC Code"
                  id="ifsc"
                  type="text"
                ></InputField>
                <InputField
                  label="Bank Branch"
                  id="bank_branch"
                  type="text"
                ></InputField>
                <InputField
                  label="Bank Address"
                  id="bank_address"
                  type="text"
                ></InputField>
                <div className="bg-amber-100 col-span-2 flex p-3">
                  <div className="font-semibold text-lg">
                    The bank details must be checked before submitting the form.
                    Delhi Technological University and the hostel authority will
                    not be responsible for any incorrect transactions.
                  </div>
                </div>
              </div>
              <hr className="my-3"></hr>
              <h4 className="font-semibold text-2xl">Home Address</h4>
              <div className="grid gap-6 mb-6 md:grid-cols-2 my-4">
                <InputField
                  isDisabled
                  id="home_address"
                  label="Address"
                  value={user.address}
                  type="text"
                ></InputField>
                <InputField
                  isDisabled
                  id="home_city"
                  label="City"
                  value={user.city}
                  type="text"
                ></InputField>
                <InputField
                  id="home_state"
                  label="State"
                  type="text"
                ></InputField>
                <InputField
                  id="home_country"
                  label="Country"
                  type="text"
                ></InputField>
                <InputField
                  id="home_pincode"
                  isDisabled
                  label="Pincode"
                  value={user.pincode}
                  type="String"
                ></InputField>
              </div>
              <hr className="my-3"></hr>
              <h4 className="font-semibold text-2xl">Correspondence Address</h4>
              <div className="grid gap-6 mb-6 md:grid-cols-2 my-4">
                <InputField
                  id="corr_address"
                  label="Address"
                  type="text"
                ></InputField>
                <InputField
                  id="corr_city"
                  label="City"
                  type="text"
                ></InputField>
                <InputField
                  id="corr_state"
                  label="State"
                  type="text"
                ></InputField>
                <InputField
                  id="corr_country"
                  label="Country"
                  type="text"
                ></InputField>
                <InputField
                  id="corr_country"
                  label="Pincode"
                  type="number"
                ></InputField>
              </div>
              <hr className="my-3"></hr>
              <h4 className="font-semibold text-2xl">
                Local Guardian's Details
              </h4>
              <div className="grid gap-6 mb-6 md:grid-cols-2 my-4">
                <InputField
                  label="Name"
                  type="text"
                  id="local_guardian_name"
                ></InputField>
                <InputField
                  label="Address"
                  type="text"
                  id="local_guardian_address"
                ></InputField>
                <InputField
                  label="Mobile Number"
                  type="number"
                  id="local_guardian_phone_no"
                ></InputField>
                <InputField
                  label="Email"
                  type="text"
                  id="local_guardian_email"
                ></InputField>
              </div>
              <hr className="my-4"></hr>
              <div className="grid gap-6 mb-6 md:grid-cols-2 my-4">
                <InputField
                  label="Student Signature"
                  type="file"
                  id="sign"
                ></InputField>
                <InputField
                  type="text"
                  id="discrepancy"
                  label="If there is any discrepancy in the pre-filled information, submit the comma separated names of the fields here."
                ></InputField>
                <div className="col-span-2 flex items-center mb-4">
                  <input
                    id="TandC"
                    type="checkbox"
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-fray-300 rounded focus:ring-blue-500 cursor-pointer my-auto"
                  ></input>
                  <label
                    htmlFor="TandC"
                    className="ml-2 text-md font-semibold text-gray-900 cursor-pointer my-auto"
                  >
                    The information given above is to the best of my knowledge
                    and I take full responsibilty for any action taken by the
                    competent authorities for incorrect information.
                  </label>
                </div>
              </div>
              <Button primary wide>
                Submit
              </Button>
            </form>
          </div>
        </div>
      ) : (
        <div className="max-w-sm mx-auto my-5 rounded overflow-hidden shadow-lg">
          <div className="px-6 py-4">
            <div className="font-bold text-xl mb-2">
              OOPS! Sorry the form is no longer accepting responses
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default RegForm;
