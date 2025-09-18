import { IProjectPageData } from "../types/screenTypes/IProjectScreen";
import { projectsConverter } from "./shared/projectsConverter";
import { seoConverter } from "./shared/seoConverter";

export function projectPageConverter(apiData: any): IProjectPageData {
	return {
		id: apiData.id,
		title: apiData.Title,
		seo: seoConverter(apiData.Seo),
		projects: projectsConverter(apiData.Projects),
	};
}
