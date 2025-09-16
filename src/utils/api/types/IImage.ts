export interface IImageFormat {
	id: number;
	documentId: string;
	name: string;
	alternativeText: string;
	caption: string;
	width: number;
	height: number;
	formats: IFormats;
	hash: string;
	ext: string;
	mime: string;
	size: number;
	url: string;
	previewUrl: string;
	provider: string;
	provider_metadata: string;
	folderPath: string;
	createdAt: string;
	updatedAt: string;
	publishedAt: string;
	locale: string;
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
