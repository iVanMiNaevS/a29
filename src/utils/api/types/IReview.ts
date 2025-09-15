import { IProject } from "./IProject";

export interface IReview {
	id: number;
	Text: string;
	Author: string;
	YandexHref: string;
	Project: IProject;
}
