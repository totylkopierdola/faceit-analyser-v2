import BackgroundShapes from "@/app/components/BackgroundShapes";
import PlayerContent from "@/app/components/PlayerContent";
import PlayerDetails from "@/app/components/PlayerContent/PlayerDetails";
import PlayerMatches from "@/app/components/PlayerContent/PlayerMatches";
import PlayerStats from "@/app/components/PlayerContent/PlayerStats";

const PlayerPage = ({ params }: PageProps, loader) => {
  // console.log("loader", loader);
  return (
    <>
      <div
        className="relative isolate overflow-hidden bg-gray-900"
        onClick={console.log("loader", loader)}
      >
        <BackgroundShapes
          loader={true}
          color="bg-red-500"
          opacity="opacity-20"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            height: "100%",
          }}
        />

        <PlayerContent params={params} />
      </div>
    </>
  );
};

export default PlayerPage;
