import React from "react";

import { Fragment, useState, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { useAuth } from "../Hooks/auth";

export default function CartPage(props) {
  const { sideBar, setSideBar, cart, urlEndPoint } = props;
  const [subtotal, setSubtotal] = useState(0);
  const [doesUserHaveEnough, setDoesUserHaveEnough] = useState(false);
  const [balance, setBalance] = useState(0);
  const auth = useAuth();
  const removeFromCart = async (pickedNft) => {
    const result = await fetch(`${urlEndPoint}/users/delete-cart-item`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: auth.userEmail,
        _id: pickedNft._id,
      }),
    });
    const payload = await result.json();
    if (payload) {
      auth.setShouldRefresh(true);
    }
  };

  useEffect(() => {
    const sub = auth.userCart.reduce((acc, item) => {
      return acc + item.coin;
    }, 0);
    setSubtotal(sub);
    if (auth.userCoin >= sub) {
      setDoesUserHaveEnough(true);
      const bal = auth.userCoin - sub;
      setBalance(bal);
    } else {
      setDoesUserHaveEnough(false);
    }
  }, [auth.userCart]);

  const checkout = async () => {
    auth.setShouldRefresh(false);
    const idsArray = auth.userCart.map((item) => item._id);
    const result = await fetch(`${urlEndPoint}/users/checkout`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: auth.userEmail,
        cart: auth.userCart,
        total: subtotal,
        balance: balance,
        ids: idsArray,
      }),
    });
    const payload = await result.json();
    if (payload) {
      auth.setShouldRefresh(true);
    }
  };

  return (
    <Transition.Root show={sideBar} as={Fragment}>
      <Dialog as='div' className='relative z-10' onClose={setSideBar}>
        <Transition.Child
          as={Fragment}
          enter='ease-in-out duration-500'
          enterFrom='opacity-0'
          enterTo='opacity-100'
          leave='ease-in-out duration-500'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'
        >
          <div className='fixed inset-0 bg-gray-600 bg-opacity-75 transition-opacity' />
        </Transition.Child>

        <div className='fixed inset-0 overflow-hidden'>
          <div className='absolute inset-0 overflow-hidden'>
            <div className='pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10'>
              <Transition.Child
                as={Fragment}
                enter='transform transition ease-in-out duration-500 sm:duration-700'
                enterFrom='translate-x-full'
                enterTo='translate-x-0'
                leave='transform transition ease-in-out duration-500 sm:duration-700'
                leaveFrom='translate-x-0'
                leaveTo='translate-x-full'
              >
                <Dialog.Panel className='pointer-events-auto w-screen max-w-md'>
                  <div className='flex h-full flex-col overflow-y-scroll mr-10 sm:mr-0 bg-white dark:bg-zinc-700 shadow-xl'>
                    <div className='flex-1 overflow-y-auto py-6 px-4 sm:px-10'>
                      <div className='flex items-start justify-between'>
                        <Dialog.Title className='text-lg font-medium text-gray-900 dark:text-zinc-200'>
                          Shopping cart
                        </Dialog.Title>
                        <div className='ml-3 flex h-7 items-center'>
                          <button
                            type='button'
                            className='-m-2 mr-0 p-2 text-gray-400 hover:text-gray-500 dark:text-white dark:hover:text-indigo-400'
                            onClick={() => setSideBar(false)}
                          >
                            <span className='sr-only'>Close panel</span>
                            <XMarkIcon className='h-4 w-4' aria-hidden='true' />
                          </button>
                        </div>
                      </div>

                      <div className='mt-2 mr-10'>
                        <div className='flow-root'>
                          {auth.userCart.length > 0 && (
                            <ul
                              role='list'
                              className='-my-6 divide-y divide-gray-200'
                            >
                              {auth.userCart.map((product) => (
                                <li key={product.id} className='flex py-6'>
                                  <div className='h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200'>
                                    <img
                                      src={product.image_url}
                                      alt={product.imageAlt}
                                      className='h-full w-full object-cover object-center'
                                    />
                                  </div>

                                  <div className='ml-4 flex flex-1 flex-col'>
                                    <div>
                                      <div className='flex justify-between text-base font-medium text-gray-900 dark:text-zinc-200'>
                                        <h3>
                                          <a href={product.href}>
                                            {product.name}
                                          </a>
                                        </h3>
                                        <p className='ml-4'>${product.coin}</p>
                                      </div>
                                      <p className='mt-1 text-sm text-gray-500 dark:text-zinc-200'>
                                        {product.color}
                                      </p>
                                    </div>
                                    <div className='flex flex-1 items-end justify-between text-sm'>
                                      <div className='flex'>
                                        <button
                                          onClick={() => {
                                            removeFromCart(product);
                                          }}
                                          type='button'
                                          className='font-medium text-indigo-600 hover:text-indigo-500=dark:text-zinc-200 dark:hover:text-indigo-400 px-2 py-2'
                                        >
                                          Remove
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                </li>
                              ))}
                            </ul>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className='border-t border-gray-200 py-6 px-4 sm:px-6'>
                      <div className='flex justify-between text-base font-medium text-gray-900 dark:text-zinc-200'>
                        <p>Subtotal</p>
                        {/* Adjust to Sum amounts of items */}
                        <p>${auth.userCart ? subtotal : "0"}</p>
                      </div>
                      <p className='mt-0.5 text-sm text-gray-500 dark:text-zinc-400'>
                        Shipping and taxes calculated at checkout.
                      </p>
                      <div className='mt-6'>
                        {doesUserHaveEnough ? (
                          <button
                            onClick={() => {
                              checkout();
                            }}
                            type='button'
                            className='flex items-center justify-center w-full rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700 dark:bg-indigo-700/50 dark:hover:bg-indigo-400 dark:text-zinc-200'
                          >
                            Checkout
                          </button>
                        ) : (
                          "You do not have enough coins to checkout"
                        )}
                      </div>
                      <div className='mt-6 flex justify-center text-center text-sm text-gray-500'>
                        <p className='dark:text-zinc-400'>
                          or
                          <button
                            type='button'
                            className='font-medium text-indigo-600 hover:text-indigo-500 dark:hover:text-indigo-400 dark:bg-indigo-700/50 dark:text-zinc-200 ml-2'
                            onClick={() => setSideBar(false)}
                          >
                            Continue Shopping
                            <span aria-hidden='true'> &rarr;</span>
                          </button>
                        </p>
                      </div>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
