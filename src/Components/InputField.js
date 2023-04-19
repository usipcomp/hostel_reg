import React from "react";
import classNames from "classnames";

function InputField(props) {
  const classes = classNames({
    "bg-gray-50": !props.isDisabled,
    "bg-gray-200": props.isDisabled,
    border: true,
    "border-gray-300": true,
    "text-gray-900": true,
    "font-semibold": props.isDisabled,
    "cursor-not-allowed": props.isDisabled,
    "rounded-lg": true,
    "focus:ring-blue-500": true,
    "focus:border-blue-500": true,
    block: true,
    "w-full": true,
    "p-2.5": true,
    "text-xl": props.textxl,
    "text-md": true,
    "my-2": true,
  });

  let handleChange;

  if (!props.handleChange) {
    handleChange = () => {};
  } else {
    handleChange = props.handleChange;
  }

  return (
    <div>
      <label
        htmlFor={props.id}
        className="block mb-2 text-lg font-semibold text-gray-900"
      >
        {props.label}
      </label>
      <input
        name={props.name}
        type={props.type}
        id={props.id}
        className={classes}
        value={props.value}
        disabled={props.isDisabled}
        placeholder={props.placeholder}
        required={props.required}
        accept="application/pdf"
        onChange={(e) => {
          handleChange(e);
        }}
      ></input>
    </div>
  );
}

export default InputField;
