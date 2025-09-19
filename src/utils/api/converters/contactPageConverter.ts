import { IContactPageData } from "../types/screenTypes/IContactScreen";
import { universalConverter } from "./universalConverter";

export function contactPageConverter(apiData: any): IContactPageData {
	return universalConverter(apiData) as IContactPageData;
}
