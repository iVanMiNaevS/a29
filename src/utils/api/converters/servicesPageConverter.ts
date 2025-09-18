import { IServicesPageData } from "../types/screenTypes/IServicesScreen";
import { IImageFormat } from "../types/IImage";
import { imageConverter } from "./shared/imageConverter";
import { seoConverter } from "./shared/seoConverter";

export function servicesPageConverter(apiData: any): IServicesPageData {
	return {
		id: apiData.id,

		servicesSection: {
			id: apiData.ServicesSection.id,
			title: apiData.ServicesSection.Title,
			description: apiData.ServicesSection.Description,
			services: apiData.ServicesSection.Services.map((s: any) => ({
				id: s.id,
				title: s.Title,
				accordions: s.Accordions.map((a: any) => ({
					id: a.id,
					title: a.Title,
					description: a.Description,
				})),
			})),
		},

		notDoingSection: {
			id: apiData.NotDoingSection.id,
			title: apiData.NotDoingSection.Title,
			accordions: apiData.NotDoingSection.Accordions.map((a: any) => ({
				id: a.id,
				value: a.Value,
			})),
		},

		faqSection: {
			id: apiData.FaqSection.id,
			title: apiData.FaqSection.Title,
			accordions: apiData.FaqSection.Accordions.map((a: any) => ({
				id: a.id,
				title: a.Title,
				description: a.Description,
			})),
		},

		stageSection: {
			id: apiData.StageSection.id,
			title: apiData.StageSection.Title,
			stages: apiData.StageSection.Stages.map((s: any) => ({
				id: s.id,
				title: s.Title,
				text: s.Text,
				image: imageConverter(s.Image),
			})),
		},

		seo: seoConverter(apiData.Seo),
	};
}
