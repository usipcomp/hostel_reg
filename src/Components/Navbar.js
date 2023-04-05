import React from "react";
import { Link } from "react-router-dom";
import { logoutStart, logoutFailure, logoutSuccess } from "../redux/userRedux";
import { useDispatch, useSelector } from "react-redux";

const Navbar = (props) => {
  const dispatch = useDispatch();
  const renderedLinks = props.Links.map(function (link) {
    return (
      <Link to={link.redirect}>
        <div className="font-semibold text-xl p-2 cursor-pointer hover:bg-[#edf6f9] rounded-lg duration-500 hover:scale-105">
          {link.value}
        </div>
      </Link>
    );
  });

  const handleClick = () => {
    dispatch(logoutSuccess());
  };

  return (
    <div className="h-fit w-full flex justify-between bg-[#83c5be]">
      <div className="font-bold text-3xl m-4 text-[#006d77] w-fit">
        HostelReg
      </div>
      <div className="flex justify-between w-fit gap-2 h-full mx-4 my-auto">
        {renderedLinks}
        <button
          className="rounded p-2 bg-red-400 text-white font-heavy rounded-lg hover:bg-red-500"
          onClick={() => handleClick()}
        >
          Log out
        </button>
      </div>
    </div>
  );
};

export default Navbar;
