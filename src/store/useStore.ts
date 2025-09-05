// stores/StoreContext.ts
import { createContext, useContext } from "react";
import { RootStore } from "./rootStore";

export const StoreContext = createContext<RootStore | null>(null);

export const useStore = () => {
	const store = useContext(StoreContext);
	if (!store) {
		throw new Error("useStore must be used within a StoreProvider");
	}
	return store;
};
