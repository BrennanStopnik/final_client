import React from "react";
import Wolf from "../assets/bstop.png"

import {
  FaGithub,
  FaTwitter,
  FaLinkedin,
} from "react-icons/fa";

const people = [
  {
    name: '@BrennanStopnik',
    role: '#mediocre',
    imageURL: Wolf,
    bio: 'To Be, or NOT to be...!?',
    githubURL: 'https://github.com/BrennanStopnik',
    twitterUrl: '#',
    linkedinUrl: 'https://www.linkedin.com/in/brennan-stopnik/',
  },
]

export default function AboutPage() {
  return (
    <div className="bg-zinc-200 dark:bg-zinc-700 pb-14 pt-20">
      <div className="mx-auto max-w-7xl pt-16 px-4 sm:px-6 lg:px-8 lg:py-24">
        <div className="space-y-12">
          <div className="pt-8 sm:pt-0 space-y-5 sm:space-y-4 md:max-w-xl lg:max-w-3xl xl:max-w-none">
            <h2 className="text-3xl font-bold tracking-tight text-zinc-800 dark:text-gray-300 sm:text-4xl">Dream Team</h2>
            <p className="text-xl text-zinc-800 dark:text-gray-300">
              We Get It Done!
            </p>
          </div>

          <ul role="list" className="space-y-4 sm:grid sm:grid-cols-2 sm:gap-6 sm:space-y-0 lg:grid-cols-3 lg:gap-8">
            {people.map((person) => (

              <li key={person.name} className="rounded-lg bg-zinc-600 dark:bg-indigo-700/50 py-10 px-6 text-center xl:px-10 xl:text-left">
                <div className="space-y-6 xl:space-y-10">
                  <img className="mx-auto h-40 w-40 rounded-full xl:h-56 xl:w-56" src={person.imageURL} alt="" />
                  <div className="space-y-2 xl:flex-col xl:text-center xl:items-center xl:justify-between">
                    <div className="space-y-1 text-lg font-medium leading-6">
                      <h3 className="text-white"><a href={person.githubURL}>{person.name}</a></h3>
                      <p className="text-indigo-400">{person.role}</p>
                    </div>
                    <div className="space-y-2 text-sm font-sm leading-4 text-justify">
                      <p className="text-white">{person.bio}</p>
                    </div>
                    <ul role="list" className="flex justify-center space-x-5">
                    <li>
                        <a href={person.githubURL} className="text-gray-400 hover:text-gray-300">
                          <span className="sr-only">Github</span>
                          <FaGithub className="h-5 w-5" />
                        </a>
                      </li>
                      <li>
                        <a href={person.linkedinUrl} className="text-gray-400 hover:text-gray-300">
                          <span className="sr-only">LinkedIn</span>
                          <FaLinkedin className="h-5 w-5"/>
                        </a>
                      </li>
                      <li>
                        <a href={person.twitterUrl} className="text-gray-400 hover:text-gray-300">
                          <span className="sr-only">Twitter</span>
                          <FaTwitter className="h-5 w-5"/>
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
