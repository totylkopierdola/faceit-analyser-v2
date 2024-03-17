"use client";

import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import API_TOKEN from "./../utils/config";

const FaceitDataContext = createContext({});

export const useFaceitData = () => useContext(FaceitDataContext);

export const FaceitDataProvider = ({ children }) => {
  const [faceitData, setFaceitData] = useState({
    nickname: "shorstky",
    searchPlayerList: [],
    error: null,
  });

  const fetchPlayerSearch = async () => {
    try {
      const response = await axios.get(
        `https://open.faceit.com/data/v4/search/players?nickname=${faceitData.nickname}&offset=0&limit=20`,
        {
          headers: {
            Authorization: `Bearer ${API_TOKEN}`,
          },
        }
      );
      setFaceitData({
        ...faceitData,
        searchPlayerList: response.data,
      });
      console.log("raz");
    } catch (error) {
      error.message = "There was an error fetching the data";
      setFaceitData((prevData) => ({
        ...prevData,
        error: error.message,
      }));
    }
  };

  useEffect(() => {
    fetchPlayerSearch();
  }, [faceitData.nickname]);

  return (
    <FaceitDataContext.Provider
      value={{ fetchPlayerSearch, faceitData, setFaceitData }}
    >
      {children}
    </FaceitDataContext.Provider>
  );
};
