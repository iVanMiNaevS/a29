import { ContactSection } from "@/components/home/contactSection";
import { getInfoPageService } from "@/utils/api/getInfoPageService";
import { IContactData } from "@/utils/api/types/contactInfo.interface";
import { IContactPageData } from "@/utils/api/types/screenTypes/contactScreen.interface";
import { GetStaticProps } from "next";
import Head from "next/head";
import React from "react";

import styles from "@/assets/styles/contact.module.scss";
import { ButtonContact } from "@/components/shared/buttonContact";
import { useCursorHover } from "@/hooks/useCursorHover";
import { HaveAQuestSection } from "@/components/shared/haveAQuestSection";

type props = {
	data: IContactPageData;
	contactData: IContactData;
};

export const Contact = ({ data, contactData }: props) => {
	const hoverProps = useCursorHover(20);
	return (
		<>
			<Head>
				<title>{data.Seo.Title}</title>
				<meta name="description" content={data.Seo.Description} />
			</Head>
			<div className="container">
				<div className={styles.contactWrapp}>
					<ContactSection contactData={contactData} />
					<div className={styles.contactMapWrapp}>
						<iframe src={data.MapHref} frameBorder="0" allowFullScreen></iframe>
					</div>
				</div>
				<HaveAQuestSection />
			</div>
		</>
	);
};

export const getStaticProps: GetStaticProps = async () => {
	const dataAndMeta = await getInfoPageService<IContactPageData>(
		"contact-screen",
		["Seo"]
	);
	const contactDataAndMeta = await getInfoPageService<IContactData>(
		"contact-info",
		["Card.Image"]
	);
	return {
		props: { data: dataAndMeta.data, contactData: contactDataAndMeta.data },
		revalidate: 21600,
	};
};

export default Contact;
