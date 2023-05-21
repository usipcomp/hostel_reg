import React from "react";
import Dropdown from "../Components/Dropdown";
import InputField from "../Components/InputField";
import Button from "../Components/Button";
import axios from "axios";

function NewHostel() {

  const handleSubmit = async (event) => {
    event.preventDefault();
    let tempFormData = {};

    for (let i = 0; i < event.target.length; i++) {
      tempFormData[event.target[i].id] = event.target[i].value;
    }
    const res = await axios.post("http://localhost:4000/hostels", tempFormData);
  };

  return (
    <div className="w-full min-h-screen h-fit bg-[#edf6f9]">
      <div className="w-full flex">
        <form
          className="w-1/2 mx-auto my-10"
          onSubmit={(event) => handleSubmit(event)}
        >
          <InputField
            id="Name"
            type="text"
            placeholder="A.P.J. Abdul Kalam Hostel"
            label="Hostel Name"
            required
          ></InputField>

          <div className="w-full flex gap-20">
            <InputField
              id="HostelID"
              type="text"
              placeholder="A1"
              label="Hostel ID"
              required
            ></InputField>
            <Dropdown
              label="Type"
              placeholder="Boys/Girls"
              id="Type"
              options={[
                { label: "Boys", value: "B" },
                { label: "Girls", value: "G" },
              ]}
            ></Dropdown>
          </div>
          <hr className="my-4"></hr>
          <h3 className="font-semibold text-2xl my-4">Number of Beds</h3>
          <div className="flex w-full gap-2 my-3">
            <InputField
              label="One Seater"
              type="number"
              id="oneS"
              required
            ></InputField>
            <InputField
              label="Two Seater"
              type="number"
              id="twoS"
              required
            ></InputField>
            <InputField
              label="Three Seater (AC)"
              type="number"
              id="threeSAC"
              required
            ></InputField>
            <InputField
              label="Three Seater (Non-AC)"
              type="number"
              id="threeSNAC"
              required
            ></InputField>
          </div>
          <Button bgGreen wide>
            Submit
          </Button>
        </form>
      </div>
    </div>
  );
}

export default NewHostel;
