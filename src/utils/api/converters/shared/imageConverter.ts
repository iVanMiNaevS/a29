import { IImageFormat } from "../../types/IImage";

export function imageConverter(apiData: any): IImageFormat {
	if (!apiData) {
		return {} as IImageFormat;
	}

	return {
		id: apiData.id,
		name: apiData.name ?? "",
		alternativeText: apiData.alternativeText ?? "",
		width: apiData.width ?? 0,
		height: apiData.weight ?? 0,
		formats: apiData.formats
			? {
					large: apiData.formats.large
						? {
								url: apiData.formats.large.url,
								width: apiData.formats.large.width,
								height: apiData.formats.large.height,
						  }
						: ({} as any),
					medium: apiData.formats.medium
						? {
								url: apiData.formats.medium.url,
								width: apiData.formats.medium.width,
								height: apiData.formats.medium.height,
						  }
						: ({} as any),
			  }
			: { large: {} as any, medium: {} as any },
		size: apiData.size ?? 0,
		url: apiData.url ?? "",
		blurHash: apiData.blurHash ?? "",
	};
}
