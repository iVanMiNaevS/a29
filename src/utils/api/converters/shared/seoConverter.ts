import { ISeo } from "../../types/ISeo";

export function seoConverter(apiData: any): ISeo {
	return {
		id: apiData.id,
		title: apiData.Title,
		description: apiData.Description,
	};
}
