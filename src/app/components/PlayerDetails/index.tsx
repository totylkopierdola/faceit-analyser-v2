"use client";
import Image from "next/image";
import Link from "next/link";
import { useFaceitData } from "../../providers";
import { useEffect } from "react";
import { formatDate } from "../../utils/helpers";
import { FaSteam } from "react-icons/fa";
import { SiFaceit } from "react-icons/si";

const PlayerDetails = ({ params }: PageProps) => {
  const { faceitData, fetchPlayerSearch, fetchPlayerData } = useFaceitData();

  useEffect(() => {
    const nickname = params["player-id"];
    fetchPlayerSearch(nickname);
    fetchPlayerData(nickname)

    console.log(faceitData)
  }, []);

  return (
    <>

<div className="player-details rounded-2xl bg-gray-800 px-8 py-10 min-h-[29rem]">
      <h3 className="text-base font-semibold leading-6 text-gray-900">Last 30 days</h3>
      <dl className="mt-5 flex flex-col gap-4">
        <div className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6">
          <dt className="truncate text-sm font-medium text-gray-500">Total Subscribers</dt>
          <dd className="mt-1 text-3xl font-semibold tracking-tight text-gray-900">71,897</dd>
        </div>
        <div className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6">
          <dt className="truncate text-sm font-medium text-gray-500">Avg. Open Rate</dt>
          <dd className="mt-1 text-3xl font-semibold tracking-tight text-gray-900">58.16%</dd>
        </div>
        <div className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6">
          <dt className="truncate text-sm font-medium text-gray-500">Avg. Click Rate</dt>
          <dd className="mt-1 text-3xl font-semibold tracking-tight text-gray-900">24.57%</dd>
        </div>
      </dl>
    </div>

      {/* <li
        key={faceitData.foundPlayerDetails.nickname}
        className="player-details rounded-2xl bg-gray-800 px-8 py-10 min-h-[29rem]"
      >
        <div className='rounded-md p-3 relative' >
          <div className="faceit-background w-full h-full absolute top-0 left-0 rounded-md opacity-5" style={{ backgroundImage: `url(${faceitData.foundPlayerDetails.cover_image})` }}></div>
          <Image
            className="mx-auto  rounded-full"
            width={100}
            height={100}
            priority={true}
            src={
              faceitData.foundPlayerDetails.avatar
                ? faceitData.foundPlayerDetails.avatar
                : "https://distribution.faceit-cdn.net/images/97baac26-41cb-469a-abf3-94d67b914897.jpeg"
            }
            alt=""
          />
        </div>

        <h3 className="mt-6 text-base font-semibold leading-7 tracking-tight text-white">
          {faceitData.foundPlayerDetails.nickname}
        </h3>


        <p className="text-sm leading-6 text-gray-400">
          {formatDate(faceitData.foundPlayerDetails.activated_at)}
        </p>
        <p className="text-sm text-left pl-5 leading-6 text-gray-400">
          <span className="font-bold text-gray-300">ELO: </span>{" "}
          {faceitData.foundPlayerDetails.games?.cs2?.faceit_elo}
        </p>
        <p className="text-sm text-left pl-5 leading-6 text-gray-400">
          <span className="font-bold text-gray-300">Skill Level: </span>{" "}
          {faceitData.foundPlayerDetails.games?.cs2?.skill_level}
        </p>
        <p className="text-sm text-left pl-5 leading-6 text-gray-400">
          <span className="font-bold text-gray-300">Region: </span>{" "}
          {faceitData.foundPlayerDetails.games?.cs2?.region}
        </p>
        <p className="text-sm text-left pl-5 leading-6 text-gray-400">
          <span className="font-bold text-gray-300">FACEit playerID: </span>
          {" "}{
            faceitData.foundPlayerDetails.player_id
          }
        </p>
        <p className="text-sm text-left pl-5 leading-6 text-gray-400">
          <span className="font-bold text-gray-300">Game Player ID: </span>{" "}
          {faceitData.foundPlayerDetails.games?.cs2?.game_player_id}
        </p>

        <ul role="list" className="mt-6 flex justify-center gap-x-6">
          <li>
            <Link
              href={`https://www.faceit.com/en/players/${faceitData.foundPlayerDetails.nickname}`}
              className="text-gray-400 hover:text-gray-300"
              target="_blank"
            >
              <SiFaceit />

            </Link>
          </li>
          <li>
            <Link
              href={`https://steamcommunity.com/profiles/${faceitData.foundPlayerDetails.steam_id_64}`}
              className="text-gray-400 hover:text-gray-300"
              target="_blank"
            >
              <FaSteam />
            </Link>
          </li>
        </ul>
      </li> */}

    </>
  );
};

export default PlayerDetails;
