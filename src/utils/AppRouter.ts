export class AppRouter {
	static readonly HOME = "/";
	static readonly ABOUT = "/about";
	static readonly PROJECTS = "/projects";
	static readonly SERVICES = "/services";
	static readonly CONTACT = "/contact";
	static readonly VACANCY = "/about/#vacancy";

	static readonly ALL = [
		AppRouter.HOME,
		AppRouter.ABOUT,
		AppRouter.PROJECTS,
		AppRouter.SERVICES,
		AppRouter.CONTACT,
		AppRouter.VACANCY,
	];
}
