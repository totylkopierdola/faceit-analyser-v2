"use client";
import { createContext, useContext, useState, ReactNode } from "react";
import axios, { AxiosResponse } from "axios";
import API_TOKEN from "../utils/config";

const FaceitDataContext = createContext<FaceitDataContextType>({
  inputNickname: "",
  faceitData: {},
  setInputNickname: () => {},
  fetchPlayerSearch: async () => {},
  fetchPlayerData: async () => {},
  fetchMatchesHistory: async () => {},
  fetchLatestMatchesPlayerStats: async () => {},
  fetchPlayerFulltimeStats: async () => {},
});

export const useFaceitData = () => useContext(FaceitDataContext);

interface FaceitDataProviderProps {
  children: ReactNode;
}

export const FaceitDataProvider = ({ children }: FaceitDataProviderProps) => {
  const [inputNickname, setInputNickname] = useState("");
  const [faceitData, setFaceitData] = useState({
    isLoading: true,
    searchPlayerList: {},
    foundPlayerDetails: {},
    matchHistory: [],
    matchLatestStats: [],
  });

  const fetchPlayerSearch = async (nickname: string) => {
    if (inputNickname || nickname) {
      try {
        const response: AxiosResponse = await axios.get(
          `https://open.faceit.com/data/v4/search/players?nickname=${
            inputNickname || nickname
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
          isLoading: false,
        }));
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
      setFaceitData((prevData) => ({
        ...prevData,
        foundPlayerDetails: response.data,
        isLoading: false,
      }));
    } catch (error) {
      throw new Error("There was an error fetching the data");
    }
  };

  const fetchMatchesHistory = async (
    faceit_player_id: string,
    limit: Number
  ) => {
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

        setFaceitData((prevData) => ({
          ...prevData,
          matchHistory: response.data,
          isLoading: false,
        }));
      } catch (error) {
        throw new Error("There was an error fetching the data");
      }
    }
  };

  const fetchLatestMatchesPlayerStats = async (
    faceit_player_id: string,
    limit: Number
  ) => {
    if (faceit_player_id) {
      try {
        const response = await axios.get(
          `https://open.faceit.com/data/v4/players/${faceit_player_id}/games/cs2/stats?offset=0&limit=${limit}
          `,
          {
            headers: {
              accept: "application/json",
              Authorization: `Bearer ${API_TOKEN}`,
            },
          }
        );

        setFaceitData((prevData) => ({
          ...prevData,
          matchLatestStats: response.data,
          isLoading: false,
        }));
      } catch (error) {
        throw new Error("There was an error fetching the data");
      }
    }
  };

  const fetchPlayerFulltimeStats = async (faceit_player_id: string) => {
    if (faceit_player_id) {
      try {
        const response = await axios.get(
          `https://open.faceit.com/data/v4/players/${faceit_player_id}/stats/cs2`,
          {
            headers: {
              accept: "application/json",
              Authorization: `Bearer ${API_TOKEN}`,
            },
          }
        );
        console.log("pięć", response.data);
        setFaceitData((prevData) => ({
          ...prevData,
          fullTimeStats: response.data,
          isLoading: false,
        }));
      } catch (error) {
        throw new Error("There was an error fetching the data");
      }
    }
  };

  return (
    <FaceitDataContext.Provider
      value={{
        fetchPlayerSearch,
        fetchPlayerData,
        fetchMatchesHistory,
        fetchLatestMatchesPlayerStats,
        faceitData,
        inputNickname,
        setInputNickname,
        fetchPlayerFulltimeStats,
      }}
    >
      {children}
    </FaceitDataContext.Provider>
  );
};
