"use client";

import { useEffect } from "react";
import { useFaceitData } from "../../providers/index";
import Loader from "../Loader.tsx";
import PlayerDetails from "./PlayerDetails";
import PlayerMatches from "./PlayerMatches";
import PlayerStats from "./PlayerStats";

const PlayerContent = ({ params }: PageProps) => {
  const {
    faceitData,
    setFaceitData,
    fetchPlayerFulltimeStats,
    fetchPlayerSearch,
    fetchPlayerData,
    fetchMatchesHistory,
    fetchLatestMatchesPlayerStats,
  } = useFaceitData();

  useEffect(() => {
    const nickname = params["player-id"];

    const fetchEntireData = async (nickname: string) => {
      await fetchPlayerData(nickname);
      const faceit_player_id = faceitData.foundPlayerDetails.player_id;

      await fetchPlayerFulltimeStats(faceit_player_id);
      await fetchPlayerSearch(nickname);
      await fetchLatestMatchesPlayerStats(faceit_player_id, 20);
      await fetchMatchesHistory(faceit_player_id, 20);

      await setFaceitData((prevData) => ({
        ...prevData,
        isLoading: false,
      }));
    };

    fetchEntireData(nickname);
  }, [faceitData.isLoading, faceitData.foundPlayerDetails.player_id]);

  return (
    <>
      {faceitData.isLoading ? (
        // {1 == 1 ? (
        <div className="bg-black bg-opacity-80 left-0 top-0 w-screen h-screen z-10  flex items-center justify-center">
          <div className=" w-12 h-12 border-4 border-gray-300 border-t-[red] rounded-full animate-spin z-50"></div>
        </div>
      ) : (
        <>
          <div className="relative isolate overflow-hidden  pt-10">
            <div className="">
              <div className="mx-auto max-w-2xl text-center">
                <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                  Statistics
                </h2>
              </div>
              <div className="mx-auto max-w-5xl px-6 text-center lg:px-8">
                <ul
                  role="list"
                  className="mx-auto mt-10 grid max-w-2xl grid-cols-3 gap-6 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-2 lg:gap-8"
                >
                  <PlayerDetails />
                  <PlayerStats />
                  <PlayerMatches />
                </ul>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default PlayerContent;
