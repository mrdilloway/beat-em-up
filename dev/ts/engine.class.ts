import { EntityManager } from './entity-manager.class.js';
import { KeyboardManager } from './keyboard-manager.class.js';
import { SystemManager } from './system-manager.class.js';

export class Engine {
	readonly #entityManager: EntityManager;
	readonly #keyboardManager: KeyboardManager;
	readonly #systemManager: SystemManager;

	#rafId: number = 0;
	#previousTicks: number = 0;

	#targetFps: number = 1;
	#frameDelay: number = 1000;
	#frameDelta: number = 0;

	/****/
	constructor() {
		this.#entityManager = new EntityManager();
		this.#keyboardManager = new KeyboardManager();
		this.#systemManager = new SystemManager();

		this.targetFps = 1;

		window.addEventListener('keydown', this.#handleKeyDown.bind(this));
		window.addEventListener('keyup', this.#handleKeyUp.bind(this));
	}

	/****/
	start(): boolean {
		// Fail if already started
		if (0 < this.#rafId) return false;

		// Reset loop values
		this.#previousTicks = window.performance.now();
		this.#frameDelta = 0;

		// Request the next loop
		this.#rafId = window.requestAnimationFrame(this.#loop.bind(this));

		// Done
		return true;
	}

	/****/
	stop(): boolean {
		// Fail if not already started
		if (0 === this.#rafId) return false;

		// Cancel the pending loop
		window.cancelAnimationFrame(this.#rafId);
		this.#rafId = 0;

		// Done
		return true;
	}

	/****/
	#loop(currentTicks: number): void {
		// Increase frame delta
		this.#frameDelta += currentTicks - this.#previousTicks;
		this.#previousTicks = currentTicks;

		//
		while (this.#frameDelta >= this.#frameDelay) {
			this.#frameDelta -= this.#frameDelay;
			this.#update(this.#frameDelay);
		}

		//
		this.#render();

		if (0 < this.#rafId) {
			this.#rafId = window.requestAnimationFrame(this.#loop.bind(this));
		}
	}

	/****/
	#update(delta: number): void {
		this.#systemManager.update(delta);
	}

	/****/
	#render(): void {
		// console.log('render');
	}

	/****/
	#handleKeyDown(event: KeyboardEvent): void {
		this.#keyboardManager.handleKeyDown(event.code);
	}

	/****/
	#handleKeyUp(event: KeyboardEvent): void {
		this.#keyboardManager.handleKeyUp(event.code);
	}

	/****/
	get targetFps(): number {
		return this.#targetFps;
	}

	/****/
	set targetFps(value: number) {
		value = Math.round(value);
		value = Math.max(1, value);
		value = Math.min(60, value);

		this.#targetFps = value;
		this.#frameDelay = 1000 / this.#targetFps;
	}

	/****/
	get entities(): EntityManager {
		return this.#entityManager;
	}

	/****/
	get systems(): SystemManager {
		return this.#systemManager;
	}

	/****/
	get keyboard(): KeyboardManager {
		return this.#keyboardManager;
	}
}
