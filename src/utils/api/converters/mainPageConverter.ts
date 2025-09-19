import { IReview } from "../types/IReview";
import { IMainPageData } from "../types/screenTypes/IMainScreen";
import { imageConverter } from "./shared/imageConverter";
import {
	projectConverter,
	projectsConverter,
} from "./shared/projectsConverter";
import { seoConverter } from "./shared/seoConverter";

export function mainPageConverter(apiData: any): IMainPageData {
	return {
		id: apiData.id,
		heroSection: {
			id: apiData.HeroSection.id,
			title: apiData.HeroSection.Title,
			video: imageConverter(apiData.HeroSection.Video),
		},
		aboutSection: {
			id: apiData.AboutSection.id,
			title: apiData.AboutSection.Title,
			description: apiData.AboutSection.Description,
		},
		projectSection: {
			id: apiData.ProjectSection.id,
			title: apiData.ProjectSection.Title,
			projects: projectsConverter(apiData.ProjectSection.Projects),
		},
		reviews: apiData.Reviews.map((review: any) => {
			return {
				id: review.id,
				text: review.Text,
				author: review.Author,
				yandexHref: review.YandexHref,
				project: projectConverter(review.Project),
			};
		}),
		seo: seoConverter(apiData.Seo),
	};
}
