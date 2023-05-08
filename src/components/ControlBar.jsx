import { useState } from "react";
import React from "react";
import { FaBars } from "react-icons/fa";

const ControlBar = (props) => {
  const { showLeftSideBar } = props;

  return (
    <div className=' w-full min-h-[50px] z-20 text-zinc-800 bg-transparent sticky'>
      {/* Hamburger Icon */}
      <div
        onClick={() => {
          showLeftSideBar();
        }}
        className='z-20'
      >
        <FaBars size={20} className='ml-4 cursor-pointer' />
      </div>
    </div>
  );
};

export default ControlBar;
