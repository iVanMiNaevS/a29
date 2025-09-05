import React from "react";
import styles from "@/assets/styles/shared/footer.module.scss";
import { AppRouter } from "@/utils/AppRouter";
import Link from "next/link";
import { useCursorHover } from "@/hooks/useCursorHover";
export const Footer = () => {
	const hoverProps = useCursorHover(20);
	const footerLinks = [
		{ text: "Главная", link: AppRouter.HOME },
		{ text: "О нас", link: AppRouter.ABOUT },
		{ text: "Проекты", link: AppRouter.PROJECTS },
		{ text: "Услуги", link: AppRouter.SERVICES },
		{ text: "Контакты", link: AppRouter.CONTACT },
		{ text: "Вакансии", link: AppRouter.VACANCY },
	];
	return (
		<footer className={styles.footer}>
			<div className={styles.footer__container + " container"}>
				<nav>
					{footerLinks.map((route) => {
						return (
							<Link key={route.link} {...hoverProps} href={route.link}>
								{route.text}
							</Link>
						);
					})}
				</nav>
				<div className={styles.footer__footer}>
					<div className={styles.footer__left}>
						<pre>©&nbsp;2025&nbsp;ИП&nbsp;Кобец&nbsp;К.Е.</pre>
						<Link
							{...hoverProps}
							target="_blank"
							title="Пользовательское соглашение"
							href="/polzovatelskoe-soglashenie.docx"
						>
							Пользовательское соглашение
						</Link>
						<Link
							{...hoverProps}
							target="_blank"
							title="Политика конфиденциальности"
							href="/politika-konfidenczialnosti.docx"
						>
							Политика конфиденциальности
						</Link>
						<Link
							{...hoverProps}
							target="_blank"
							title="Использование файлов Cookie"
							href="/politika_v_otnoshenii_cookie/"
						>
							Использование файлов Cookie
						</Link>
					</div>
					<div className={styles.footer__right}>
						<Link {...hoverProps} href={"https://heys.agency/"}>
							Разработано в Heys
						</Link>
					</div>
				</div>
			</div>
		</footer>
	);
};
