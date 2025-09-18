import { AppRouter } from "@/utils/AppRouter";
import Link from "next/link";
import React from "react";
import styles from "@/assets/styles/500.module.scss";
import Head from "next/head";
const Custom500 = () => {
	return (
		<>
			<Head>
				<title>Ошибка 500</title>
				<meta name="description" content="Ошибка 500" />
			</Head>
			<div className={styles.container}>
				<h1>Ошибка на стороне сервера</h1>
				<Link href={AppRouter.HOME} className={styles.link}>
					На главную
				</Link>
			</div>
		</>
	);
};
export default Custom500;
