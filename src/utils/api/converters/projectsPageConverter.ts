import { IProjectPageData } from "../types/screenTypes/IProjectScreen";
import { universalConverter } from "./universalConverter";

export function projectPageConverter(apiData: any): IProjectPageData {
	return universalConverter(apiData) as IProjectPageData;
}
