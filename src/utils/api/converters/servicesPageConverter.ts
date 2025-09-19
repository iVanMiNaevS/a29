import { IServicesPageData } from "../types/screenTypes/IServicesScreen";
import { universalConverter } from "./universalConverter";

export function servicesPageConverter(apiData: any): IServicesPageData {
	return universalConverter(apiData) as IServicesPageData;
}
