import Head from "next/head";
import styles from "@/assets/styles/Home.module.scss";
import { HeroSection } from "@/components/home/heroSection";
import { GetStaticProps } from "next";
import { getInfoPageService } from "@/utils/api/getInfoPageService";
import { IMainPageData } from "@/utils/api/types/screenTypes/IMainScreen";
import { Project } from "@/components/shared/project";
import { useCursorHover } from "@/hooks/useCursorHover";
import Link from "next/link";
import { AppRouter } from "@/utils/AppRouter";
import { ReviewsSection } from "@/components/home/reviewsSection";
import { ContactSection } from "@/components/home/contactSection";
import { IContactData } from "@/utils/api/types/IContactInfo";
import { mainPageConverter } from "@/utils/api/converters/mainPageConverter";
import { contactDataConverter } from "@/utils/api/converters/contactDataConverter";

type props = {
	data: IMainPageData;
	contactData: IContactData;
};

export default function Home({ data, contactData }: props) {
	const hoverProps = useCursorHover(20);

	return (
		<>
			<Head>
				<title>{data.seo ? data.seo.title : "A29"}</title>
				<meta
					name="description"
					content={data.seo ? data.seo.description : "Описание"}
				/>
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<div>
				<HeroSection
					title={data.heroSection.title}
					video={data.heroSection.video}
				/>
				<div className="container">
					<section className={styles.aboutSection}>
						<h2 className="sectionTitle">О студии</h2>
						<div className={styles.aboutSection__content + " sectionContent"}>
							<p className="h2">{data.aboutSection.title}</p>
							<div
								className={styles.aboutSection__desc + " itemTitle"}
								dangerouslySetInnerHTML={{
									__html: data.aboutSection.description,
								}}
							/>
						</div>
					</section>
					<section className={styles.projectsSection}>
						<div className={styles.projectsSection__header}>
							<h2 className="sectionTitle">Проекты</h2>
							<div className={styles.projectsSec__content + " sectionContent"}>
								<h2>{data.projectSection.title}</h2>
							</div>
						</div>
						<div className={styles.projectsSection__projects}>
							{data.projectSection.projects.map((project) => {
								return <Project key={project.id} project={project} />;
							})}
						</div>
						<Link
							href={AppRouter.PROJECTS}
							{...hoverProps}
							className={styles.projectsSection__button}
						>
							Смотреть больше проектов
						</Link>
					</section>
					<ReviewsSection reviews={data.reviews} />
					<ContactSection contactData={contactData} />
				</div>
			</div>
		</>
	);
}

export const getStaticProps: GetStaticProps = async () => {
	const dataPage = await getInfoPageService<IMainPageData>(
		"main-screen",
		mainPageConverter,
		[
			"HeroSection",
			"HeroSection.Video",
			"AboutSection",
			"ProjectSection",
			"ProjectSection.Projects.Gallery",
			"Reviews.Project.Poster",
			"Seo",
		]
	);
	const contactDataPage = await getInfoPageService<IContactData>(
		"contact-info",
		contactDataConverter,
		["Card.Image"]
	);
	return {
		props: { data: dataPage.data, contactData: contactDataPage.data },
		revalidate: 21600,
	};
};
