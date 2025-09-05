import { IImageFormat } from "./image.interface";

export interface IContactCard {
	id: number;
	Name: string;
	About: string;
	Telegram: string;
	Whatsapp: string;
	Image: IImageFormat;
}

export interface IContactData {
	id: number;
	documentId: string;
	Phone: string;
	Address: string;
	Email: string;
	Pinterest: string;
	Vk: string;
	Instagram: string;
	Dzen: string;
	Card: IContactCard;
}
