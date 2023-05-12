import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ToggleButton from "./Toggle";
import { useAuth } from "../Hooks/auth";

import {
  XMarkIcon,
  Cog8ToothIcon,
  ShoppingCartIcon,
} from "@heroicons/react/24/outline";
import { FaBars } from "react-icons/fa";

const Navbar = (props) => {
  const navigate = useNavigate();
  const { sideBar, setSideBar, handleThemeSwitch, setSignUpButton } = props;
  const [nav, setNav] = useState(false);
  const handleClick = () => setNav(!nav);
  const showSidebar = () => setSideBar(!sideBar);

  const auth = useAuth();

  return (
    <div className='w-screen h-[80px] z-10 bg-zinc-200 dark:bg-zinc-600 top-0  fixed drop-shadow-lg'>
      <div className=' px-2 flex justify-between items-center w-full h-full'>
        <div className='flex items-center'>
          <h1 className=' text-3xl font-bold mr-4 sm:text-4xl dark:text-white'>
            Conscious Foodie
          </h1>
          <ul className='hidden md:flex'>
            <li className='hover:text-indigo-600 dark:text-white dark:hover:text-indigo-400 cursor-pointer'>
              <Link to='/'>Home</Link>
            </li>
            <li className='hover:text-indigo-600 dark:text-white dark:hover:text-indigo-400 cursor-pointer'>
              <Link to='/about'>About</Link>
            </li>
            <li className='hover:text-indigo-600 dark:text-white dark:hover:text-indigo-400 cursor-pointer'>
              <Link to='/support'>Support</Link>
            </li>
          </ul>
        </div>
        <div className=' hidden md:flex pr-4'>
          <div className='flex gap-5'>
            <div className=' my-auto flex '>
              <p className='dark:text-zinc-300 text-black pr-2'>Light/Dark</p>
              <ToggleButton handleThemeSwitch={handleThemeSwitch} />
            </div>
            <button
              className='w-9 h-9 my-auto rounded-full focus:outline-none focus:ring-2 focus:ring-black mr-6 dark:bg-indigo-700/50'
              onClick={() => {
                showSidebar();
              }}
            >
              <ShoppingCartIcon className='w-8 rounded-full' />
            </button>
          </div>

          {auth.userEmail ? (
            <div className='flex'>
              <div
                onClick={() => {
                  navigate("/profile");
                }}
              >
                <img
                  className='w-9 rounded-full mt-5 mr-5'
                  src={auth.userAvatar}
                  alt='Greyson'
                />
              </div>
              <div>
                <button
                  className='px-6 py-2 my-4 dark:hover:text-indigo-400 dark:bg-indigo-700/50'
                  onClick={() => {
                    auth.logout();
                    navigate("/");
                  }}
                >
                  Log Out
                </button>
              </div>
            </div>
          ) : (
            <div className='flex'>
              <div>
                <button
                  className='border-none bg-transparent text-black mr-4 dark:text-white dark:hover:text-indigo-400 px-2 py-3 '
                  onClick={() => {
                    setSignUpButton(false);
                    navigate("/login");
                  }}
                >
                  Sign in
                </button>
              </div>
              <div>
                <button
                  className='px-6 py-3 dark:hover:text-indigo-400 dark:bg-indigo-700/50'
                  onClick={() => {
                    setSignUpButton(true);
                    navigate("/login");
                  }}
                >
                  Sign Up
                </button>
              </div>
            </div>
          )}
        </div>
        <div className='flex pr-4 md:hidden'>
          <div className=' pt-1 pr-4'>
            <ToggleButton handleThemeSwitch={handleThemeSwitch} />
          </div>
          {!nav ? (
            <Cog8ToothIcon
              className='w-6 mr-6'
              onClick={() => {
                handleClick();
              }}
            />
          ) : (
            <XMarkIcon
              className='w-6 mr-6'
              onClick={() => {
                handleClick();
              }}
            />
          )}
        </div>
      </div>
      <ul
        className={
          !nav
            ? "hidden"
            : "absolute bg-zinc-200 dark:bg-zinc-800 w-full px-8 md:hidden"
        }
      >
        <li className='hover:text-indigo-600 dark:text-white dark:hover:text-indigo-400'>
          <Link
            to='/home'
            onClick={() => {
              handleClick();
            }}
          >
            Home
          </Link>
        </li>
        <li className='hover:text-indigo-600 dark:text-white dark:hover:text-indigo-400'>
          <Link
            to='/about'
            onClick={() => {
              handleClick();
            }}
          >
            About
          </Link>
        </li>
        <li className='hover:text-indigo-600 dark:text-white dark:hover:text-indigo-400'>
          <Link
            to='/support'
            onClick={() => {
              handleClick();
            }}
          >
            Support
          </Link>
        </li>
        <li className='hover:text-indigo-600 dark:text-white dark:hover:text-indigo-400'>
          <Link
            to='/platforms'
            onClick={() => {
              handleClick();
            }}
          >
            Platforms
          </Link>
        </li>
        <div className='flex flex-col my-4'>
          <div className='flex justify-between'>
            <button
              className=' rounded-full w-6 h-6 focus:outline-none focus:ring-2 focus:ring-black mr-4 mt-3 dark:bg-indigo-700/50'
              onClick={() => {
                showSidebar();
              }}
            >
              <ShoppingCartIcon className='w-5 pl-1' />
            </button>
            {auth.userEmail ? (
              <div
                onClick={() => {
                  setNav(!nav);
                  navigate("/profile");
                }}
              >
                <img
                  className='w-6 rounded-full mt-3'
                  src={auth.userAvatar}
                  alt='Greyson'
                />
              </div>
            ) : null}
          </div>

          <button
            className='bg-transparent text-indigo-600 dark:text-white dark:hover:text-indigo-400 px-8 py-3 my-2'
            onClick={() => {
              setSignUpButton(false);
              navigate("/login");
              handleClick();
            }}
          >
            Sign In
          </button>

          <button
            className='px-8 py-3 dark:hover:text-indigo-400 dark:bg-indigo-700/50'
            onClick={() => {
              setSignUpButton(true);
              navigate("/login");
            }}
          >
            Sign Up
          </button>
        </div>
      </ul>
    </div>
  );
};

export default Navbar;
