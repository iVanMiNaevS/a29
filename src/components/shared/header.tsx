import Image from "next/image";
import React, { use, useEffect, useRef, useState } from "react";
import styles from "@/assets/styles/shared/header.module.scss";
import { AppRouter } from "@/utils/AppRouter";
import Link from "next/link";
import logo from "@/assets/images/logo_a29.jpg";
import { useRouter } from "next/router";
import { useCursorHover } from "@/hooks/useCursorHover";
import prLogo from "@/assets/icons/pinterest.svg";
import vkLogo from "@/assets/icons/vk.svg";
import instLogo from "@/assets/icons/inst.svg";
import dzenLogo from "@/assets/icons/dzen.svg";
import whatsApp from "@/assets/icons/whatsapp.svg";
import burger from "@/assets/icons/burger.svg";
import xMark from "@/assets/icons/xmark.svg";
import { getInfoPageService } from "@/utils/api/getInfoPageService";
import { IContactData } from "@/utils/api/types/IContactInfo";
export const Header = () => {
	const hoverProps = useCursorHover(20);
	const headerLinks = [
		{ text: "Главная", link: AppRouter.HOME },
		{ text: "О нас", link: AppRouter.ABOUT },
		{ text: "Проекты", link: AppRouter.PROJECTS },
		{ text: "Услуги", link: AppRouter.SERVICES },
		{ text: "Контакты", link: AppRouter.CONTACT },
	];

	const [contactData, setContactData] = useState<IContactData>();
	const [isOpenMobMenu, setIsOpenMobMenu] = useState(false);

	async function getContactData() {
		const contactDataAndMeta = await getInfoPageService<IContactData>(
			"contact-info"
		);
		setContactData(contactDataAndMeta.data);
	}

	const { pathname } = useRouter();
	useEffect(() => {
		getContactData();
	}, []);

	return (
		<header className="header">
			<div className={styles.header__container + " container"}>
				<Link href={AppRouter.HOME}>
					<Image src={logo} width={66} height={61} alt="Логотип" />
				</Link>
				<div
					className={styles.header__content}
					style={{
						maxHeight: isOpenMobMenu ? `calc(100vh - 102px)` : "0px",
						paddingTop: isOpenMobMenu ? "30px" : "",
						paddingBottom: isOpenMobMenu ? "30px" : "",
					}}
				>
					<nav>
						{headerLinks.map((link) => {
							return (
								<Link
									onClick={() => {
										setIsOpenMobMenu(false);
									}}
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
						+7 (929) 067-29-29
					</a>
					{contactData ? (
						<div className={styles.contactSection__contactInfoLinks}>
							<Link
								href={contactData.Pinterest}
								target="_blank"
								{...hoverProps}
							>
								<Image src={prLogo} width={25} height={25} alt="pinterest" />
							</Link>
							<Link href={contactData.Vk} target="_blank" {...hoverProps}>
								<Image src={vkLogo} width={25} height={25} alt="vk" />
							</Link>
							<Link
								href={contactData.Instagram}
								target="_blank"
								{...hoverProps}
							>
								<Image src={instLogo} width={25} height={25} alt="instagram" />
							</Link>
							<Link href={contactData.Dzen} target="_blank" {...hoverProps}>
								<Image src={dzenLogo} width={25} height={25} alt="dzen" />
							</Link>
						</div>
					) : (
						""
					)}
				</div>
				<div className={styles.header__mobileWrapp}>
					<a href="https://wa.me/+79290672929">
						<Image src={whatsApp} alt="WhatsApp" width={30} height={30} />
					</a>
					<button
						className={styles.header__burger}
						onClick={() => {
							setIsOpenMobMenu((prev) => !prev);
						}}
					>
						<Image
							src={isOpenMobMenu ? xMark : burger}
							alt={isOpenMobMenu ? "закрыть меню" : "открыть меню"}
							width={30}
							height={30}
						/>
					</button>
				</div>
			</div>
		</header>
	);
};
