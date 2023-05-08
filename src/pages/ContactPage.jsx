import React from "react";
import { PhoneIcon, ArrowSmallRightIcon } from "@heroicons/react/24/outline";
import { CpuChipIcon, UserGroupIcon } from "@heroicons/react/24/solid";
import mutantSoda from "../assets/mutant-soda.png";

const Support = () => {
  return (
    <div name='support' className='w-full mt-16 pb-12'>
      <div className='w-full h-[700px] bg-gray-900/90 absolute '>
        <img
          src={mutantSoda}
          alt=''
          className='w-full h-full object-cover mix-blend-overlay'
        />
      </div>
      <div className='max-w-[1240px] mx-auto text-white relative'>
        <div className='px-4 py-12'>
          <h2 className='text-3xl pt-8 text-slate-300 uppercase text-center'>
            Support
          </h2>
          <h3 className='text-5xl font-bold py-6 text-center'>
            I am a one man army
          </h3>
          <p className=' py-4 text-3xl text-slate-300'>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat eum
            expedita laudantium culpa dolor illum eligendi deleniti accusantium?
          </p>
        </div>

        <div className='grid grid-cols-1 lg:grid-cols-3 relative gap-x-8 gap-y-16 px-4 pt-12 sm:pt-20 text-black'>
          <div className='bg-white dark:bg-zinc-700 rounded-xl shadow-2xl'>
            <div className='p-8'>
              <PhoneIcon className='w-16 p-4 bg-indigo-600 text-white rounded-lg mt-[-4rem]' />
              <h3 className='font-bold text-2xl my-6 dark:text-gray-300'>Sales</h3>
              <p className='text-gray-600 text-xl dark:text-gray-400'>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat
                eum expedita laudantium culpa dolor illum eligendi deleniti
                accusantium?
              </p>
            </div>
            <div className='bg-slate-100 dark:bg-zinc-900 pl-8 py-4 sticky top-[100vh] rounded-xl'>
              <p className=' flex items-center text-indigo-600 dark:text-white dark:hover:text-indigo-400 '>
                Contact Us <ArrowSmallRightIcon className='w-5 ml-2' />
              </p>
            </div>
          </div>
          <div className='bg-white dark:bg-zinc-700 rounded-xl shadow-2xl'>
            <div className='p-8'>
              <UserGroupIcon className='w-16 p-4 bg-indigo-600 text-white rounded-lg mt-[-4rem]' />
              <h3 className='font-bold text-2xl my-6 dark:text-gray-300'>Technical Support</h3>
              <p className='text-gray-600 text-xl dark:text-gray-400'>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat
                eum expedita laudantium culpa dolor illum eligendi deleniti
                accusantium?
              </p>
            </div>
            <div className='bg-slate-100 dark:bg-zinc-900 pl-8 py-4 sticky top-[100vh] rounded-xl'>
              <p className=' flex items-center text-indigo-600 dark:text-white dark:hover:text-indigo-400'>
                Contact Us <ArrowSmallRightIcon className='w-5 ml-2' />
              </p>
            </div>
          </div>
          <div className='bg-white dark:bg-zinc-700 rounded-xl shadow-2xl'>
            <div className='p-8'>
              <CpuChipIcon className='w-16 p-4 bg-indigo-600 text-white rounded-lg mt-[-4rem]' />
              <h3 className='font-bold text-2xl my-6 dark:text-gray-300'>Media Inquiries</h3>
              <p className='text-gray-600 text-xl dark:text-gray-400'>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat
                eum expedita laudantium culpa dolor illum eligendi deleniti
                accusantium?
              </p>
            </div>
            <div className='bg-slate-100 dark:bg-zinc-900 pl-8 py-4 sticky top-[100vh] rounded-xl'>
              <p className=' flex items-center text-indigo-600 dark:text-white dark:hover:text-indigo-400'>
                Contact Us <ArrowSmallRightIcon className='w-5 ml-2' />
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Support;