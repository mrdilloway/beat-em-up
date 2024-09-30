export class KeyboardManager {
	#keyDowns = new Set();

	/****/
	handleKeyDown(code: string): void {
		this.#keyDowns.add(code);
	}

	/****/
	handleKeyUp(code: string): void {
		this.#keyDowns.delete(code);
	}

	/****/
	isDown(code: string): boolean {
		return this.#keyDowns.has(code);
	}
}
