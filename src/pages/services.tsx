import { getInfoPageService } from "@/utils/api/getInfoPageService";
import { IServicesPageData } from "@/utils/api/types/screenTypes/servicesScreen.interface";
import { GetStaticProps } from "next";
import Head from "next/head";
import React from "react";

import styles from "@/assets/styles/services.module.scss";
import { DropDownInfo } from "@/components/shared/dropDownInfo";
import { HaveAQuestSection } from "@/components/shared/haveAQuestSection";

type props = {
	data: IServicesPageData;
};

const Services = ({ data }: props) => {
	return (
		<>
			<Head>
				<title>{data.Seo.Title}</title>
				<meta name="description" content={data.Seo.Description} />
			</Head>
			<div className="container">
				<section className={styles.servicesSec}>
					<div className={styles.servicesSec__header}>
						<h1 className="sectionTitle">услуги</h1>
						<div className={styles.servicesSec__titleWrapp + " sectionContent"}>
							<p className="h1">{data.ServicesSection.Title}</p>
							<p className={styles.servicesSec__desc + " itemTitle"}>
								{data.ServicesSection.Description}
							</p>
						</div>
					</div>
					<div className={styles.servicesSec__services}>
						{data.ServicesSection.Services.map((service) => {
							return (
								<div
									key={service.id}
									className={styles.servicesSec__serviceWrapp}
								>
									<h2 className="h3">{service.Title}</h2>
									<div className="sectionContent">
										{service.Accordions.map((accordion, index) => {
											return (
												<DropDownInfo
													paddingTop={index !== 0}
													key={accordion.id}
													notBorder={index === service.Accordions.length - 1}
													title={accordion.Title}
												>
													<pre>{accordion.Description}</pre>
												</DropDownInfo>
											);
										})}
									</div>
								</div>
							);
						})}
					</div>
				</section>
				<section className={styles.faqSec}>
					<div className={styles.faqSec__header}>
						<h2 className="sectionTitle">вопросы</h2>
						<p className="h2 sectionContent">{data.FaqSection.Title}</p>
					</div>
					<div className={styles.faqSec__accordionsWrapp}>
						<div className={styles.faqSec__accordions}>
							{data.FaqSection.Accordions.map((quest, index) => {
								return (
									<DropDownInfo
										key={quest.id}
										paddingTop
										notBorder={index === data.FaqSection.Accordions.length - 1}
										title={quest.Title}
									>
										<pre>{quest.Description}</pre>
									</DropDownInfo>
								);
							})}
						</div>
					</div>
				</section>
				<HaveAQuestSection />
			</div>
		</>
	);
};

export const getStaticProps: GetStaticProps = async () => {
	const dataAndMeta = await getInfoPageService<IServicesPageData>(
		"services-screen",
		[
			"ServicesSection.Services.Accordions",
			"NotDoingSection.Accordions",
			"FaqSection.Accordions",
			"StageSection.Stages.Image",
			"Seo",
		]
	);
	return {
		props: { data: dataAndMeta.data },
		revalidate: 21600,
	};
};

export default Services;
