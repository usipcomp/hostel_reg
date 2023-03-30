import React, { useState } from "react";
import { AiOutlineDown } from "react-icons/ai";
import classNames from "classnames";

function Dropdown(props) {
  const [selectedValue, setSelectedValue] = useState(props.value);
  const optionsList = props.options.map((option,index) => {
    return <option key={index} value={option.value}>{option.label}</option>;
  });
  console.log(selectedValue);
  const classes = classNames({
    "bg-gray-50": !props.isDisabled,
    "bg-gray-200": props.isDisabled,
    border: true,
    "border-gray-300": true,
    "text-gray-900": true,
    "font-semibold": props.isDisabled,
    "cursor-not-allowed": props.isDisabled,
    "text-md": true,
    "rounded-lg": true,
    "focus:ring-blue-500": true,
    "focus:border-blue-500": true,
    block: true,
    "w-fit": true,
    "p-3": true,
    "cursor-pointer": true,
  });
  return (
    <div>
      <label className="block mb-2 text-lg font-semibold text-gray-900">
        {props.label}
      </label>
      <select
        onChange={(event) => {
          setSelectedValue(event.target.value);
        }}
        id={props.id}
        className={classes}
        required
        value={props.placeholder}
        disabled={props.isDisabled}
      >
        {optionsList}
      </select>
    </div>
  );
}

export default Dropdown;
