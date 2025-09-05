import { IProject } from "../project.interface";
import { ISeo } from "../seo.interface";

export interface IProjectPageData {
	id: number;
	Title: string;
	Seo: ISeo;
	Projects: IProject[];
}
