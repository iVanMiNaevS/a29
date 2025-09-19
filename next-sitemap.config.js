module.exports = {
	siteUrl: "https://a29.studio",
	exclude: ["/sitemaps/projects-sitemap.xml"],
	generateRobotsTxt: true,
	robotsTxtOptions: {
		policies: [{ userAgent: "*", disallow: "/" }],
		additionalSitemaps: [
			`https://a29.studio/sitemap.xml`,
			`https://a29.studio/sitemaps/projects-sitemap.xml`,
		],
	},
};
