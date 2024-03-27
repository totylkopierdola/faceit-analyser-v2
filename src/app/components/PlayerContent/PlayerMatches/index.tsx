"use client";
import Link from "next/link";
import { useFaceitData } from "../../../providers";
import { Fragment, useEffect } from "react";
import { countTimePostMatch } from "@/app/utils/helpers";
import { FaExternalLinkAlt } from "react-icons/fa";

const PlayerMatches = () => {
  const {
    faceitData,
    fetchPlayerData,
    fetchMatchesHistory,
    fetchLatestMatchesPlayerStats,
  } = useFaceitData();
  const faceit_player_id = faceitData.foundPlayerDetails.player_id;

  useEffect(() => {
    fetchMatchesHistory(faceit_player_id, 20);
    fetchLatestMatchesPlayerStats(faceit_player_id, 20);
  }, [faceit_player_id]);

  return (
    <div className="relative isolate overflow-hidden  py-10 mx-auto lg:max-w-7xl mt-8">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
          Matches
        </h2>
        <p className="mt-4 text-lg leading-8 text-gray-400">
          Details of the last 20 matches
        </p>
      </div>

      {/*  */}

      <div className="min-h-screen mt-8">
        {faceitData.matchLatestStats?.items && (
          <div className="flex flex-col mx-4">
            <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                <div className="overflow-hidden">
                  <table className="min-w-full text-left text-sm font-light">
                    <thead className="border-b font-medium dark:border-neutral-500 max-w-min">
                      <tr>
                        <th scope="col" className="whitespace-nowrap px-2">
                          TEAM 👑
                        </th>
                        <th
                          scope="col"
                          className="whitespace-nowrap px-2 text-center"
                        >
                          Score 📝
                        </th>
                        <th
                          scope="col"
                          className="whitespace-nowrap px-2 text-center"
                        >
                          Kills 🎯
                        </th>
                        <th
                          scope="col"
                          className="whitespace-nowrap px-2 text-center"
                        >
                          Assists ❇️
                        </th>
                        <th
                          scope="col"
                          className="whitespace-nowrap px-2 text-center"
                        >
                          Deaths ☠️
                        </th>
                        <th
                          scope="col"
                          className="whitespace-nowrap px-2 text-center"
                        >
                          K/R 📈
                        </th>
                        <th
                          scope="col"
                          className="whitespace-nowrap px-2 text-center"
                        >
                          K/D 📈
                        </th>
                        <th
                          scope="col"
                          className="whitespace-nowrap px-2 text-center"
                        >
                          HS% 🎯
                        </th>
                        <th scope="col" className="whitespace-nowrap px-2">
                          MAP 🗺️
                        </th>
                        <th scope="col" className="whitespace-nowrap px-2">
                          Date 📅
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {/* NO MATCHES FOUND*/}
                      {faceitData.matchLatestStats.items ? (
                        <tr className="border-b dark:border-neutral-500">
                          <td
                            colSpan={10}
                            className="text-center text-white text-lg"
                          >
                            No matches found
                          </td>
                        </tr>
                      ) : (
                        <tr className="border-b dark:border-neutral-500">
                          <td
                            colSpan={10}
                            className="text-center text-white text-lg"
                          >
                            No matches found
                          </td>
                        </tr>
                      )}
                      {/* FOUND MATCHES */}
                      {faceitData.matchLatestStats.items.map(
                        (match, matchIndex) => (
                          <Fragment key={matchIndex}>
                            <tr
                              className="border-b dark:border-neutral-500"
                              key={matchIndex}
                            >
                              <td className="whitespace-nowrap pl-6 py-4 font-medium">
                                <div className="flex items-center ">
                                  {match?.stats?.Result === "1" ? (
                                    <div className="ml-[-22px]  relative mr-2 text-green-400 bg-green-400/10 flex-none rounded-full p-1 w-3.5 h-3.5">
                                      <div className="h-1.5 w-1.5 rounded-full bg-current"></div>
                                    </div>
                                  ) : (
                                    <div className="ml-[-22px]  relative mr-2 text-red-400 bg-green-400/10 flex-none rounded-full p-1 w-3.5 h-3.5">
                                      <div className="h-1.5 w-1.5 rounded-full bg-current"></div>
                                    </div>
                                  )}
                                  <div
                                    className="truncate text-sm leading-6 text-white font-extrabold flex items-center gap-2"
                                    onClick={() => console.log(faceitData)}
                                  >
                                    {match.stats.Team}
                                    <Link
                                      href={`https://www.faceit.com/en/cs2/room/${match.stats["Match Id"]}`}
                                      passHref
                                      target="_blank"
                                    >
                                      <FaExternalLinkAlt className="cursor-pointer" />
                                    </Link>
                                  </div>
                                </div>
                              </td>
                              <td className="px-2">
                                <div className="flex justify-center">
                                  <div
                                    className={`${
                                      match.stats.Result == 1
                                        ? "bg-green-500/70"
                                        : "bg-red-500/70"
                                    }
                          rounded-md min-w-[55px] text-center  px-2 py-1 text-xs text-black font-medium ring-1 ring-inset ring-white/10`}
                                  >
                                    {match.stats.Score}
                                  </div>
                                </div>
                              </td>
                              <td className="text-center">
                                {match.stats.Kills}
                              </td>
                              <td className="text-center">
                                {match.stats.Assists}
                              </td>
                              <td className="text-center">
                                {match.stats.Deaths}
                              </td>
                              <td className="text-center">
                                {match.stats["K/R Ratio"]}
                              </td>
                              <td className="text-center">
                                {match.stats["K/D Ratio"]}
                              </td>
                              <td className="text-center">
                                {match.stats["Headshots %"]}
                              </td>
                              <td className="">{match.stats["Map"]}</td>
                              <td className="">
                                {countTimePostMatch(match.stats["Updated At"])}
                              </td>
                            </tr>
                          </Fragment>
                        )
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/*  */}
    </div>
  );
};

export default PlayerMatches;
