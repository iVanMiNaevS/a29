import { IMeta } from "./types/meta.interface";
import { IMainPageData } from "./types/screenTypes/mainScreen.interface";

export const getInfoPageService = async <T = IMainPageData>(
	endPoint:
		| "main-screen"
		| "services-screen"
		| "contact-info"
		| "contact-screen"
		| "about-screen"
		| "project-screen"
		| "projects",
	queryValues?: string[] | [],

	filters?: { filter: "$eq" | "$contains"; field: string; value: string }[],
	pagination?: { params: "page" | "pageSize"; value: number }[]
): Promise<{ data: T; meta: IMeta }> => {
	try {
		const objQuery: Record<string, string> = {};
		if (queryValues) {
			queryValues.forEach(
				(value, index) => (objQuery[`populate[${index}]`] = value)
			);
		}
		if (filters) {
			filters.forEach(
				(filter) =>
					(objQuery[`filters[${filter.field}][${filter.filter}]`] =
						filter.value)
			);
		}
		if (pagination) {
			pagination.forEach((paginationOne) => {
				objQuery[`pagination[${paginationOne.params}]`] =
					paginationOne.value.toString();
			});
		}
		const queryParams = new URLSearchParams(objQuery);

		const res = await fetch(
			`${
				process.env.NEXT_PUBLIC_API_URL
			}/${endPoint}?${queryParams.toString()}`,
			{
				headers: {
					Authorization: `Bearer ${process.env.NEXT_PUBLIC_APITOKEN}`,
				},
			}
		);
		if (!res.ok) {
			throw new Error("Error fetch, " + res.status);
		}
		const data: { data: T; meta: IMeta } = await res.json();
		return { data: data.data, meta: data.meta };
	} catch (error) {
		console.error("Error fetch data for main screen" + error);
		return { data: {} as T, meta: {} as IMeta };
	}
};
