import { getInfoPageService } from "@/utils/api/getInfoPageService";
import { IServicesPageData } from "@/utils/api/types/screenTypes/IServicesScreen";
import { GetStaticProps } from "next";
import Head from "next/head";
import React, { useRef } from "react";

import styles from "@/assets/css/services.module.scss";
import { DropDownInfo } from "@/components/shared/dropDownInfo";
import { HaveAQuestSection } from "@/components/shared/haveAQuestSection";
import { NotDoingSection } from "@/components/services/notDoingSection";
import { StageSection } from "@/components/services/stageSection";
import { servicesPageConverter } from "@/utils/api/converters/servicesPageConverter";

type props = {
	data: IServicesPageData;
};

const Services = ({ data }: props) => {
	return (
		<>
			<Head>
				<title>{data.seo ? data.seo.title : "A29"}</title>
				<meta
					name="description"
					content={data.seo ? data.seo.description : "Описание"}
				/>
			</Head>
			<div className={styles.servicePage + " container"}>
				<section className={styles.servicesSec}>
					<div className={styles.servicesSec__header}>
						<h1 className="sectionTitle">услуги</h1>
						<div className={styles.servicesSec__titleWrapp + " sectionContent"}>
							<p className="h1">
								{data.servicesSection ? data.servicesSection.title : "Услуги"}
							</p>
							<p className={styles.servicesSec__desc + " itemTitle"}>
								{data.servicesSection
									? data.servicesSection.description
									: "Описание"}
							</p>
						</div>
					</div>
					<div className={styles.servicesSec__services}>
						{data.servicesSection && data
							? data.servicesSection.services.map((service) => {
									return (
										<div
											key={service.id}
											className={styles.servicesSec__serviceWrapp}
										>
											<h2 className="h3">{service.title}</h2>
											<div className="sectionContent">
												{service.accordions.map((accordion, index) => {
													return (
														<DropDownInfo
															paddingTop={index !== 0}
															key={accordion.id}
															notBorder={
																index === service.accordions.length - 1
															}
															title={accordion.title}
														>
															<pre>{accordion.description}</pre>
														</DropDownInfo>
													);
												})}
											</div>
										</div>
									);
							  })
							: "список услуг"}
					</div>
				</section>
			</div>
			<NotDoingSection data={data.notDoingSection} />
			<div className={styles.servicePage}>
				<StageSection data={data.stageSection} />
				<section className={styles.faqSec}>
					<div className="container">
						<div className={styles.faqSec__header}>
							<h2 className="sectionTitle">вопросы</h2>
							<p className="h2 sectionContent">
								{data.faqSection ? data.faqSection.title : "Вопросы"}
							</p>
						</div>
						<div className={styles.faqSec__accordionsWrapp}>
							<div className={styles.faqSec__accordions}>
								{data.faqSection
									? data.faqSection.accordions.map((quest, index) => {
											return (
												<DropDownInfo
													key={quest.id}
													paddingTop
													notBorder={
														index === data.faqSection.accordions.length - 1
													}
													title={quest.title}
												>
													<pre>{quest.description}</pre>
												</DropDownInfo>
											);
									  })
									: "список вопросов"}
							</div>
						</div>
					</div>
				</section>
				<div className="container">
					<HaveAQuestSection />
				</div>
			</div>
		</>
	);
};

export const getStaticProps: GetStaticProps = async () => {
	const dataPage = await getInfoPageService<IServicesPageData>(
		"services-screen",
		servicesPageConverter,
		[
			"ServicesSection.Services.Accordions",
			"NotDoingSection.Accordions",
			"FaqSection.Accordions",
			"StageSection.Stages.Image",
			"Seo",
		]
	);
	return {
		props: { data: dataPage.data },
		revalidate: 21600,
	};
};

export default Services;
