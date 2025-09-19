import { universalConverter } from "./converters/universalConverter";
import { IMeta } from "./types/IMeta";
import { IProject } from "./types/IProject";
import { IMainPageData } from "./types/screenTypes/IMainScreen";

export const getInfoPageService = async <T = IMainPageData>(
	endPoint:
		| "main-screen"
		| "services-screen"
		| "contact-info"
		| "contact-screen"
		| "about-screen"
		| "project-screen",

	converter: (data: any) => T,
	queryValues?: string[] | []
): Promise<{ data: T }> => {
	try {
		const objQuery: Record<string, string> = {};
		if (queryValues) {
			queryValues.forEach(
				(value, index) => (objQuery[`populate[${index}]`] = value)
			);
		}

		const queryParams = new URLSearchParams(objQuery);

		const res = await makeRequest(endPoint, queryParams);
		const resRow = await res.json();

		const convertedData = converter(resRow.data);
		return { data: convertedData };
	} catch (error) {
		console.error("Error fetch data for screen " + error);
		return { data: {} as T };
	}
};

export const getProjects = async (
	queryValues?: string[] | [],
	filters?: { filter: "$eq" | "$contains"; field: string; value: string }[],
	pagination?: { params: "page" | "pageSize"; value: number }[]
): Promise<{ data: IProject[]; meta: IMeta }> => {
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

		const res = await makeRequest("projects", queryParams);

		const data: { data: IProject[]; meta: IMeta } = await res.json();

		const projects = universalConverter(data.data);

		return { data: projects, meta: data.meta };
	} catch (error) {
		console.error("Error fetch data for screen " + error);
		return { data: [] as IProject[], meta: {} as IMeta };
	}
};

async function makeRequest(
	endPoint:
		| "main-screen"
		| "services-screen"
		| "contact-info"
		| "contact-screen"
		| "about-screen"
		| "project-screen"
		| "projects",
	queryParams: URLSearchParams
) {
	const res = await fetch(
		`${process.env.NEXT_PUBLIC_API_URL}/${endPoint}?${queryParams.toString()}`,
		{
			headers: {
				Authorization: `Bearer ${process.env.NEXT_PUBLIC_APITOKEN}`,
			},
		}
	);
	if (!res.ok) {
		throw new Error("Error fetch, " + res.status);
	}
	return res;
}
