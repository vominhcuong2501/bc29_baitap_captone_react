import { useContext, useEffect, useState } from "react";
import { LoadingContext } from "../contexts/loading.context";

export const useAsync = ({ dependencies = [], service }) => {
  const [loadingState, setLoadingState] = useContext(LoadingContext);
  const [state, setState] = useState()
  useEffect(() => {
    fetchData();
  }, dependencies);

  const fetchData = async () => {
    setLoadingState({ isLoading: true });
    // call api
    const result = await service();
    //end api
    setLoadingState({ isLoading: false });

    setState(result.data.content)
  };
  return {state}
};