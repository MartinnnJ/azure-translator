import { useEffect, useState, useCallback } from "react";
import axios from "axios";

function useFetchInitialData(limitResource, languagesResource) {
  const [textLimit, setTextLimit] = useState(0);
  const [supportedLanguages, setSupportedLanguages] = useState([]);

  const fetchTextLimit = useCallback(async () => {
    const response = await axios.get(`http://localhost:3000/${limitResource}`).then(data => {
      return data.data;
    })
    setTextLimit(response.limit);
  }, [limitResource])

  const fetchSupportedLanguages = useCallback(async () => {
    const response = await axios.get(`http://localhost:3000/${languagesResource}`).then(data => {
      return data.data.sort((a, b) => a.langName.localeCompare(b.langName));
    })
    const index = response.findIndex(obj => obj.langCode === 'R'); // finds index of runes obj
    const [deletedObj] = response.splice(index, 1); // returns array of deleted item(s), the runes obj
    response.unshift(deletedObj); // adding runes obj at the beginning of an array
    setSupportedLanguages(prev => [...prev, ...response]);
  }, [languagesResource])

  useEffect(() => {
    fetchTextLimit();
    fetchSupportedLanguages();
  }, [fetchTextLimit, fetchSupportedLanguages]);

  return [textLimit, supportedLanguages];
}

export default useFetchInitialData;