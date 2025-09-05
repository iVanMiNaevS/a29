import Head from "next/head";
import styles from "@/assets/styles/Home.module.scss";
import { HeroSection } from "@/components/home/heroSection";
import { GetStaticProps } from "next";
import { getInfoPageService } from "@/utils/api/getInfoPageService";
import { IMainPageData } from "@/utils/api/types/screenTypes/mainScreen.interface";
import { Project } from "@/components/shared/project";
import { useCursorHover } from "@/hooks/useCursorHover";
import Link from "next/link";
import { AppRouter } from "@/utils/AppRouter";
import { ReviewsSection } from "@/components/home/reviewsSection";
import { ContactSection } from "@/components/home/contactSection";
import { IContactData } from "@/utils/api/types/contactInfo.interface";

type props = {
	data: IMainPageData;
	contactData: IContactData;
};

export default function Home({ data, contactData }: props) {
	const hoverProps = useCursorHover(20);
	return (
		<>
			<Head>
				<title>{data.Seo.Title}</title>
				<meta name="description" content={data.Seo.Description} />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<div>
				<HeroSection
					title={data.HeroSection.Title}
					video={data.HeroSection.Video}
				/>
				<div className="container">
					<section className={styles.aboutSection}>
						<h4 className="sectionTitle">О студии</h4>
						<div className={styles.aboutSection__content + " sectionContent"}>
							<h2>{data.AboutSection.Title}</h2>
							<div
								className={styles.aboutSection__desc + " itemTitle"}
								dangerouslySetInnerHTML={{
									__html: data.AboutSection.Description,
								}}
							/>
						</div>
					</section>
					<section className={styles.projectsSection}>
						<div className={styles.projectsSection__header}>
							<h4 className="sectionTitle">Проекты</h4>
							<div className={styles.projectsSec__content + " sectionContent"}>
								<h2>{data.ProjectSection.Title}</h2>
							</div>
						</div>
						<div className={styles.projectsSection__projects}>
							{data.ProjectSection.Projects.map((project) => {
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
					<ReviewsSection reviews={data.Reviews} />
					<ContactSection contactData={contactData} />
				</div>
			</div>
		</>
	);
}

export const getStaticProps: GetStaticProps = async () => {
	const dataAndMeta = await getInfoPageService<IMainPageData>("main-screen", [
		"HeroSection",
		"HeroSection.Video",
		"AboutSection",
		"ProjectSection",
		"ProjectSection.Projects.Gallery",
		"Reviews.Project.Poster",
		"Seo",
	]);
	const contactDataAndMeta = await getInfoPageService<IContactData>(
		"contact-info",
		["Card.Image"]
	);
	return {
		props: { data: dataAndMeta.data, contactData: contactDataAndMeta.data },
		revalidate: 21600,
	};
};
