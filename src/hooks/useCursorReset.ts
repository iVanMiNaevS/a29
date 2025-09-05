import { useStore } from "@/store/useStore";
import { useRouter } from "next/router";
import { useEffect } from "react";

export const useCursorReset = () => {
	const { cursorStore } = useStore();
	const router = useRouter();

	useEffect(() => {
		const handleRouteChange = () => {
			cursorStore.leaveHover();
		};

		router.events.on("routeChangeStart", handleRouteChange);

		return () => {
			router.events.off("routeChangeStart", handleRouteChange);
		};
	}, [cursorStore, router.events]);
};
