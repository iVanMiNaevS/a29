import { IMainPageData } from "../types/screenTypes/IMainScreen";

import { universalConverter } from "./universalConverter";

export function mainPageConverter(apiData: any): IMainPageData {
	return universalConverter(apiData) as IMainPageData;
}
