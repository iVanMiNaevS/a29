import React from "react";
import styles from "@/assets/styles/Home.module.scss";
import Image from "next/image";
import { IContactData } from "@/utils/api/types/IContactInfo";
import Link from "next/link";
import tgLogo from "@/assets/images/icons/tg.svg";
import wpLogo from "@/assets/images/icons/whatsapp.svg";
import prLogo from "@/assets/images/icons/pinterest.svg";
import vkLogo from "@/assets/images/icons/vk.svg";
import instLogo from "@/assets/images/icons/inst.svg";
import dzenLogo from "@/assets/images/icons/dzen.svg";
import { useCursorHover } from "@/hooks/useCursorHover";
import notImage from "@/assets/images/notImage.jpg";

type props = {
	contactData: IContactData;
};

export const ContactSection = ({ contactData }: props) => {
	const hoverProps = useCursorHover(20);

	return (
		<section className={styles.contactSection}>
			<div className={styles.contactSection__header}>
				<h2 className="sectionTitle">Связаться с нами</h2>
				<p className={styles.contactSection__content + " sectionContent h2"}>
					Контактная информация
				</p>
			</div>
			<div className={styles.contactSection__content}>
				<div className={styles.contactSection__menegerWrapp}>
					<div className={styles.contactSection__personInfo}>
						<Image
							src={
								contactData.card
									? process.env.NEXT_PUBLIC_URL +
									  contactData.card.image.formats.medium.url
									: notImage
							}
							width={
								contactData.card
									? contactData.card.image.formats.medium.width
									: 700
							}
							height={
								contactData.card
									? contactData.card.image.formats.medium.height
									: 480
							}
							alt={
								contactData.card && contactData.card.image.alternativeText
									? contactData.card.image.alternativeText
									: "фото менеджера"
							}
						/>
						<div className={styles.contactSection__personInfoText}>
							<h3 className="itemTitle">
								{contactData.card ? contactData.card.name : "Валлерия"}
							</h3>
							<p>
								{contactData.card
									? contactData.card.about
									: "менеджер проектов, ответит на интересующие вас вопросы и найдет удобное время для встречи"}
							</p>
						</div>
					</div>
					<div className={styles.contactSection__personLinks}>
						<Link
							href={contactData.card ? contactData.card.telegram : "#"}
							{...hoverProps}
						>
							<Image src={tgLogo} width={20} height={20} alt="telegram" />
							Telegram
						</Link>
						<Link
							href={contactData.card ? contactData.card.whatsapp : "#"}
							{...hoverProps}
						>
							{" "}
							<Image src={wpLogo} width={20} height={20} alt="whatsapp" />
							WhatsApp
						</Link>
					</div>
				</div>
				<div className={styles.contactSection__contactInfoWrapp}>
					<p className={styles.contactSection__tel}>
						<Link
							{...hoverProps}
							target="_blank"
							title={contactData.phone}
							href={contactData.phone}
						>
							{contactData.phone}
						</Link>
					</p>
					<p>{contactData.address}</p>
					<p className={styles.contactSection__email}>
						<Link
							{...hoverProps}
							target="_blank"
							title={contactData.email}
							href={`mailto: ${contactData.email}`}
						>
							{" "}
							{contactData.email}
						</Link>
						<span>
							Отправить заявку, предложение о сотрудничестве или резюме
						</span>
					</p>
					<div className={styles.contactSection__contactInfoLinks}>
						<Link href={contactData.pinterest} target="_blank" {...hoverProps}>
							<Image src={prLogo} width={25} height={25} alt="pinterest" />
						</Link>
						<Link href={contactData.vk} target="_blank" {...hoverProps}>
							<Image src={vkLogo} width={25} height={25} alt="vk" />
						</Link>
						<Link href={contactData.instagram} target="_blank" {...hoverProps}>
							<Image src={instLogo} width={25} height={25} alt="instagram" />
						</Link>
						<Link href={contactData.dzen} target="_blank" {...hoverProps}>
							<Image src={dzenLogo} width={25} height={25} alt="dzen" />
						</Link>
					</div>
				</div>
			</div>
		</section>
	);
};
