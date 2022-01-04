import { createContext, useContext } from "react";

export let HomeContext = createContext(null);

export let useHomeContext = () => {
  return useContext(HomeContext);
};
