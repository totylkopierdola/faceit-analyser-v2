"use client";

import { useFaceitData } from "../../../providers";
import { Key, useEffect, useState } from "react";
import {
  classNames,
  countTimePostMatch,
  getAvarageStats,
} from "@/app/utils/helpers";

const PlayerStats = () => {
  const { faceitData } = useFaceitData();
  const [statsPeriod, setStatsPeriod] = useState("lifetime");
  const [avarageStats, setAvarageStats] = useState(null);

  useEffect(() => {
    setAvarageStats(getAvarageStats(faceitData.matchLatestStats));
  }, [faceitData, statsPeriod]);

  return (
    <>
      <div className="flex items-center bg-gray-900 px-8 py-4 rounded-xl opacity-100 shadow-2xl  min-h-[29rem]">
        <div className="mx-auto max-w-7xl ">
          {!faceitData.fullTimeStats && (
            <h3 className="text-3xl font-bold  text-white ">No data</h3>
          )}
          {statsPeriod === "lifetime" && faceitData.fullTimeStats?.lifetime && (
            <div className="grid grid-cols-1 gap-px bg-white/5 sm:grid-cols-2 lg:grid-cols-2 ease-in-out  transition-opacity duration-300">
              <div className="bg-gray-900 px-4 py-6 sm:px-6 lg:px-8">
                <p className="text-sm font-medium leading-6 text-gray-400">
                  Matches:{" "}
                </p>
                <p className="mt-2 flex items-baseline gap-x-2 justify-center">
                  <span className="text-4xl font-semibold tracking-tight text-white">
                    {faceitData.fullTimeStats.lifetime.Matches}
                  </span>
                </p>
              </div>
              <div className="bg-gray-900 px-4 py-6 sm:px-6 lg:px-8">
                <p className="text-sm font-medium leading-6 text-gray-400">
                  Recent Results:
                </p>
                <p className="mt-2 flex items-baseline gap-x-2 justify-center">
                  <span className="text-2xl font-semibold tracking-tight text-white">
                    {faceitData.fullTimeStats.lifetime["Recent Results"]?.map(
                      (result: string, index: Key | null | undefined) => (
                        <span
                          key={index}
                          className={classNames(
                            result === "1" ? "text-green-400" : "text-red-400",
                            "ml-1"
                          )}
                        >
                          {result === "1" ? "W" : "L"}
                        </span>
                      )
                    )}
                  </span>
                </p>
              </div>
              <div className="bg-gray-900 px-4 py-6 sm:px-6 lg:px-8">
                <p className="text-sm font-medium leading-6 text-gray-400">
                  Win Rate:
                </p>
                <p className="mt-2 flex items-baseline gap-x-2 justify-center">
                  <span className="text-4xl font-semibold tracking-tight text-white">
                    {faceitData.fullTimeStats.lifetime["Win Rate %"]}%
                  </span>
                </p>
              </div>
              <div className="bg-gray-900 px-4 py-6 sm:px-6 lg:px-8">
                <p className="text-sm font-medium leading-6 text-gray-400">
                  Avarage KDR
                </p>
                <p className="mt-2 flex items-baseline gap-x-2 justify-center">
                  <span className="text-4xl font-semibold tracking-tight text-white">
                    {faceitData.fullTimeStats.lifetime["Average K/D Ratio"]}
                  </span>
                </p>
              </div>
              <div className="bg-gray-900 px-4 py-6 sm:px-6 lg:px-8">
                <p className="text-sm font-medium leading-6 text-gray-400">
                  Avg HS%:
                </p>
                <p className="mt-2 flex items-baseline gap-x-2 justify-center">
                  <span className="text-4xl font-semibold tracking-tight text-white">
                    {faceitData.fullTimeStats.lifetime["Average Headshots %"]}
                  </span>
                </p>
              </div>
              <div className="bg-gray-900 px-4 py-6 sm:px-6 lg:px-8">
                <p className="mt-2 flex items-baseline gap-x-2 justify-center">
                  <span
                    onClick={() => setStatsPeriod("last20matches")}
                    className="text-xl font-semibold tracking-tight text-white border rounded-md px-2 py-1 bg-gray-800 cursor-pointer opacity-80"
                  >
                    Check last 20 matches
                  </span>
                </p>
              </div>
            </div>
          )}

          {statsPeriod === "last20matches" && avarageStats && (
            <div className="grid grid-cols-1 gap-px bg-white/5 sm:grid-cols-2 lg:grid-cols-2">
              <div className="bg-gray-900 px-4 py-6 sm:px-6 lg:px-8">
                <p className="text-sm font-medium leading-6 text-gray-400">
                  Avg Kills:{" "}
                </p>
                <p className="mt-2 flex items-baseline gap-x-2 justify-center">
                  <span className="text-4xl font-semibold tracking-tight text-white">
                    {/* {avarageStats.Kills} */}
                    {/* make avarageStats.Kills decimal value */}
                    {avarageStats.Kills}
                  </span>
                </p>
              </div>

              <div className="bg-gray-900 px-4 py-6 sm:px-6 lg:px-8">
                <p className="text-sm font-medium leading-6 text-gray-400">
                  Win Rate:{" "}
                </p>
                <p className="mt-2 flex items-baseline gap-x-2 justify-center">
                  <span className="text-4xl font-semibold tracking-tight text-white">
                    {avarageStats ? `${avarageStats["Win Rate"]}%` : "?"}
                  </span>
                </p>
              </div>

              <div className="bg-gray-900 px-4 py-6 sm:px-6 lg:px-8">
                <p className="text-sm font-medium leading-6 text-gray-400">
                  Avg K/D:{" "}
                </p>
                <p className="mt-2 flex items-baseline gap-x-2 justify-center">
                  <span className="text-4xl font-semibold tracking-tight text-white">
                    {avarageStats["K/D Ratio"].toFixed(2)}
                  </span>
                </p>
              </div>

              <div className="bg-gray-900 px-4 py-6 sm:px-6 lg:px-8">
                <p className="text-sm font-medium leading-6 text-gray-400">
                  Avg kills per round:{" "}
                </p>
                <p className="mt-2 flex items-baseline gap-x-2 justify-center">
                  <span className="text-4xl font-semibold tracking-tight text-white">
                    {avarageStats["KPR"].toFixed(2)}
                  </span>
                </p>
              </div>

              <div className="bg-gray-900 px-4 py-6 sm:px-6 lg:px-8">
                <p className="text-sm font-medium leading-6 text-gray-400">
                  HS %{" "}
                </p>
                <p className="mt-2 flex items-baseline gap-x-2 justify-center">
                  <span className="text-4xl font-semibold tracking-tight text-white">{`${avarageStats["Headshots %"]}%`}</span>
                </p>
              </div>
              <div
                onClick={() => setStatsPeriod("lifetime")}
                className="bg-gray-900 px-4 py-6 sm:px-6 lg:px-8"
              >
                <p className="mt-2 flex items-baseline gap-x-2 justify-center">
                  <span className="text-xl font-semibold tracking-tight text-white border rounded-md px-2 py-1 bg-gray-800 cursor-pointer opacity-80">
                    Check lifetime
                  </span>
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default PlayerStats;
