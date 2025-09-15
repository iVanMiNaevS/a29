import { IProject } from "../IProject";
import { ISeo } from "../ISeo";

export interface IProjectPageData {
	id: number;
	Title: string;
	Seo: ISeo;
	Projects: IProject[];
}
