"use client";
import Link from "next/link";
import { useFaceitData } from "../../../providers";
import { useEffect } from "react";
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
    <div className="relative isolate overflow-hidden  py-10 px-80">
      <h1
        className="text-2xl"
        onClick={() => {
          console.log(faceitData);
        }}
      >
        {/* {faceit_player_id} */}
        xdd
      </h1>
      {/* <div className="relative isolate overflow-hidden  py-10"> */}
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
          Matches
        </h2>
        <p className="mt-4 text-lg leading-8 text-gray-400">
          Details of the last 20 matches
        </p>
      </div>

      {faceitData.matchLatestStats?.items && (
        <div className="w-full mt-12">
          {/* <div className="overflow-auto"> */}
          <div className="">
            <table className="w-full whitespace-nowrap text-left bg-gray-900 py-10 opacity-50 rounded-md transition-opacity duration-300  hover:opacity-80">
              <colgroup>
                <col className="w-full sm:w-4/12" />
                <col className="lg:w-4/12" />
                <col className="lg:w-2/12" />
                <col className="lg:w-1/12" />
                <col className="lg:w-1/12" />
              </colgroup>
              <thead className="border-b border-white/10 text-sm leading-6 text-white">
                <tr>
                  <th
                    scope="col"
                    className="py-2 pl-4 pr-8 font-semibold sm:pl-6 lg:pl-8"
                  >
                    TEAM 👑
                  </th>
                  <th
                    scope="col"
                    className="hidden py-2 pl-0 pr-8 font-semibold sm:table-cell"
                  >
                    Score 📝
                  </th>
                  <th
                    scope="col"
                    className="py-2 pl-0 pr-4 text-right font-semibold sm:pr-8 sm:text-left lg:pr-20"
                  >
                    Kills 🎯
                  </th>
                  <th
                    scope="col"
                    className="hidden py-2 pl-0 pr-8 font-semibold md:table-cell lg:pr-20"
                  >
                    Assists ❇️
                  </th>
                  <th
                    scope="col"
                    className="hidden py-2 pl-0 pr-4 text-right font-semibold sm:table-cell sm:pr-6 lg:pr-8"
                  >
                    Deaths ☠️
                  </th>
                  <th scope="col" className="relative py-2 pl-0 pr-4">
                    K/R 📈
                  </th>
                  <th scope="col" className="relative py-2 pl-0 pr-4">
                    K/D 📈
                  </th>
                  <th scope="col" className="relative py-2 pl-0 pr-4">
                    HS% 🎯
                  </th>
                  <th scope="col" className="relative py-2 pl-0 pr-4">
                    MAP 🗺️
                  </th>
                  <th scope="col" className="relative py-2 pl-0 pr-4">
                    Date 📅
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {faceitData.matchLatestStats.items.map((match, matchIndex) => (
                  <tr key={matchIndex}>
                    <td className="py-4 pl-4 pr-8 sm:pl-6 lg:pl-8">
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
                        <div className="truncate text-sm leading-6 text-white font-extrabold flex items-center gap-2">
                          {match.stats.Team}
                          <Link
                            href="https://www.faceit.com/en/cs2/room/1-916138f3-dd58-46e0-8d77-5143c64b47c2"
                            passHref
                            target="_blank"
                          >
                            <FaExternalLinkAlt className="cursor-pointer" />
                          </Link>
                        </div>
                      </div>
                    </td>
                    <td className="hidden py-4 pl-0 pr-4 sm:table-cell sm:pr-8">
                      <div className="flex">
                        <div
                          className="bg-green-500/70
                          rounded-md min-w-[55px] text-center  px-2 py-1 text-xs text-black font-medium ring-1 ring-inset ring-white/10"
                        >
                          {match.stats.Score}
                        </div>
                      </div>
                    </td>
                    <td className="relative hidden py-4 pl-0 pr-8 text-sm leading-6 text-green-400 md:table-cell lg:pr-20">
                      {match.stats.Kills}
                    </td>
                    <td className="hidden py-4 pl-0 pr-8 text-sm leading-6 text-yellow-400 md:table-cell lg:pr-20">
                      {match.stats.Assists}
                    </td>
                    <td className="hidden py-4 pl-0 pr-8 text-sm leading-6 text-red-400 md:table-cell lg:pr-20">
                      {match.stats.Deaths}
                    </td>
                    <td className="hidden py-4 pl-0 pr-8 text-sm leading-6 text-white md:table-cell lg:pr-20">
                      {match.stats["K/R Ratio"]}
                    </td>
                    <td className="hidden py-4 pl-0 pr-8 text-sm leading-6 text-white md:table-cell lg:pr-20">
                      {match.stats["K/D Ratio"]}
                    </td>
                    <td className="hidden py-4 pl-0 pr-8 text-sm leading-6 text-white md:table-cell lg:pr-20">
                      {match.stats["Headshots %"]}
                    </td>

                    <td className="hidden py-4 pl-0 pr-8 text-sm leading-6 text-white md:table-cell lg:pr-20">
                      {match.stats["Map"]}
                    </td>

                    <td className="hidden py-4 pl-0 pr-8 text-sm leading-6 text-white md:table-cell lg:pr-20">
                      {countTimePostMatch(match.stats["Updated At"])}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>{" "}
          </div>
        </div>
      )}
    </div>
  );
};

export default PlayerMatches;
