import { IProject } from "../IProject";
import { ISeo } from "../ISeo";

export interface IProjectPageData {
	id: number;
	title: string;
	seo: ISeo;
	projects: IProject[];
}
