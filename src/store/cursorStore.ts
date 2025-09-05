// stores/CursorStore.ts
import { makeAutoObservable } from "mobx";

export class CursorStore {
	isHovering = false;
	size = 10;
	hoverSize = 20;
	showText = false;
	text = "Смотреть";

	constructor() {
		makeAutoObservable(this);
	}

	enterHover(showText: boolean = false, text: string = "Смотреть") {
		this.isHovering = true;
		this.showText = showText;
		this.text = text;
	}

	leaveHover() {
		this.isHovering = false;
		this.showText = false;
		this.text = "Смотреть";
	}

	get currentSize() {
		return this.isHovering ? this.hoverSize : this.size;
	}

	setCustomHover(size: number) {
		this.hoverSize = size;
	}

	resetHover() {
		this.hoverSize = 30;
		this.showText = false;
		this.text = "Смотреть";
	}
}

export const cursorStore = new CursorStore();
