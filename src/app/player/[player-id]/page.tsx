"use client";
import BackgroundShapes from "@/app/components/BackgroundShapes";
import Link from "next/link";
import { useEffect } from "react";
import { useRouter } from "next/router";
// import { usePlayerData } from "../hooks/PlayerDataContext";
import Image from "next/image";
import PlayerDetails from "@/app/components/PlayerDetails";
import PlayerMatches from "@/app/components/PlayerMatches";
// import { formatDate, countTimePostMatch, classNames } from "../utils/helpers";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const page = ({ params }: PageProps) => {
  const classNames = (...classes: any[]) => {
    return classes.filter(Boolean).join(" ");
  };

  return (
    <>
      <div className="relative isolate overflow-hidden bg-gray-900 pt-10">
        <BackgroundShapes color="bg-red-500" opacity="opacity-20" />
        <div className="">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Statistics
            </h2>
          </div>
          <div className="mx-auto max-w-5xl px-6 text-center lg:px-8">
            <ul
              role="list"
              className="mx-auto mt-10 grid max-w-2xl grid-cols-3 gap-6 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3 lg:gap-8"
            >
              <PlayerDetails params={params} />
              {/* player-details-EXTENDED */}
              <li className="player-details-extended rounded-2xl bg-gray-800 px-8 py-4 col-span-2 opacity-80 transition-opacity duration-300  hover:opacity-100 grid grid-cols-5 grid-rows-4 justify-items-center items-center text-sm text-left pl-5 leading-6 text-gray-400">
                <div className="w-full h-full flex flex-col justify-center items-center text-center font-bold col-span-5">
                  <p className="font-bold text-lg">Main Statistics</p>
                </div>
                {`playerData.fullTimeStats?.lifetime` ? (
                  <>
                    <div className="flex h-20 w-24 flex-col items-center justify-center rounded-md border border-dashed border-gray-200 transition-colors duration-100 ease-in-out hover:border-gray-400/80 text-center">
                      Matches:{" "}
                      <span className="font-light">
                        {`playerData.fullTimeStats.lifetime.Matches`}
                      </span>
                    </div>
                    <div className="flex h-20 w-24 flex-col items-center justify-center rounded-md border border-dashed border-gray-200 transition-colors duration-100 ease-in-out hover:border-gray-400/80 text-center">
                      Recent Results:
                      <span className="font-light">
                        <span key={`index`} className="text-green-400 ml-1">
                          W
                        </span>
                      </span>
                    </div>
                    <div className="flex h-20 w-24 flex-col items-center justify-center rounded-md border border-dashed border-gray-200 transition-colors duration-100 ease-in-out hover:border-gray-400/80 text-center">
                      Win Rate:{" "}
                      <span className="font-light">
                        {`playerData.fullTimeStats.lifetime["Win Rate %"]`}%
                      </span>
                    </div>
                    <div className="flex h-20 w-24 flex-col items-center justify-center rounded-md border border-dashed border-gray-200 transition-colors duration-100 ease-in-out hover:border-gray-400/80 text-center">
                      Avg KDR:{" "}
                      <span className="font-light">
                        {`playerData.fullTimeStats.lifetime["Average K/D Ratio"]`}
                      </span>
                    </div>
                    <div className="flex h-20 w-24 flex-col items-center justify-center rounded-md border border-dashed border-gray-200 transition-colors duration-100 ease-in-out hover:border-gray-400/80 text-center">
                      Avg HS %:{" "}
                      <span className="font-light">
                        {`playerData.fullTimeStats.lifetime[
                            "Average Headshots %"
                          ]`}
                      </span>
                    </div>
                    <div className="w-full h-full flex flex-col justify-center items-center text-center font-bold col-span-5">
                      <p className="font-bold text-lg">Last 20 matches: </p>
                    </div>

                    <div className="flex h-20 w-24 flex-col items-center justify-center rounded-md border border-dashed border-gray-200 transition-colors duration-100 ease-in-out hover:border-gray-400/80 text-center">
                      Avg Kills : <span className="font-light">0</span>
                    </div>
                    <div className="flex h-20 w-24 flex-col items-center justify-center rounded-md border border-dashed border-gray-200 transition-colors duration-100 ease-in-out hover:border-gray-400/80 text-center">
                      Win Rate : <span className="font-light">100%</span>
                    </div>
                    <div className="flex h-20 w-24 flex-col items-center justify-center rounded-md border border-dashed border-gray-200 transition-colors duration-100 ease-in-out hover:border-gray-400/80 text-center">
                      Avg K/D: <span className="font-light">0</span>
                    </div>
                    <div className="flex h-20 w-24 flex-col items-center justify-center rounded-md border border-dashed border-gray-200 transition-colors duration-100 ease-in-out hover:border-gray-400/80 text-center">
                      WinStreak: <span className="font-light">0</span>
                    </div>
                    <div className="flex h-20 w-24 flex-col items-center justify-center rounded-md border border-dashed border-gray-200 transition-colors duration-100 ease-in-out hover:border-gray-400/80 text-center">
                      HS %<span className="font-light">0</span>
                    </div>
                  </>
                ) : (
                  <p>Loading...</p>
                )}
              </li>
            </ul>
          </div>
        </div>
        {/* MATCHES */}
                  <PlayerMatches />
      </div>
    </>
  );
};

export default page;
