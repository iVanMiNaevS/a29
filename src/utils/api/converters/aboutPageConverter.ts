import { IAboutPageData } from "../types/screenTypes/IAboutScreen";
import { imageConverter } from "./shared/imageConverter";
import { seoConverter } from "./shared/seoConverter";

export function aboutPageConverter(apiData: any): IAboutPageData {
	return {
		id: apiData.id,
		seo: seoConverter(apiData.Seo),
		heroSection: {
			id: apiData.HeroSection.id,
			title: apiData.HeroSection.Title,
			poster: imageConverter(apiData.HeroSection.Poster),
			principles: apiData.HeroSection.Principles.map((p: any) => ({
				id: p.id,
				text: p.Text,
				author: {
					id: p.Author.id,
					name: p.Author.Name,
					post: p.Author.Post,
					image: imageConverter(p.Author.Image),
					defaultPosition: p.Author.DefaultPosition,
					alternativePosition: p.Author.AlternativePosition,
				},
			})),
		},

		teamSection: {
			id: apiData.TeamSection.id,
			title: apiData.TeamSection.Title,
			team: apiData.TeamSection.Team.map((m: any) => ({
				id: m.id,
				name: m.Name,
				post: m.Post,
				image: imageConverter(m.Image),
				defaultPosition: m.DefaultPosition,
				alternativePosition: m.AlternativePosition,
			})),
		},

		vacancySection: {
			id: apiData.VacancySection.id,
			poster: imageConverter(apiData.VacancySection.Poster),
			vacancies: apiData.VacancySection.Vacancies.map((v: any) => ({
				id: v.id,
				value: v.Value,
			})),
		},
	};
}
