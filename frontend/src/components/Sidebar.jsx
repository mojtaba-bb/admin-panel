import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { RiDashboardFill } from "react-icons/ri";
import { MdEditDocument } from "react-icons/md";
import { BsClockHistory } from "react-icons/bs";
import { FiSun } from "react-icons/fi";
import { FaMoon } from "react-icons/fa";
function SideBar() {
  const [isChecked, setIsChecked] = useState(false);
  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };
  const location = useLocation();
  return (
    <div className="border-r-yellow-200 border-r h-full p-5 px-10 flex flex-col   items-center gap-3">
      <div className="flex flex-col justify-center align-middle items-center gap-5">
        <img
          src="/photo_2025-03-05_12-10-27.jpg"
          alt="profile"
          className="rounded-full w-44 aspect-square border-2 border-yellow-200 "
        />
        <h1 className="text-lime-50 text-2xl font-bold">Mojtaba.Dev</h1>
        <Link
          to={"/edit"}
          className={
            "px-4 py-1 border  border-amber-50 rounded-full transition-all duration-100 ease-in-out text-lime-50 hover:bg-amber-50/5 "
          }
        >
          Edit
        </Link>
      </div>
      <Link
        to={"/"}
        className={`p-6 py-4 text-xl flex mt-4 w-full items-center gap-4 transition-all duration-100 ease-in-out text-lime-50  rounded-lg ${
          location.pathname === "/" ? "bg-zinc-700" : "hover:bg-zinc-700/50"
        }`}
      >
        <RiDashboardFill className="text-4xl" />
        <span>Dashboard</span>
      </Link>
      <Link
        to={"/content-manager"}
        className={`p-6 py-4 text-xl flex w-full items-center gap-4 transition-all duration-100 ease-in-out text-lime-50  rounded-lg ${
          location.pathname === "/content-manager"
            ? "bg-zinc-700"
            : "hover:bg-zinc-700/50"
        }`}
      >
        <MdEditDocument className="text-4xl" />
        <span>Content Manager</span>
      </Link>
      <Link
        to={"/history"}
        className={`p-6 py-4 text-xl flex w-full items-center gap-4 transition-all duration-100 ease-in-out text-lime-50  rounded-lg ${
          location.pathname === "/history"
            ? "bg-zinc-700"
            : "hover:bg-zinc-700/50"
        }`}
      >
        <BsClockHistory className="text-4xl" />
        <span>History</span>
      </Link>

      <div className="mt-auto">
        <label className="themeSwitcherTwo relative inline-flex cursor-pointer select-none items-center">
          <input
            type="checkbox"
            checked={isChecked}
            onChange={handleCheckboxChange}
            className="sr-only"
          />
          <span className="label flex items-center text-sm font-medium text-zinc-600">
            Light
          </span>
          <div className="w-[72px] h-8 mx-2  ">
            <div className="flex justify-between w-[72px] h-8 rounded-full border border-lime-50 bg-amber-300/10">
              <div className={`absolute w-6 h-6 top-1/2 -translate-y-1/2 transition-all duration-200 ease-in-out rounded-full ${isChecked ? "bg-yellow-200 translate-x-[42px]" :"bg-zinc-700 translate-x-[5px]"}`}>

              </div>
              <FiSun className="w-5 h-5 m-1.5 text-lime-50"/>
              <FaMoon className="w-5 h-5 m-1.5 text-lime-50"/>
            </div>

          </div>
          <span className="label flex items-center text-sm font-medium text-zinc-600">
            Dark
          </span>
        </label>
      </div>
    </div>
  );
}

export default SideBar;
