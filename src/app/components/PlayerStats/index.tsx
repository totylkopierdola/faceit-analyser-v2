import { useFaceitData } from "../../providers";
import { Key, useEffect, useState } from "react";
import { classNames, countTimePostMatch, getAvarageStats } from "@/app/utils/helpers";

const PlayerStats = () => {
  const { faceitData, fetchPlayerFulltimeStats } = useFaceitData();
  const [statsPeriod, setStatsPeriod] = useState("lifetime");
  const [loading, setLoading] = useState(true); 
  const [avarageStats, setAvarageStats] = useState(null);

  const faceit_player_id = faceitData.foundPlayerDetails.player_id;

  useEffect(() => {
    fetchPlayerFulltimeStats(faceit_player_id);
  }, [faceit_player_id]);

  useEffect(() => {
    if (faceitData) {
      setLoading(false);
    }
    if (faceitData.matchLatestStats.items) {
      setAvarageStats(getAvarageStats(faceitData.matchLatestStats));
      console.log(avarageStats);
    }
  }, [faceitData]);


  return (
    <>
      <div className="bg-gray-900 px-8 py-4 rounded-xl opacity-100 border border-white border-opacity-10 outline-red-600 outline-4">
        <div className="mx-auto max-w-7xl ">
          {statsPeriod === "lifetime" && faceitData.fullTimeStats?.lifetime && (
            <div className="grid grid-cols-1 gap-px bg-white/5 sm:grid-cols-2 lg:grid-cols-2">
              <div className="bg-gray-900 px-4 py-6 sm:px-6 lg:px-8">
                <p className="text-sm font-medium leading-6 text-gray-400">Matches:{" "}</p>
                <p className="mt-2 flex items-baseline gap-x-2 justify-center">
                  <span className="text-4xl font-semibold tracking-tight text-white">{faceitData.fullTimeStats.lifetime.Matches}</span>
                </p>
              </div>
              <div className="bg-gray-900 px-4 py-6 sm:px-6 lg:px-8">
                <p className="text-sm font-medium leading-6 text-gray-400">Recent Results:
                </p>
                <p className="mt-2 flex items-baseline gap-x-2 justify-center">
                  <span className="text-2xl font-semibold tracking-tight text-white">
                    {faceitData.fullTimeStats.lifetime["Recent Results"]?.map(
                      (result: string, index: Key | null | undefined) => (
                        <span
                          key={index}
                          className={classNames(
                            result === "1"
                              ? "text-green-400"
                              : "text-red-400",
                            "ml-1"
                          )}
                        >
                          {result === "1" ? "W" : "L"}
                        </span>
                      )
                    )}
                  </span>
                  {/* <span className="text-sm text-gray-400">mins</span> */}
                </p>
              </div>
              <div className="bg-gray-900 px-4 py-6 sm:px-6 lg:px-8">
                <p className="text-sm font-medium leading-6 text-gray-400">Win Rate:</p>
                <p className="mt-2 flex items-baseline gap-x-2 justify-center">
                  <span className="text-4xl font-semibold tracking-tight text-white">
                    {faceitData.fullTimeStats.lifetime["Win Rate %"]}%
                  </span>
                </p>
              </div>
              <div className="bg-gray-900 px-4 py-6 sm:px-6 lg:px-8">
                <p className="text-sm font-medium leading-6 text-gray-400">Avarage KDR</p>
                <p className="mt-2 flex items-baseline gap-x-2 justify-center">
                  <span className="text-4xl font-semibold tracking-tight text-white">
                    {faceitData.fullTimeStats.lifetime["Average K/D Ratio"]}
                  </span>
                </p>
              </div>
              <div className="bg-gray-900 px-4 py-6 sm:px-6 lg:px-8">
                <p className="text-sm font-medium leading-6 text-gray-400">Avg HS%:</p>
                <p className="mt-2 flex items-baseline gap-x-2 justify-center">
                  <span className="text-4xl font-semibold tracking-tight text-white">
                    {faceitData.fullTimeStats.lifetime["Average Headshots %"]}
                  </span>
                </p>
              </div>
              <div className="bg-gray-900 px-4 py-6 sm:px-6 lg:px-8">
                <p className="mt-2 flex items-baseline gap-x-2 justify-center">
                  <span onClick={() => setStatsPeriod("last20matches")}
                    className="text-xl font-semibold tracking-tight text-white border rounded-md px-2 py-1 bg-gray-800 cursor-pointer opacity-80">
                    Check last 20 matches
                  </span>
                </p>
              </div>
            </div>
          )}


          {statsPeriod === "last20matches" && avarageStats && (
            <div className="grid grid-cols-1 gap-px bg-white/5 sm:grid-cols-2 lg:grid-cols-2">
              <div className="bg-gray-900 px-4 py-6 sm:px-6 lg:px-8">
                <p className="text-sm font-medium leading-6 text-gray-400">Avg Kills:{" "}</p>
                <p className="mt-2 flex items-baseline gap-x-2 justify-center">
                  <span className="text-4xl font-semibold tracking-tight text-white">{avarageStats.Kills}</span>
                </p>
              </div>

              <div className="bg-gray-900 px-4 py-6 sm:px-6 lg:px-8">
                <p className="text-sm font-medium leading-6 text-gray-400">Win Rate:{" "}</p>
                <p className="mt-2 flex items-baseline gap-x-2 justify-center">
                  <span className="text-4xl font-semibold tracking-tight text-white"
                  >
                    {avarageStats ? `${avarageStats["Win Rate"]}%` : '?'}
                  </span>
                </p>
              </div>

              <div className="bg-gray-900 px-4 py-6 sm:px-6 lg:px-8">
                <p className="text-sm font-medium leading-6 text-gray-400">Avg K/D:{" "}</p>
                <p className="mt-2 flex items-baseline gap-x-2 justify-center">
                  <span className="text-4xl font-semibold tracking-tight text-white">{avarageStats["K/D Ratio"].toFixed(2)}</span>
                </p>
              </div>

              <div className="bg-gray-900 px-4 py-6 sm:px-6 lg:px-8">
                <p className="text-sm font-medium leading-6 text-gray-400">Avg kills per round:{" "}</p>
                <p className="mt-2 flex items-baseline gap-x-2 justify-center">
                  <span className="text-4xl font-semibold tracking-tight text-white">
                    {avarageStats["KPR"].toFixed(2)}
                  </span>
                </p>
              </div>

              <div className="bg-gray-900 px-4 py-6 sm:px-6 lg:px-8">
                <p className="text-sm font-medium leading-6 text-gray-400">HS %{" "}</p>
                <p className="mt-2 flex items-baseline gap-x-2 justify-center">
                  <span className="text-4xl font-semibold tracking-tight text-white">{`${avarageStats["Headshots %"]}%`}</span>
                </p>
              </div>
              <div onClick={() => setStatsPeriod("lifetime")} className="bg-gray-900 px-4 py-6 sm:px-6 lg:px-8">
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


      <li className="player-details-extended rounded-2xl bg-gray-800 px-8 py-4 col-span-2 opacity-80 transition-opacity duration-300 hover:opacity-100 grid grid-cols-5 grid-rows-4 justify-items-center items-center text-sm text-left pl-5 leading-6 text-gray-400">
        {faceitData.fullTimeStats?.lifetime ? (
          <>

            <div className="flex h-20 w-24 flex-col items-center justify-center rounded-md border border-dashed border-gray-200 transition-colors duration-100 ease-in-out hover:border-gray-400/80 text-center">
              Matches:{" "}
              <span className="font-light">
                {faceitData.fullTimeStats.lifetime.Matches}
              </span>
            </div>
            <div className="flex h-20 w-24 flex-col items-center justify-center rounded-md border border-dashed border-gray-200 transition-colors duration-100 ease-in-out hover:border-gray-400/80 text-center">
              Recent Results:
              <span className="font-light">
                {faceitData.fullTimeStats.lifetime["Recent Results"]?.map(
                  (result, index) => (
                    <span
                      key={index}
                      className={classNames(
                        result === "1"
                          ? "text-green-400"
                          : "text-red-400",
                        "ml-1"
                      )}
                    >
                      {result === "1" ? "W" : "L"}
                    </span>
                  )
                )}
              </span>
            </div>
            <div className="flex h-20 w-24 flex-col items-center justify-center rounded-md border border-dashed border-gray-200 transition-colors duration-100 ease-in-out hover:border-gray-400/80 text-center">
              Win Rate:{" "}
              <span className="font-light">
                {faceitData.fullTimeStats.lifetime["Win Rate %"]}%
              </span>
            </div>
            <div className="flex h-20 w-24 flex-col items-center justify-center rounded-md border border-dashed border-gray-200 transition-colors duration-100 ease-in-out hover:border-gray-400/80 text-center">
              Avg KDR:{" "}
              <span className="font-light">
                {faceitData.fullTimeStats.lifetime["Average K/D Ratio"]}
              </span>
            </div>
            <div className="flex h-20 w-24 flex-col items-center justify-center rounded-md border border-dashed border-gray-200 transition-colors duration-100 ease-in-out hover:border-gray-400/80 text-center">
              Avg HS %:{" "}
              <span className="font-light">
                {faceitData.fullTimeStats.lifetime["Average Headshots %"]}
              </span>
            </div>


            <div className="flex h-20 w-24 flex-col items-center justify-center rounded-md border border-dashed border-gray-200 transition-colors duration-100 ease-in-out hover:border-gray-400/80 text-center">
              Avg Kills :{" "}
              <span className="font-light">
                {avarageStats ? avarageStats.Kills : '?'}
              </span>
            </div>
            <div className="flex h-20 w-24 flex-col items-center justify-center rounded-md border border-dashed border-gray-200 transition-colors duration-100 ease-in-out hover:border-gray-400/80 text-center">
              Win Rate :{" "}
              <span className="font-light">
                {avarageStats ? avarageStats["Win Rate %"] : '?'}
                %
              </span>
            </div>
            <div className="flex h-20 w-24 flex-col items-center justify-center rounded-md border border-dashed border-gray-200 transition-colors duration-100 ease-in-out hover:border-gray-400/80 text-center">
              Avg K/D:{" "}
              <span className="font-light" onClick={() => getAvarageStats(faceitData.matchLatestStats)}>
                {avarageStats ? avarageStats["K/D Ratio"].toFixed(2) : '?'}
              </span>
            </div>
            <div className="flex h-20 w-24 flex-col items-center justify-center rounded-md border border-dashed border-gray-200 transition-colors duration-100 ease-in-out hover:border-gray-400/80 text-center">
              WinStreak:{" "}
              <span className="font-light">

                x
              </span>
            </div>
            <div className="flex h-20 w-24 flex-col items-center justify-center rounded-md border border-dashed border-gray-200 transition-colors duration-100 ease-in-out hover:border-gray-400/80 text-center">
              HS %
              <span className="font-light">
                {avarageStats ? avarageStats["Headshots %"].toFixed(2) : '?'}
              </span>
            </div>
          </>
        ) : (
          <p>Loading...</p>
        )}
      </li>
    </>
  )
}

export default PlayerStats