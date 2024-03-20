interface FaceitDataContextType {
  // const fetchPlayerSearch = async (nickname: string) => {
  //   if (inputNickname || nickname) {
  //     try {
  //       const response: AxiosResponse = await axios.get(
  //         `https://open.faceit.com/data/v4/search/players?nickname=${
  //           inputNickname || nickname
  //         }&offset=0&limit=20`,
  //         {
  //           headers: {
  //             Authorization: `Bearer ${API_TOKEN}`,
  //           },
  //         }
  //       );
  //       setFaceitData((prevData) => ({
  //         ...prevData,
  //         searchPlayerList: response.data,
  //       }));
  //       console.log("raz");
  //     } catch (error) {
  //       setFaceitData((prevData) => ({
  //         ...prevData,
  //       }));
  //       throw new Error("There was an error fetching the data");
  //     }
  //   }
  // };
  fetchPlayerSearch: (nickname: string) => Promise<void>;
  fetchPlayerData: (nickname: string) => Promise<void>;
  faceitData: FaceitDataState;
  inputNickname: string;
  setInputNickname: React.Dispatch<React.SetStateAction<string>>;
}

interface PlayerSearchResponse {
  end: number;
  items: FoundPlayer[];
  start: number;
}

interface FoundPlayer {
  avatar: string;
  country: string;
  games: { name: string; skill_level: string }[];
  nickname: string;
  player_id: string;
  status: string;
  verified: boolean;
}

interface SearchPlayerList {
  end: number;
  items: FoundPlayer[];
  start: number;
}

interface FaceitDataState {
  searchPlayerList: SearchPlayerList;
  foundPlayerDetails: PlayerDetails;
}

interface PageProps {
  params: {
    "player-id": string;
  };
}

// PlayerDetails
interface PlayerDetails {
  activated_at: string;
  avatar: string;
  country: string;
  cover_featured_image: string;
  cover_image: string;
  faceit_url: string;
  friends_ids: string[];
  games: {
    [key: string]: {
      faceit_elo: number;
      game_player_id: string;
      game_player_name: string;
      game_profile_id: string;
      region: string;
      regions: string;
      skill_level: number;
      skill_level_label: string;
    };
  };
  infractions: string;
  membership_type: string;
  memberships: string[];
  new_steam_id: string;
  nickname: string;
  platforms: {
    [key: string]: string;
  };
  player_id: string;
  settings: {
    language: string;
  };
  steam_id_64: string;
  steam_nickname: string;
  verified: boolean;

}
