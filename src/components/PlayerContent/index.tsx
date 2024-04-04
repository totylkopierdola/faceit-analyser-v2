"use client";

import { useEffect } from "react";
import { useFaceitData } from "@/context/index";
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
    };

    fetchEntireData(nickname);

    setTimeout(() => {
      setFaceitData((prevData) => ({
        ...prevData,
        isLoading: false,
      }));
    }, 2000);
  }, [faceitData.isLoading, faceitData.foundPlayerDetails.player_id]);

  return (
    <>
      {faceitData.isLoading ? (
        <Loader />
      ) : (
        <>
          <div className="relative isolate overflow-hidden pt-10">
            <div className="">
              <div className="mx-auto max-w-2xl text-center">
                <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                  Statistics
                </h2>
              </div>
              <div className="mx-auto max-w-5xl px-6 text-center lg:px-8">
                <ul
                  role="list"
                  className="mx-auto mt-10 grid max-w-2xl  gap-6 sm:grid-cols-1 lg:mx-0 lg:max-w-none lg:grid-cols-2 lg:gap-8"
                >
                  <PlayerDetails />
                  <PlayerStats />
                </ul>
              </div>
              <PlayerMatches />
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default PlayerContent;
