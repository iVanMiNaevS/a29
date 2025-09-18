import { IContactPageData } from "../types/screenTypes/IContactScreen";
import { seoConverter } from "./shared/seoConverter";

export function contactPageConverter(apiData: any): IContactPageData {
	return {
		id: apiData.id,
		mapHref: apiData.MapHref,
		seo: seoConverter(apiData.Seo),
	};
}
