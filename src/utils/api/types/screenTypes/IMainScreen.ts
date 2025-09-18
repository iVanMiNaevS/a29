import { IImageFormat } from "../IImage";
import { IProject } from "../IProject";
import { IReview } from "../IReview";
import { ISeo } from "../ISeo";

export interface IMainPageData {
	id: number;
	heroSection: {
		id: number;
		title: string;
		video: IImageFormat;
	};
	aboutSection: {
		id: number;
		title: string;
		description: string;
	};
	projectSection: {
		id: number;
		title: string;
		projects: IProject[];
	};
	reviews: IReview[];
	seo: ISeo;
}
