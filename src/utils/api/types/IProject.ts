import { IImageFormat } from "./IImage";

export interface IProject {
	id: number;
	title: string;
	city: string;
	square: string;
	year: string;
	gallery: IImageFormat[];
	poster: IImageFormat | null;
	layouts: IImageFormat[];
	description: string;
	type: string;
	slug: string;
	rank: number;
	formatTitle: string;
}
