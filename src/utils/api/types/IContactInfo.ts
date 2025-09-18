import { IImageFormat } from "./IImage";

export interface IContactCard {
	id: number;
	name: string;
	about: string;
	telegram: string;
	whatsapp: string;
	image: IImageFormat;
}

export interface IContactData {
	id: number;
	phone: string;
	address: string;
	email: string;
	pinterest: string;
	vk: string;
	instagram: string;
	dzen: string;
	card?: IContactCard;
}
