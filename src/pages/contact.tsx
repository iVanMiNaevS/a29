import { ContactSection } from "@/components/home/contactSection";
import { getInfoPageService } from "@/utils/api/getInfoPageService";
import { IContactData } from "@/utils/api/types/IContactInfo";
import { IContactPageData } from "@/utils/api/types/screenTypes/IContactScreen";
import { GetStaticProps } from "next";
import Head from "next/head";
import React from "react";

import styles from "@/assets/css/contact.module.scss";
import { ButtonContact } from "@/components/shared/buttonContact";
import { useCursorHover } from "@/hooks/useCursorHover";
import { HaveAQuestSection } from "@/components/shared/haveAQuestSection";
import { contactDataConverter } from "@/utils/api/converters/contactDataConverter";
import { contactPageConverter } from "@/utils/api/converters/contactPageConverter";

type props = {
	data: IContactPageData;
	contactData: IContactData;
};

export const Contact = ({ data, contactData }: props) => {
	const hoverProps = useCursorHover(20);
	return (
		<>
			<Head>
				<title>{data.seo ? data.seo.title : "A29"}</title>
				<meta
					name="description"
					content={data.seo ? data.seo.description : "Описание"}
				/>
			</Head>
			<div className="container">
				<div className={styles.contactWrapp}>
					<ContactSection contactData={contactData} />
					<div className={styles.contactMapWrapp}>
						<iframe src={data.mapHref} frameBorder="0" allowFullScreen></iframe>
					</div>
				</div>
				<HaveAQuestSection />
			</div>
		</>
	);
};

export const getStaticProps: GetStaticProps = async () => {
	const dataPage = await getInfoPageService<IContactPageData>(
		"contact-screen",
		contactPageConverter,
		["Seo"]
	);
	const contactdataPage = await getInfoPageService<IContactData>(
		"contact-info",
		contactDataConverter,
		["Card.Image"]
	);
	return {
		props: { data: dataPage.data, contactData: contactdataPage.data },
		revalidate: 21600,
	};
};

export default Contact;
