"use client";
import ReactCountryFlag from "react-country-flag";
import Image from "next/image";
import Link from "next/link";
import { useFaceitData } from "../../../providers";
import { useEffect, useState } from "react";
import { formatDate } from "../../../utils/helpers";
import { FaSteam } from "react-icons/fa";
import { SiFaceit } from "react-icons/si";

const PlayerDetails = () => {
  const { faceitData } = useFaceitData();
  return (
    <>
      <div className="player-details rounded-2xl bg-gray-900 px-8 py-10 min-h-[29rem]">
        <dl className="mt-5 flex flex-col gap-4">
          <div className="overflow-hidden rounded-lg bg-slate-800 px-4 py-5 shadow-2xl sm:p-6">
            <dt className="truncate text-sm font-medium text-gray-50">
              <div className="sm:flex sm:justify-center sm:flex-row sm:gap-4  flex flex-col items-center">
                <div className="sm:size-28 size-28 relative">
                  <Image
                    className="mx-auto rounded-full "
                    fill
                    sizes="100px"
                    priority={true}
                    src={
                      faceitData.foundPlayerDetails.avatar
                        ? faceitData.foundPlayerDetails.avatar
                        : "https://distribution.faceit-cdn.net/images/97baac26-41cb-469a-abf3-94d67b914897.jpeg"
                    }
                    alt=""
                  />
                </div>
                <div className="sm:flex sm:flex-col sm:flex-start sm:items-start gap-2 ">
                  <h3 className="mt-6 sm:text-2xl font-semibold leading-7 tracking-tight text-gray-50">
                    {faceitData.foundPlayerDetails.nickname}
                    <ReactCountryFlag
                      className="ml-3 text-xl"
                      countryCode={faceitData.foundPlayerDetails.country}
                      svg
                    />
                    <ReactCountryFlag
                      className="ml-3 text-xl"
                      countryCode={
                        faceitData.foundPlayerDetails.games?.cs2?.region
                      }
                      svg
                    />
                  </h3>

                  <p className="text-sm leading-6 text-gray-50">
                    {formatDate(faceitData.foundPlayerDetails.activated_at)}
                  </p>
                </div>
              </div>
            </dt>
          </div>
          <div className="overflow-hidden rounded-lg bg-slate-800 px-4 py-5 shadow sm:p-6">
            <dt className="truncate text-sm font-medium text-gray-50">
              <div className="flex justify-center  gap-4">
                {faceitData.foundPlayerDetails.games?.cs2 ? (
                  <>
                    <Image
                      src={`https://beta.leetify.com/assets/images/rank-icons/faceit${faceitData.foundPlayerDetails.games.cs2.skill_level}.svg`}
                      alt=""
                      width={70}
                      height={70}
                    />{" "}
                    <div className="text-4xl text-left leading-10 text-gray-50 font-bold flex flex-col items-center justify-center">
                      {faceitData.foundPlayerDetails.games?.cs2?.faceit_elo}{" "}
                      <br />
                      <span className="text-sm text-center">ELO</span>
                    </div>
                  </>
                ) : (
                  <div className="text-4xl text-left leading-10 text-gray-50 font-bold flex flex-col items-center justify-center">
                    <span className="text-sm text-center">No data</span>
                  </div>
                )}
              </div>
            </dt>
          </div>
          <div className="overflow-hidden rounded-lg bg-slate-800 px-4 py-5 shadow sm:p-6">
            <dt className="truncate  font-medium text-gray-50 flex items-center justify-center gap-5 text-2xl">
              <span className="flex items-center gap-2">
                <Link
                  href={`https://www.faceit.com/en/players/${faceitData.foundPlayerDetails.nickname}`}
                  className="text-gray-400 hover:text-gray-300 flex items-center gap-2 hover:opacity:50 cursor-pointer"
                  target="_blank"
                >
                  <SiFaceit />
                  FACEIT
                </Link>
              </span>
              <span className="flex items-center gap-2 ">
                {faceitData.foundPlayerDetails.steam_id_64 && (
                  <Link
                    href={`https://steamcommunity.com/profiles/${faceitData.foundPlayerDetails.steam_id_64}`}
                    className="text-gray-400 hover:text-gray-300 flex items-center gap-2 hover:opacity:50 cursor-pointer"
                    target="_blank"
                  >
                    <FaSteam />
                    STEAM
                  </Link>
                )}
              </span>
            </dt>
          </div>
        </dl>
      </div>
    </>
  );
};

export default PlayerDetails;
