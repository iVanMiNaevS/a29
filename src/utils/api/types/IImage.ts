export interface IImageFormat {
	id: number;
	name: string;
	alternativeText: string;
	width: number;
	height: number;
	formats: IFormats;
	size: number;
	url: string;
	blurHash: string;
}

export interface IFormats {
	large: IFormat;
	medium: IFormat;
}

export interface IFormat {
	url: string;
	width: number;
	height: number;
}
