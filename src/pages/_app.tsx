import { Layout } from "@/components/shared/layout";
import "@/assets/styles/globals.css";
import type { AppProps } from "next/app";
import { StoreContext } from "@/store/useStore";
import { rootStore } from "@/store/rootStore";

export default function App({ Component, pageProps }: AppProps) {
	return (
		<StoreContext.Provider value={rootStore}>
			<Layout>
				<Component {...pageProps} />
			</Layout>
		</StoreContext.Provider>
	);
}
