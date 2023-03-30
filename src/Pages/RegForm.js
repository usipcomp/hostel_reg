import React from "react";
import Dropdown from "../Components/Dropdown";
import InputField from "../Components/InputField";
import Button from "../Components/Button";
import axios from "axios";

function RegForm() {
  const genderOptions = [
    { label: "Male", value: "male" },
    { label: "Female", value: "female" },
  ];

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

    for (let i = 0; i < event.target.length; i++) {
      if (event.target[i].type == "file" && event.target[i].files.length) {
        tempFormData[event.target[i].id] = event.target[i].files[0].name;
      } else {
        const field = event.target[i].id;
        tempFormData[field] = event.target[i].value;
      }
    }
    axios
      .post("http://localhost:4000/hostelreg/applications", tempFormData)
      .then(function (response) {
        console.log("success", response.data);
      })
      .catch(function (err) {
        console.log("oops", err);
      });
  };

  return (
    <div className="w-full bg-slate-100">
      <div className="sm:w-2/3 mx-auto sm:p-4">
        <h1 className="mx-auto font-bold text-5xl">HOSTEL ALLOTMENT FORM</h1>
        <h3 className="mx-auto font-semibold text-2xl">
          ACADEMIC YEAR 2022-2023
        </h3>
        <form className="m-10" onSubmit={(event) => handleSubmit(event)}>
          <h4 className="font-semibold text-2xl">Personal Details</h4>
          <img
            src="https://cdn.vectorstock.com/i/1000x1000/77/30/default-avatar-profile-icon-grey-photo-placeholder-vector-17317730.webp"
            className="mx-auto h-[200px]"
          ></img>
          <div className="grid gap-6 mb-6 md:grid-cols-2 my-4">
            <InputField
              isDisabled
              id="roll_no"
              label="Roll Number"
              type="text"
              value="2K21/EE/85"
            ></InputField>
            <InputField
              id="name"
              label="Name"
              type="text"
              isDisabled
              value="Ayush Gupta"
            ></InputField>
            <InputField
              id="email"
              label="Email"
              type="text"
              isDisabled
              value="ayush.gupta2002@gmail.com"
            ></InputField>
            <Dropdown
              options={genderOptions}
              label="Gender"
              isDisabled
              placeholder="Male"
            ></Dropdown>
            <InputField
              label="Mobile Number"
              type="number"
              id="phone_no"
              isDisabled
              value="8076132946"
            ></InputField>
            <Dropdown
              options={bloodGroupOptions}
              label="Blood Group"
            ></Dropdown>
            <InputField
              label="Region"
              id="region"
              type="text"
              isDisabled
              value="Outside Delhi"
            ></InputField>
          </div>
          <hr className="my-3"></hr>
          <h4 className="font-semibold text-2xl">Academic Details</h4>
          <div className="grid gap-6 mb-6 md:grid-cols-2 my-4">
            <InputField
              label="Course"
              value="B.Tech"
              isDisabled
              id="course"
              type="text"
            ></InputField>
            <InputField
              label="Branch"
              id="branch"
              isDisabled
              value="EE"
              type="text"
            ></InputField>
            <InputField
              label="Semester"
              id="semester"
              isDisabled
              value="SECOND"
              type="text"
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
              value={2021}
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
            <div className="bg-teal-100 col-span-2 flex p-3">
              <div className="font-semibold text-lg">
                Only PDF file of a medical record issued by competent authority
                clearly stating the state of mentioned chronic problems will be
                considered.
              </div>
            </div>
          </div>
          <hr className="my-3"></hr>
          <h4 className="font-semibold text-2xl">Room Preference Details</h4>
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
            ></InputField>
            <InputField
              label="Father Mobile Number"
              id="father_phone_no"
              type="number"
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
            ></InputField>
            <InputField
              label="Mother Mobile Number"
              id="mother_phone_no"
              type="number"
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
              id="Mother_office_phone_no"
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
            <InputField label="IFSC Code" id="ifsc" type="text"></InputField>
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
                Delhi Technological University and the hostel authority will not
                be responsible for any incorrect transactions.
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
              value="Village Talwal"
              type="text"
            ></InputField>
            <InputField
              isDisabled
              id="home_city"
              label="City"
              value="GHAZIPUR"
              type="text"
            ></InputField>
            <InputField
              isDisabled
              id="home_state"
              label="State"
              value="UTTAR PRADESH"
              type="text"
            ></InputField>
            <InputField
              id="home_country"
              isDisabled
              label="Country"
              value="INDIA"
              type="text"
            ></InputField>
            <InputField
              id="home_pincode"
              isDisabled
              label="Pincode"
              value="233001"
              type="number"
            ></InputField>
          </div>
          <hr className="my-3"></hr>
          <h4 className="font-semibold text-2xl">Correspondence Address</h4>
          <div className="grid gap-6 mb-6 md:grid-cols-2 my-4">
            <InputField
              isDisabled
              id="corr_address"
              label="Address"
              value="Village Talwal"
              type="text"
            ></InputField>
            <InputField
              isDisabled
              id="corr_city"
              label="City"
              value="GHAZIPUR"
              type="text"
            ></InputField>
            <InputField
              isDisabled
              id="corr_state"
              label="State"
              value="UTTAR PRADESH"
              type="text"
            ></InputField>
            <InputField
              isDisabled
              id="corr_country"
              label="Country"
              value="INDIA"
              type="text"
            ></InputField>
            <InputField
              isDisabled
              id="corr_country"
              label="Pincode"
              value="233001"
              type="number"
            ></InputField>
          </div>
          <hr className="my-3"></hr>
          <h4 className="font-semibold text-2xl">Local Guardian's Details</h4>
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
              label="If there is any discrepancy in the pre-filled information, submit the comma separated names of the fields here."
            ></InputField>
            <div className="col-span-2 flex items-center mb-4">
              <input
                id="TandC"
                type="checkbox"
                className="w-4 h-4 text-blue-600 bg-gray-100 border-fray-300 rounded focus:ring-blue-500 cursor-pointer my-auto"
              ></input>
              <label
                for="TandC"
                className="ml-2 text-md font-semibold text-gray-900 cursor-pointer my-auto"
              >
                The information given above is to the best of my knowledge and I
                take full responsibilty for any action taken by the competent
                authorities for incorrect information.
              </label>
            </div>
          </div>
          <Button primary wide>
            Submit
          </Button>
        </form>
      </div>
    </div>
  );
}

export default RegForm;
