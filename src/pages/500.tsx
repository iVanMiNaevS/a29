import { AppRouter } from "@/utils/AppRouter";
import Link from "next/link";
import React from "react";
import styles from "@/assets/styles/500.module.scss";
const Custom500 = () => {
	return (
		<div className={styles.container}>
			<h1>Ошибка на стороне сервера</h1>
			<Link href={AppRouter.HOME} className={styles.link}>
				На главную
			</Link>
		</div>
	);
};
export default Custom500;
