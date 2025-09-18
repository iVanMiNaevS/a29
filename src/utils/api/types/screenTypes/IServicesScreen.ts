import { IImageFormat } from "../IImage";
import { ISeo } from "../ISeo";

interface Stage {
	id: number;
	title: string;
	text: string;
	image: IImageFormat;
}

export interface IStageSection {
	id: number;
	title: string;
	stages: Stage[];
}

interface Service {
	id: number;
	title: string;
	accordions: Accordion[];
}

interface ServicesSection {
	id: number;
	services: Service[];
	title: string;
	description: string;
}

interface NotDoingAccordion {
	id: number;
	value: string;
}

export interface INotDoingSection {
	id: number;
	title: string;
	accordions: NotDoingAccordion[];
}

interface Accordion {
	id: number;
	title: string;
	description: string;
}

interface FaqSection {
	id: number;
	title: string;
	accordions: Accordion[];
}

export interface IServicesPageData {
	id: number;
	servicesSection: ServicesSection;
	notDoingSection: INotDoingSection;
	faqSection: FaqSection;
	seo: ISeo;
	stageSection: IStageSection;
}
