"use client";

import Link from "next/link";
import { useState, useEffect, Fragment } from "react";
import { useFaceitData } from "../../providers";
import { Transition } from "@headlessui/react";
import Image from "next/image";

const SearchForm = () => {
  const [inputNickname, setInputNickname] = useState("");
  const { faceitData, fetchPlayerSearch, setFaceitData } = useFaceitData();
  const [searchedPlayersData, setSearchedPlayersData] = useState(
    faceitData.searchPlayerList
  );

  useEffect(() => {
    fetchPlayerSearch();
  }, []);

  const handleInputChange = (e) => {
    setInputNickname(e.target.value);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    console.log("searching...");

    setFaceitData({
      ...faceitData,
      nickname: inputNickname,
    });
  };

  return (
    <>
      <div className="flex">
        [
        {faceitData && (
          <ul>
            <li>{faceitData?.nickname}</li>
          </ul>
        )}
        ]
      </div>
      <h1 className="text-2xl">inputNickname: {inputNickname}</h1>
      <button
        className="border-4 border-white text-2xl"
        onClick={() => console.log(playersFoundByNickname)}
      >
        playersFoundByNickname
      </button>
      <button
        className="border-4 border-white text-2xl"
        onClick={() => console.log("faceitData", faceitData)}
      >
        faceitData
      </button>
      <button
        className="border-4 border-white text-2xl"
        onClick={() =>
          console.log(
            "faceitData.searchPlayerList",
            faceitData.searchPlayerList
          )
        }
      >
        faceitData.searchPlayerList
      </button>
      <form
        className="w-full max-w-md lg:col-span-5 lg:pt-2"
        onSubmit={handleSearch}
        name="search-form"
      >
        <div className="flex flex-col gap-x-4 ">
          <div className="input-container flex gap-2 mb-2">
            <label className="sr-only">Email address</label>
            <input
              type="text"
              placeholder="Enter player name"
              value={inputNickname}
              onChange={handleInputChange}
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

          <div className="search-results h-52 overflow-y-scroll overflow-x-hidden  max-w-80 no-scrollbar">
            {faceitData.searchPlayerList.items &&
              faceitData.searchPlayerList.items.map((player, index) => (
                <Transition
                  as={Fragment}
                  // show={isShowing}
                  show
                  enter="transform transition duration-[300ms]"
                  enterFrom="opacity-0 scale-50"
                  enterTo="opacity-25 scale-100"
                  leave="transform duration-200 transition ease-in-out"
                  leaveFrom="opacity-25 scale-100"
                  leaveTo="opacity-0 scale-95"
                  key={index}
                >
                  <Link href={`/player-info/${player.nickname}`}>
                    <div
                      className="bg-slate-50 opacity-30 flex align-center items-center  rounded-md px-2 cursor-pointer hover:bg-gray-200 transition-all ease-in-out duration-300 mt-2 hover:opacity-50 max-h-10 text-black"
                      key={index}
                    >
                      <Image
                        className="rounded-full p-2"
                        width="50"
                        height="50"
                        src={
                          player.avatar
                            ? player.avatar
                            : "https://static.thenounproject.com/png/55393-200.png"
                        }
                        alt={player.nickname}
                      />
                      <span>{player.nickname}</span>
                      <span className="ml-1">[{player.country}]</span>
                      <span>
                        {player.status === "AVAILABLE" ? (
                          <div className="bg-green-500 rounded-full w-2 h-2 mx-1"></div>
                        ) : (
                          <div className="bg-red-500 rounded-full w-2 h-2 mx-1"></div>
                        )}
                      </span>
                      <span>{player.verified}</span>
                    </div>
                  </Link>
                </Transition>
              ))}
          </div>
        </div>

        <p className="mt-4 text-sm leading-6 text-gray-300">
          We care about your data. Read our{" "}
          <Link href="#" className="font-semibold text-white">
            privacy&nbsp;policy
          </Link>
          .
        </p>
      </form>
    </>
  );
};

export default SearchForm;
