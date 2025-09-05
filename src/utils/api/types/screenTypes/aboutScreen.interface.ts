import { IImageFormat } from "../image.interface";
import { ISeo } from "../seo.interface";

export interface IAboutPageData {
	id: number;
	documentId: string;
	HeroSection: HeroSection;
	TeamSection: TeamSection;
	VacancySection: VacancySection;
	Seo: ISeo;
	locale: string;
}

export interface Author {
	id: number;
	Name: string;
	Post: string;
	Image: IImageFormat;
	DefaultPosition: number;
	AlternativePosition: number;
}

export interface Principle {
	id: number;
	Text: string;
	Author: Author;
}

export interface HeroSection {
	id: number;
	Title: string;
	Poster: IImageFormat;
	Principles: Principle[];
}

export interface ITeamMember {
	id: number;
	Name: string;
	Post: string;
	Image: IImageFormat;
	DefaultPosition: number;
	AlternativePosition: number;
}

export interface TeamSection {
	id: number;
	Title: string;
	Team: ITeamMember[];
}

export interface Vacancy {
	id: number;
	Value: string;
}

export interface VacancySection {
	id: number;
	Poster: IImageFormat;
	Vacancies: Vacancy[];
}
