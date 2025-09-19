import { IContactData } from "../types/IContactInfo";
import { universalConverter } from "./universalConverter";

export function contactDataConverter(apiData: any): IContactData {
	return universalConverter(apiData) as IContactData;
}
