import { AppRouter } from "@/utils/AppRouter";
import Link from "next/link";
import React from "react";
import styles from "@/assets/css/404.module.scss";
import Head from "next/head";
const Error404 = () => {
	return (
		<>
			<Head>
				<title>Страница не найдена</title>
				<meta name="description" content="Страница не найдена" />
			</Head>
			<div className={styles.container}>
				<h1>Страница не найдена</h1>
				<Link href={AppRouter.HOME} className={styles.link}>
					На главную
				</Link>
			</div>
		</>
	);
};
export default Error404;
