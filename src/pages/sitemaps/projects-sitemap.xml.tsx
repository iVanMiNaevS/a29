import { getProjects } from "@/utils/api/getInfoPageService";
import { getServerSideSitemapLegacy } from "next-sitemap";

export async function getServerSideProps(ctx: any) {
	const { data: projects } = await getProjects();
	if (!projects) {
		return getServerSideSitemapLegacy(ctx, []);
	}

	const projectsFields = projects.map((item) => ({
		loc: `https://a29.studio/${item.slug}/`,
		lastmod: new Date().toISOString(),
	}));

	return getServerSideSitemapLegacy(ctx, [...projectsFields]);
}

export default function SitemapIndex() {}
