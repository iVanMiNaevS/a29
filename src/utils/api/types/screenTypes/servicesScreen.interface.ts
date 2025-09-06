import { IImageFormat } from "../image.interface";
import { ISeo } from "../seo.interface";

interface Stage {
	id: number;
	Title: string;
	Text: string;
	Image: IImageFormat;
}

export interface IStageSection {
	id: number;
	Title: string;
	Stages: Stage[];
}

interface Service {
	id: number;
	Title: string;
	Accordions: Accordion[];
}

interface ServicesSection {
	id: number;
	Services: Service[];
	Title: string;
	Description: string;
}

interface NotDoingAccordion {
	id: number;
	Value: string;
}

export interface INotDoingSection {
	id: number;
	Title: string;
	Accordions: NotDoingAccordion[];
}

interface Accordion {
	id: number;
	Title: string;
	Description: string;
}

interface FaqSection {
	id: number;
	Title: string;
	Accordions: Accordion[];
}

export interface IServicesPageData {
	id: number;
	documentId: string;
	ServicesSection: ServicesSection;
	NotDoingSection: INotDoingSection;
	FaqSection: FaqSection;
	Seo: ISeo;
	StageSection: IStageSection;
}
