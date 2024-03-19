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
  fetchPlayerSearch: async () => {},
  faceitData: { searchPlayerList: { end: 0, items: [], start: 0 } },
  inputNickname: "",
  setInputNickname: () => {},
});

export const useFaceitData = () => useContext(FaceitDataContext);

interface FaceitDataProviderProps {
  children: ReactNode;
}

export const FaceitDataProvider = ({ children }: FaceitDataProviderProps) => {
  const [inputNickname, setInputNickname] = useState("");
  const [faceitData, setFaceitData] = useState<FaceitDataState>({
    searchPlayerList: { end: 0, items: [], start: 0 },
  });

  const fetchPlayerSearch = async () => {
    if (inputNickname) {
      try {
        const response: AxiosResponse = await axios.get(
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
        console.log("raz");
      } catch (error) {
        setFaceitData((prevData) => ({
          ...prevData,
        }));
        throw new Error("There was an error fetching the data");
      }
    }
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
