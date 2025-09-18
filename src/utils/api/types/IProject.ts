import { IImageFormat } from "./IImage";

export interface IProject {
	id: number;
	Title: string;
	City: string;
	Square: string;
	Year: string;
	Gallery: IImageFormat[];
	Poster: IImageFormat;
	Layouts: IImageFormat[];
	Description: string;
	Type: string;
	Slug: string;
	rank: number;
	FormatTitle: string;
}
