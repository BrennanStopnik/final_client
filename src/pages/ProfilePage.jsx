import React from "react";
import { useAuth } from "../Hooks/auth";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { Popover, Transition } from "@headlessui/react";
import { ChevronDownIcon, XMarkIcon } from "@heroicons/react/20/solid";
import { Fragment } from "react";


export default function ProfilePage(props) {
  const { saveButton, setSaveButton } = props;
  const [avatar, setAvatar] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [Coin, setCoin] = useState([]);
  const [Cart, setCart] = useState([]);
  const [CartHistory, setCartHistory] = useState([]);
  const auth = useAuth();
  const navigate = useNavigate();
  const { urlEndPoint } = props;
  const [myOwnedNfts, setMyOwnedNfts] = useState([]);
  const [myCollection, setMyCollection] = useState(false);

  useEffect(() => {
    const myNfts = () => {
      const nft = auth.userCartHistory
        .map((order) => {
          return order.cart;
        })
        .flat();
      setMyOwnedNfts(nft);
    };
    myNfts();
  }, [auth.userCartHistory]);

  const updateProfile = async (e) => {
    e.preventDefault();
    const result = await fetch(`${urlEndPoint}/users/update-profile`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: auth.userEmail,
        firstName: firstName,
        lastName: lastName,
        avatar: avatar,
      }),
    });
    const payload = await result.json();
    if (payload) {
      auth.setShouldRefresh(true);
    }
  };
  console.log(myOwnedNfts);
  console.log(auth.userCartHistory);
  return (
    <div className='flex-1 xl:overflow-y-auto'>
      <div className='mx-auto max-w-3xl py-12 px-4 sm:px-6 lg:py-12 lg:px-8'>
        {/* <div className="sm:col-span-6 mt-12 ">
          <h1 className="text-xl text-blue-gray-900 font-bold my-4">
            Account Profile
          </h1>
        </div> */}

        <div className='mx-auto max-w-3xl py-6 px-4 sm:px-6 lg:py-12 lg:px-8'>
          <Popover className='relative flex justify-between'>
            {({ open, close }) => (
              <>
                <Popover.Button className='text-gray-900 group inline-flex items-center rounded-md bg-white text-base font-medium hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 px-2 dark:hover:text-indigo-400 dark:bg-indigo-700/50 dark:text-zinc-100'>
                  <span className=''>Edit Profile</span>
                  {/* <ChevronDownIcon className='text-gray-900 ml-2 h-5 w-5 dark:hover:text-indigo-400 dark:bg-indigo-700/50 dark:text-zinc-100' /> */}
                </Popover.Button>
                
                <Transition
                  as={Fragment}
                  enter='transition ease-out duration-200'
                  enterFrom='opacity-0 translate-y-1'
                  enterTo='opacity-100 translate-y-0'
                  leave='transition ease-in duration-150'
                  leaveFrom='opacity-100 translate-y-0'
                  leaveTo='opacity-0 translate-y-1'
                >
                  <Popover.Panel className='absolute left-2/3 z-10 mt-8 w-screen max-w-xs -translate-x-1/2 transform px-2 sm:px-0'>
                    <div className='overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5'>
                      <div className='relative grid gap-6 bg-white px-5 py-6 sm:gap-8 sm:p-8'>
                        <form
                          className='divide-y-blue-gray-200 mt-8 space-y-8 divide-y'
                          onSubmit={updateProfile}
                        >
                          <div className='grid grid-cols-1 gap-y-6 sm:grid-cols-6 sm:gap-x-6'>
                            <div className='sm:col-span-3'>
                              <label className='block text-sm font-medium text-blue-gray-900'>
                                First name:
                              </label>
                              <input
                                className='mt-4 block w-full rounded-md border-blue-gray-800 text-blue-gray-900 shadow-xl'
                                type='text'
                                onChange={(e) => {
                                  if(setFirstName('')) {
                                    setFirstName('');
                                  }
                                  setFirstName(e.target.value);
                                }}
                              />
                            </div>
                            <br />

                            <div className='sm:col-span-3'>
                              <label className='block text-sm font-medium text-blue-gray-900'>
                                Last name:
                              </label>
                              <input
                                className='mt-4 block w-full rounded-md border-blue-gray-900 text-blue-gray-900 shadow-xl'
                                type='text'
                                onChange={(e) => {
                                  if(setLastName('')) {
                                    setLastName('');
                                  }
                                  setLastName(e.target.value);
                                }}
                              />
                            </div>
                            <br />

                            <div className='sm:col-span-6'>
                              <label className='block text-sm font-medium text-blue-gray-900'>
                                Photo/Avatar:
                              </label>
                              <input
                                className='mt-4 block w-full rounded-md border-blue-gray-900 text-blue-gray-900 shadow-xl'
                                type='url'
                                placeholder=' Url Here'
                                onChange={(e) => {
                                  if(setAvatar('')) {
                                    setAvatar('');
                                  }
                                  setAvatar(e.target.value);
                                }}
                              />
                            </div>
                            <br />

                            <div className='flex justify-end pt-2'>
                              <button
                                className='rounded-lg border border-transparent bg-indigo-800 
                                py-2 px-5 text-sm font-medium  hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-indigo-700/50  dark:hover:text-indigo-200 relative text-white'
                                onClick={() => {
                                  close();
                                }}
                              >
                                Save
                              </button>
                            </div>
                          </div>
                        </form>
                      </div>
                    </div>
                  </Popover.Panel>
                </Transition>
              </>
            )}
          </Popover>
          <div
            className={
              myCollection
                ? "overflow-y-scroll ease-in duration-300 fixed text-gray-300 left-0 top-0 w-full  h-screen bg-black/90 px-4 py-7 z-10 "
                : "absolute top-0 h-screen left-[-150%] sm:left-[-100%] ease-in duration-500"
            }
          >
            {" "}
            <XMarkIcon
              className={
                myCollection
                  ? "h-8 w-8 cursor-pointer top-0 right-0 my-4 mr-4 fixed"
                  : "hidden"
              }
              onClick={() => {
                setMyCollection(!myCollection);
              }}
            />
            
          </div>
          <div className='sm:col-span-6 mt-12 '>
            <h1 className='text-xl text-blue-gray-900 font-bold my-4'>
              Account Profile
            </h1>
          </div>
          <div>
            <label className='block text-sm font-medium text-blue-gray-900'>
              {auth.userEmail}
            </label>
          </div>
          <br />
          <div className='sm:col-span-3'>
            <label className='block text-sm font-medium text-blue-gray-900'>
              {auth.userFirstName}
            </label>
          </div>
          <br />
          <div className='sm:col-span-3'>
            <label className='block text-sm font-medium text-blue-gray-900'>
              {auth.userLastName}
            </label>
          </div>
          <br />
          <div className='sm:col-span-6'>
            <label className='block text-sm font-medium text-blue-gray-900'>
              Photo/Avatar
            </label>
            <div className='mt-1 flex items-center'>
              <img
                className='inline-block h-12 w-12 rounded-full'
                src={auth.userAvatar}
                alt='User Avatar'
              />
            </div>
            <br />
          </div>
        
          <br></br>
          <br></br>

          <div className='sm:col-span-6'>
            <h2 className='text-xl font-medium text-blue-gray-900'>
              My Order History
            </h2>
            <div>
              <ul>
                {auth.userCartHistory.map((order) => {
                  return (
                    <li>
                      {"Date ordered: " +
                        order.purchaseDate +
                        " |" +
                        " Order ID: " +
                        order.id +
                        " |" +
                        " Order Total: $" +
                        order.total}
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}