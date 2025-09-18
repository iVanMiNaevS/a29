import { IProject } from "../IProject";
import { IReview } from "../IReview";
import { ISeo } from "../ISeo";

interface IMediaFormat {
	id: number;
	name: string;
	alternativeText: string;
	width: number;
	height: number;
	formats: string;
	size: number;
	url: string;
	blurHash: string;
}

export interface IVideo extends IMediaFormat {}

interface IHeroSection {
	id: number;
	Title: string;
	Video: IVideo;
}

interface IAboutSection {
	id: number;
	Title: string;
	Description: string;
}

interface IProjectSection {
	id: number;
	Title: string;
	Projects: IProject[];
}

export interface IMainPageData {
	id: number;
	HeroSection: IHeroSection;
	AboutSection: IAboutSection;
	ProjectSection: IProjectSection;
	Reviews: IReview[];
	Seo: ISeo;
}
