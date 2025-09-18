import { IImageFormat } from "../IImage";
import { ISeo } from "../ISeo";

export interface IAboutPageData {
	id: number;
	heroSection: IHeroSection;
	teamSection: TeamSection;
	vacancySection: VacancySection;
	seo: ISeo;
}

export interface Author {
	id: number;
	name: string;
	post: string;
	image: IImageFormat;
	defaultPosition: number;
	alternativePosition: number;
}

export interface Principle {
	id: number;
	text: string;
	author: Author;
}

export interface IHeroSection {
	id: number;
	title: string;
	poster: IImageFormat;
	principles: Principle[];
}

export interface ITeamMember {
	id: number;
	name: string;
	post: string;
	image: IImageFormat;
	defaultPosition: number;
	alternativePosition: number;
}

export interface TeamSection {
	id: number;
	title: string;
	team: ITeamMember[];
}

export interface Vacancy {
	id: number;
	value: string;
}

export interface VacancySection {
	id: number;
	poster: IImageFormat;
	vacancies: Vacancy[];
}
