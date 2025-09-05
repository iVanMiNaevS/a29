import React from "react";
import styles from "@/assets/styles/Home.module.scss";
import Image from "next/image";
import { IContactData } from "@/utils/api/types/contactInfo.interface";
import Link from "next/link";
import tgLogo from "@/assets/icons/tg.aeb371e0.svg";
import wpLogo from "@/assets/icons/whatsapp.e39092a8.svg";
import prLogo from "@/assets/icons/pinterest.5c608ff4.svg";
import vkLogo from "@/assets/icons/vk.5ab775c6.svg";
import instLogo from "@/assets/icons/inst.02e545b2.svg";
import dzenLogo from "@/assets/icons/dzen.0b07a2a2.svg";
import { useCursorHover } from "@/hooks/useCursorHover";
type props = {
	contactData: IContactData;
};

export const ContactSection = ({ contactData }: props) => {
	const hoverProps = useCursorHover(20);

	return (
		<section className={styles.contactSection}>
			<div className={styles.contactSection__header}>
				<h4 className="sectionTitle">Связаться с нами</h4>
				<h2 className={styles.contactSection__content + " sectionContent"}>
					Контактная информация
				</h2>
			</div>
			<div className={styles.contactSection__content}>
				<div className={styles.contactSection__menegerWrapp}>
					<div className={styles.contactSection__personInfo}>
						<Image
							src={process.env.NEXT_PUBLIC_URL + contactData.Card.Image.url}
							width={contactData.Card.Image.width}
							height={contactData.Card.Image.height}
							alt={contactData.Card.Image.alternativeText}
						/>
						<div className={styles.contactSection__personInfoText}>
							<h3 className="itemTitle">{contactData.Card.Name}</h3>
							<p>{contactData.Card.About}</p>
						</div>
					</div>
					<div className={styles.contactSection__personLinks}>
						<Link href={contactData.Card.Telegram} {...hoverProps}>
							<Image src={tgLogo} width={20} height={20} alt="telegram" />
							Telegram
						</Link>
						<Link href={contactData.Card.Telegram} {...hoverProps}>
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
							title={contactData.Phone}
							href={contactData.Phone}
						>
							{contactData.Phone}
						</Link>
					</p>
					<p>{contactData.Address}</p>
					<p className={styles.contactSection__email}>
						<Link
							{...hoverProps}
							target="_blank"
							title={contactData.Email}
							href={`mailto: ${contactData.Email}`}
						>
							{" "}
							{contactData.Email}
						</Link>
						<span>
							Отправить заявку, предложение о сотрудничестве или резюме
						</span>
					</p>
					<div className={styles.contactSection__contactInfoLinks}>
						<Link href={contactData.Pinterest} {...hoverProps}>
							<Image src={prLogo} width={25} height={25} alt="pinterest" />
						</Link>
						<Link href={contactData.Pinterest} {...hoverProps}>
							<Image src={vkLogo} width={25} height={25} alt="vk" />
						</Link>
						<Link href={contactData.Pinterest} {...hoverProps}>
							<Image src={instLogo} width={25} height={25} alt="instagram" />
						</Link>
						<Link href={contactData.Pinterest} {...hoverProps}>
							<Image src={dzenLogo} width={25} height={25} alt="dzen" />
						</Link>
					</div>
				</div>
			</div>
		</section>
	);
};
