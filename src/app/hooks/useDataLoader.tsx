import { useState, useEffect } from "react";

const useDataLoader = (fetchFunction, params) => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await fetchFunction(params);
        setData(result);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, [fetchFunction, params]);

  return { loading, data };
};

export default useDataLoader;
