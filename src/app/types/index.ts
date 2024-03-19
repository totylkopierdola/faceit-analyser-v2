interface FaceitDataContextType {
  fetchPlayerSearch: () => Promise<void>;
  faceitData: FaceitDataState;
  inputNickname: string;
  setInputNickname: React.Dispatch<React.SetStateAction<string>>;
}

interface PlayerSearchResponse {
  end: number;
  items: Player[];
  start: number;
}

interface Player {
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
  items: Player[];
  start: number;
}

interface FaceitDataState {
  searchPlayerList: SearchPlayerList;
}

