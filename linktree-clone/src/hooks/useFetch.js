import { useState, useEffect } from "react";

export default function useFetch(fetchFunc) {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchFunc().then((res) => setData(res.data));
  }, []);

  return data;
}