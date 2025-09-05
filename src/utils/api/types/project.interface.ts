import { IImageFormat } from "./image.interface";

export interface IProject {
	id: number;
	documentId: string;
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
	locale: string;
}
