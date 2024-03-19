"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import axios, { AxiosResponse } from "axios";
import API_TOKEN from "./../utils/config";

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

// Define the interface for items inside searchPlayerList
interface Player {
  avatar: string;
  country: string;
  games: { name: string; skill_level: string }[];
  nickname: string;
  player_id: string;
  status: string;
  verified: boolean;
}

// Define the interface for searchPlayerList
interface SearchPlayerList {
  end: number;
  items: Player[];
  start: number;
}

// Define the interface for the entire faceitData state
interface FaceitDataState {
  searchPlayerList: SearchPlayerList;
}

// Create context
const FaceitDataContext = createContext<FaceitDataContextType>({
  fetchPlayerSearch: async () => {},
  faceitData: { searchPlayerList: { end: 0, items: [], start: 0 } },
  inputNickname: "",
  setInputNickname: () => {},
});

// Custom hook to access the context
export const useFaceitData = () => useContext(FaceitDataContext);

// Define props for FaceitDataProvider
interface FaceitDataProviderProps {
  children: ReactNode;
}

// Define FaceitDataProvider component
export const FaceitDataProvider = ({ children }: FaceitDataProviderProps) => {
  const [inputNickname, setInputNickname] = useState("");
  // Adjust the useState declaration
  const [faceitData, setFaceitData] = useState<FaceitDataState>({
    searchPlayerList: { end: 0, items: [], start: 0 },
  });

  const fetchPlayerSearch = async () => {
    // do fethcing with axios, in try catch block
    if (inputNickname) { 
      try {
      const response = await axios.get(
        `https://open.faceit.com/data/v4/search/players?nickname=${inputNickname}&offset=0&limit=20`,
        {
          headers: {
            Authorization: `Bearer ${API_TOKEN}`,
          },
        }
      );
        setFaceitData((prevData) => ({
          ...prevData,
          searchPlayerList: response.data,
        }));
      } catch (error) {
      error.message = "There was an error fetching the data";
      setFaceitData((prevData) => ({
        ...prevData,
        error: error.message,
      }));
    }
  }

    // if (inputNickname) {
    //   setFaceitData((prevData) => ({
    //     ...prevData,
    //     searchPlayerList: response.data,
    //   }));
    //     error.message = "There was an error fetching the data";
    //     setFaceitData((prevData) => ({
    //       ...prevData,
    //       error: error.message,
    //     }));
    //   }
  };

  useEffect(() => {
    fetchPlayerSearch();
  }, []);

  return (
    <FaceitDataContext.Provider
      value={{ fetchPlayerSearch, faceitData, inputNickname, setInputNickname }}
    >
      {children}
    </FaceitDataContext.Provider>
  );
};
