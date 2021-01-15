import { createContext, useContext } from "react";

import RootStore from "./RootStore";

export const createStore = () => {
  const rootStore = new RootStore();
  return rootStore;
};

export const StoreContext = createContext<RootStore>({} as RootStore);
export const StoreProvider = StoreContext.Provider;

export const useStore = () => useContext(StoreContext);
