import Head from "next/head";
import React, { FC, PropsWithChildren } from "react";
import { Header } from "./header";
import { Footer } from "./footer";
import CursorFollower from "./cursorFollower";

export const Layout: FC<PropsWithChildren> = ({ children }) => {
	return (
		<>
			<Head>
				<title>A29</title>
				<meta name="description" content="description" />
			</Head>
			<Header />
			<main>
				{children}
				<CursorFollower />
			</main>
			<Footer />
		</>
	);
};
