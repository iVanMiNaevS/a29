import { IProject } from "../project.interface";
import { IReview } from "../review.interface";
import { ISeo } from "../seo.interface";

interface IDocumentReference {
	id: number;
	documentId: string;
}

interface IMediaFormat {
	id: number;
	documentId: string;
	name: string;
	alternativeText: string;
	caption: string;
	width: number;
	height: number;
	formats: string;
	hash: string;
	ext: string;
	mime: string;
	size: number;
	url: string;
	previewUrl: string;
	provider: string;
	provider_metadata: string;
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
	documentId: string;
	HeroSection: IHeroSection;
	AboutSection: IAboutSection;
	ProjectSection: IProjectSection;
	Reviews: IReview[];
	Seo: ISeo;
}
