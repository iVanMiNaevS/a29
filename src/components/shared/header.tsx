import Image from "next/image";
import React from "react";
import styles from "@/assets/styles/shared/header.module.scss";
import { AppRouter } from "@/utils/AppRouter";
import Link from "next/link";
import logo from "@/assets/images/logo_a29.jpg";
import { useRouter } from "next/router";
import { useCursorHover } from "@/hooks/useCursorHover";
import { getInfoPageService } from "@/utils/api/getInfoPageService";
export const Header = () => {
	const hoverProps = useCursorHover(20);
	const headerLinks = [
		{ text: "Главная", link: AppRouter.HOME },
		{ text: "О нас", link: AppRouter.ABOUT },
		{ text: "Проекты", link: AppRouter.PROJECTS },
		{ text: "Услуги", link: AppRouter.SERVICES },
		{ text: "Контакты", link: AppRouter.CONTACT },
	];

	const { pathname } = useRouter();

	return (
		<header className="header">
			<div className={styles.header__container + " container"}>
				<Image src={logo} width={66} height={61} alt="Логотип" />
				<div className={styles.header__content}>
					<nav>
						{headerLinks.map((link) => {
							return (
								<Link
									key={link.link}
									{...hoverProps}
									className={`
										${styles.header__linkWrapp} ${pathname === link.link ? styles.active : ""}
									`}
									title={link.text}
									href={link.link}
								>
									<span></span>
									<p>{link.text}</p>
								</Link>
							);
						})}
					</nav>
					<a
						href="tel:+79290672929"
						title="+79290672929"
						className={styles.tel}
						target="blank"
					>
						+7 (929) 06729-29
					</a>
				</div>
			</div>
		</header>
	);
};
