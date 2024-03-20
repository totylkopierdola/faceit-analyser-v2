"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import axios, { AxiosResponse } from "axios";
import API_TOKEN from "../utils/config";

const FaceitDataContext = createContext<FaceitDataContextType>({
  inputNickname: "",
  faceitData: {},
  setInputNickname: () => { },
  fetchPlayerSearch: async () => { },
  fetchPlayerData: async () => { },
  fetchPlayerLatestMatches: async () => { },
});

export const useFaceitData = () => useContext(FaceitDataContext);

interface FaceitDataProviderProps {
  children: ReactNode;
}

export const FaceitDataProvider = ({ children }: FaceitDataProviderProps) => {
  const [inputNickname, setInputNickname] = useState("");
  const [faceitData, setFaceitData] = useState<FaceitDataState>({
    searchPlayerList: {},
    foundPlayerDetails: {},
    lastMatches: [],
  });

  const fetchPlayerSearch = async (nickname: string) => {
    if (inputNickname || nickname) {
      try {
        const response: AxiosResponse = await axios.get(
          `https://open.faceit.com/data/v4/search/players?nickname=${inputNickname || nickname
          }&offset=0&limit=20`,
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
        console.log("raz");
      } catch (error) {
        setFaceitData((prevData) => ({
          ...prevData,
        }));
        throw new Error("There was an error fetching the data");
      }
    }
  };

  const fetchPlayerData = async (nickname: string) => {
    try {
      const response = await axios.get(
        `https://open.faceit.com/data/v4/players?nickname=${nickname}&game=cs2`,
        {
          headers: {
            Authorization: `Bearer ${API_TOKEN}`,
          },
        }
      );
      console.log("dwa");
      console.log(response.data);
      setFaceitData((prevData) => ({
        ...prevData,
        foundPlayerDetails: response.data,
      }));
    } catch (error) {
      throw new Error("There was an error fetching the data");
    }



  };

  const fetchPlayerLatestMatches = async (faceit_player_id, limit) => {
    if (faceit_player_id) {
      try {
        const response = await axios.get(
          `https://open.faceit.com/data/v4/players/${faceit_player_id}/history?game=cs2&offset=0&limit=${limit}
          `,
          {
            headers: {
              accept: "application/json",
              Authorization: `Bearer ${API_TOKEN}`,
            },
          }
        );

        console.log('trzy', response.data);

        setFaceitData((prevData) => ({
          ...prevData,
          lastMatches: response.data,
        }));
      } catch (error) {
        throw new Error("There was an error fetching the data");
      }
    }

  };

  return (
    <FaceitDataContext.Provider
      value={{ fetchPlayerSearch, fetchPlayerData, fetchPlayerLatestMatches, faceitData, inputNickname, setInputNickname }}
    >
      {children}
    </FaceitDataContext.Provider>
  );
};
