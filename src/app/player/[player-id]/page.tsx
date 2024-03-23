import BackgroundShapes from "@/app/components/BackgroundShapes";
import PlayerDetails from "@/app/components/PlayerDetails";
import PlayerMatches from "@/app/components/PlayerMatches";
import PlayerStats from "@/app/components/PlayerStats";

const PlayerPage = ({ params }: PageProps) => {
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
              className="mx-auto mt-10 grid max-w-2xl grid-cols-3 gap-6 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-2 lg:gap-8"
            >
              <PlayerDetails params={params} />
              <PlayerStats />
            </ul>
          </div>
        </div>
        {/* MATCHES */}
        <PlayerMatches />
      </div>
    </>
  );
};

export default PlayerPage;
