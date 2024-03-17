"use client";

import Image from "next/image";
import BackgroundShapes from "./components/BackgroundShapes";
import { ChevronRightIcon } from "@heroicons/react/20/solid";
import { Transition } from "@headlessui/react";
import Link from "next/link";
import { useState, Fragment, useEffect } from "react";
import Navbar from "./components/Navbar";

export default function Home() {
  const handleSearch = (e) => {
    "use client";
    e.preventDefault();
    console.log("searching...");
  };

  return (
    <div className="relative isolate overflow-hidden bg-gray-900">
      {/* TAKE API_TOKEN FROM .env.local by process env */}

      <BackgroundShapes color="bg-orange-500" opacity="opacity-20" />

      <div className="mx-auto px-6 pb-24 pt-10 sm:pb-32 lg:flex lg:px-8 lg:py-40 justify-center">
        <div className="mx-auto max-w-2xl flex-shrink-0 lg:mx-0 lg:max-w-xl lg:pt-8">
          <div className="mt-24 sm:mt-32 lg:mt-16">
            <Link href="#" className="inline-flex space-x-6">
              <span className="rounded-full bg-indigo-500/10 px-3 py-1 text-sm font-semibold leading-6 text-indigo-400 ring-1 ring-inset ring-indigo-500/20">
                What&apos;s new
              </span>
              <span className="inline-flex items-center space-x-2 text-sm font-medium leading-6 text-gray-300">
                <span>Just shipped v1.0</span>
                <ChevronRightIcon
                  className="h-5 w-5 text-gray-500"
                  aria-hidden="true"
                />
              </span>
            </Link>
          </div>
          <h1 className="mt-10 text-4xl font-bold tracking-tight text-white sm:text-6xl">
            Find player statistics
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-300">
            type the player&apos;s nickname and get the data
          </p>

          {/* input */}
          <form
            className="w-full max-w-md lg:col-span-5 lg:pt-2"
            // onSubmit={handleSearch}
            name="search-form"
          >
            <div className="flex flex-col gap-x-4 ">
              <div className="input-container flex gap-2 mb-2">
                <label className="sr-only">Email address</label>
                <input
                  type="text"
                  placeholder="Enter player name"
                  // value={inputNickname}
                  // onChange={handleInputChange}
                  className="flex-1 rounded-md bg-gray-800 px-4 py-2.5 text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500 max-w-56"
                />
                <button
                  type="submit"
                  className="flex-none rounded-md bg-indigo-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                  onClick={handleSearch}
                >
                  Search
                </button>
              </div>

              <div className="search-results h-52 overflow-y-scroll overflow-x-hidden  max-w-80 no-scrollbar "></div>
            </div>

            <p className="mt-4 text-sm leading-6 text-gray-300">
              We care about your data. Read our{" "}
              <Link href="#" className="font-semibold text-white">
                privacy&nbsp;policy
              </Link>
              .
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
