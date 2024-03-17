import { createContext, useState, useContext } from "react";
import axios from "axios";
import { API_TOKEN } from "../utils/config";

const PlayerDataContext = createContext();

export const usePlayerData = () => useContext(PlayerDataContext);

const PlayerDataContext = ({ children }) => {
  let nickname = "shorstky";

  const [playerData, setPlayerData] = useState({
    data: [],
  });

  const fetchSearchForPlayers = async (nickname, game) => {
    try {
      const response = await axios.get(
        `https://open.faceit.com/data/v4/search/players?nickname=${nickname}&offset=0&limit=20`,
        {
          headers: {
            Authorization: `Bearer ${API_TOKEN}`,
          },
        }
      );

      setPlayerData({
        data: response.data,
      });
    } catch (error) {
      setPlayerData((prevData) => ({ ...prevData, error: error.message }));
    }
  };

  return (
    <PlayerDataContext.Provider value={{ playerData, fetchSearchForPlayers }}>
      {children}
    </PlayerDataContext.Provider>
  );
};
