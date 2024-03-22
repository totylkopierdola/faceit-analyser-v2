interface FaceitDataContextType {
  faceitData: any;
  inputNickname: string;
  setInputNickname: React.Dispatch<React.SetStateAction<string>>;
  fetchPlayerSearch: (nickname: string) => Promise<void>;
  fetchPlayerData: (nickname: string) => Promise<void>;
  fetchMatchesHistory: (player_id: string, limit: number) => Promise<void>;
  fetchLatestMatchesPlayerStats: (player_id: string, limit: number) => Promise<void>;

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

// interface FaceitDataState {
//   searchPlayerList: SearchPlayerList;
//   foundPlayerDetails: PlayerDetails;
//   matchHistory: MatchHistory;
//   matchLatestStats: MatchHistory;
// }

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

interface MatchHistory {
  end: number;
  from: number;
  items: LastMatch[];
  start: number;
  to: number;

}

interface LastMatch {
  competition_id: string;
  competition_name: string;
  competition_type: string;
  faceit_url: string;
  finished_at: number;
  game_id: string;
  game_mode: string;
  match_id: string;
  match_type: string;
  max_players: number;
  organizer_id: string;
  playing_players: string[];
  region: string;
  results: {
    score: {
      [key: string]: number;
    };
    winner: string;
  };
  started_at: number;
  status: string;
  teams: {
    [key: string]: {
      avatar: string;
      nickname: string;
      players: [
        {
          avatar: string;
          faceit_url: string;
          game_player_id: string;
          game_player_name: string;
          nickname: string;
          player_id: string;
          skill_level: number;
        }
      ]
      team_id: string;
      type: string;
    };
  };
  teams_size: number;
}