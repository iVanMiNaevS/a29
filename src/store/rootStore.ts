// stores/RootStore.ts
import { CursorStore } from "./cursorStore";

export class RootStore {
	cursorStore: CursorStore;

	constructor() {
		this.cursorStore = new CursorStore();
	}
}

export const rootStore = new RootStore();
