import { IProject } from "@/utils/api/types/IProject";
import { imageConverter } from "./imageConverter";
import { IImageFormat } from "../../types/IImage";

export function projectConverter(apiData: any): IProject {
	return {
		id: apiData.id,
		title: apiData.Title,
		city: apiData.City,
		square: apiData.Square,
		year: apiData.Year,
		gallery: apiData.Gallery
			? apiData.Gallery.map((g: IImageFormat) => imageConverter(g))
			: null,
		poster: apiData.Poster ? imageConverter(apiData.Poster) : null,
		layouts: apiData.Layouts
			? apiData.Layouts.map((l: IImageFormat) => imageConverter(l))
			: null,
		description: apiData.Description,
		type: apiData.Type,
		slug: apiData.Slug,
		rank: apiData.rank,
		formatTitle: apiData.FormatTitle,
	};
}

export function projectsConverter(apiDataArray: any[]): IProject[] {
	return apiDataArray.map(projectConverter);
}
