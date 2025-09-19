import { IAboutPageData } from "../types/screenTypes/IAboutScreen";
import { universalConverter } from "./universalConverter";

export function aboutPageConverter(apiData: any): IAboutPageData {
	return universalConverter(apiData) as IAboutPageData;
}
