import { IContactData } from "../types/IContactInfo";
import { imageConverter } from "./shared/imageConverter";

export function contactDataConverter(apiData: any): IContactData {
	return {
		id: apiData.id,
		phone: apiData.Phone,
		address: apiData.Address,
		email: apiData.Email,
		pinterest: apiData.Pinterest,
		vk: apiData.Vk,
		instagram: apiData.Instagram,
		dzen: apiData.Dzen,
		card: apiData.Card
			? {
					id: apiData.Card.id,
					name: apiData.Card.Name,
					about: apiData.Card.About,
					telegram: apiData.Card.Telegram,
					whatsapp: apiData.Card.Whatsapp,
					image: imageConverter(apiData.Card.Image),
			  }
			: undefined,
	};
}
