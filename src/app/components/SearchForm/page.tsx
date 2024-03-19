// @ts-nocheck

"use client";
import ReactCountryFlag from "react-country-flag"
import Link from "next/link";
import { useState, useEffect, Fragment, useRef } from "react";
import { useFaceitData } from "../../providers";
import { Transition } from "@headlessui/react";
import Image from "next/image";
import useDebounce from "../../hooks/useDebounce";

const SearchForm = () => {
  const inputRef = useRef(null);
  const { faceitData, fetchPlayerSearch, inputNickname, setInputNickname } =
    useFaceitData();
  const [searchedPlayersData, setSearchedPlayersData] = useState([]);
  const [enterPage, setEnterPage] = useState(false);


  const debouncedSearch = useDebounce(inputNickname, 200);

  useEffect(() => {
    setEnterPage(true);
    if (inputRef.current) {
      inputRef.current.focus();
    }

    if (debouncedSearch) {
      fetchPlayerSearch(debouncedSearch);
    }
  }, [debouncedSearch]);

  const handleInputChange = (e) => {
    setInputNickname(e.target.value);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchPlayerSearch();
  };

  return (
    <>
      <div className="flex">
        [
        {inputNickname && (
          <ul>
            <li>{inputNickname}</li>
          </ul>
        )}
        ]
      </div>
      <h1 className="text-xs">inputNickname: {inputNickname}</h1>
      <button
        className="border-4 border-white text-xs"
        onClick={() => console.log(searchedPlayersData)} // Assuming you want to log searchedPlayersData
      >
        searchedPlayersData
      </button>
      <button
        className="border-4 border-white text-xs"
        onClick={() => console.log("faceitData", faceitData)}
      >
        faceitData
      </button>
      <button
        className="border-4 border-white text-xs"
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
        <div className="flex flex-col gap-x-4 relative">
          <div className="input-container flex gap-2 mb-2">
            <label className="sr-only">Email address</label>
            <input
              ref={inputRef}
              type="text"
              placeholder="Enter player name"
              value={inputNickname}
              onChange={handleInputChange}
              className="flex-1 rounded-md bg-gray-800 px-4 py-2.5 text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500 max-w-56"
            />
            <button
              type="submit"
              className="flex-none rounded-md bg-indigo-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
            >
              Search
            </button>
          </div>

          {inputNickname && (
            <div className="absolute top-[40px] search-results h-52 overflow-y-scroll overflow-x-hidden  max-w-80 no-scrollbar">
              {faceitData.searchPlayerList.items &&
                faceitData.searchPlayerList.items.map((player, index) => (
                  <Transition
                    as={Fragment}
                    show={enterPage}
                    enter="transition-opacity duration-1000"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="transition-opacity duration-1000"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                    key={index}
                  >
                    <Link href={`/player-info/${player.nickname}`}>
                      <div
                        className="bg-slate-900 bg-opacity-50 text-sm text-white  flex align-center items-center  rounded-md px-2 cursor-pointer hover:bg-gray-200 transition-all ease-in-out duration-300 mt-2 hover:opacity-80 hover:text-black hover:font-bold max-h-10 w-56"
                        key={index}
                      >
                        <span>
                          {player.status === "AVAILABLE" ? (
                            <div className="bg-green-500 rounded-full w-2 h-2"></div>
                          ) : (
                            <div className="bg-red-500 rounded-full w-2 h-2"></div>
                          )}
                        </span>
                        <div className="image w-[45px] h-[45px]">
                          <Image
                            className="rounded-full p-2"
                            width={45}
                            height={45}
                            
                            src={
                              player.avatar
                                ? player.avatar
                                : "https://static.thenounproject.com/png/55393-200.png"
                            }
                            alt={player.nickname}
                          />
                        </div>
                        <span>{player.nickname}</span>

                        <span>
                          <ReactCountryFlag className="ml-3 text-xl" countryCode={`${player.country}`} svg />

                        </span>
                      </div>
                    </Link>
                  </Transition>
                ))}
            </div>
          )}
        </div>

        {/* <p className="mt-4 text-sm leading-6 text-gray-300">
          We care about your data. Read our{" "}
          <Link href="#" className="font-semibold text-white">
            privacy&nbsp;policy
          </Link>
          .
        </p> */}
      </form>
    </>
  );
};

export default SearchForm;
