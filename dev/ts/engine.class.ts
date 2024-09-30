import { EntityManager } from './entity-manager.class.js';
import { KeyboardManager } from './keyboard-manager.class.js';
import { SystemManager } from './system-manager.class.js';
import { Renderer } from './renderer.class.js';
import { Stage } from './stage.class.js';

interface ConstructorParamsInterface {
	targetFps?: number;
	canvasWidth?: number;
	canvasHeight?: number;
};

export class Engine {
	readonly #entityManager: EntityManager;
	readonly #keyboardManager: KeyboardManager;
	readonly #systemManager: SystemManager;
	readonly #renderer: Renderer;

	#rafId: number = 0;
	#previousTicks: number = 0;

	#targetFps: number = 1;
	#frameDelay: number = 1000;
	#frameDelta: number = 0;

	#currentStage?: Stage;

	/****/
	constructor(params: ConstructorParamsInterface = {}) {
		//
		this.targetFps = params.targetFps ?? 60;

		//
		this.#entityManager = new EntityManager();
		this.#keyboardManager = new KeyboardManager();
		this.#systemManager = new SystemManager();

		//
		this.#renderer = new Renderer(
			this,
			(({ canvasWidth, canvasHeight }) => ({ canvasWidth, canvasHeight }))(params)
		);

		//
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
	resize(width: number, height: number): void {
		this.#renderer.resize(width, height);
	}

	/****/
	#loop(currentTicks: number): void {
		// Increase frame deltaTime
		this.#frameDelta += currentTicks - this.#previousTicks;
		this.#previousTicks = currentTicks;

		//
		while (this.#frameDelta >= this.#frameDelay) {
			this.#frameDelta -= this.#frameDelay;
			this.#update(this.#frameDelay);
			this.#render();
		}

		if (0 < this.#rafId) {
			this.#rafId = window.requestAnimationFrame(this.#loop.bind(this));
		}
	}

	/****/
	#update(deltaTime: number): void {
		this.#systemManager.update(deltaTime);
	}

	/****/
	#render(): void {
		this.#renderer.render();
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

	/****/
	get surface(): HTMLCanvasElement {
		return this.#renderer.surface;
	}

	/****/
	get currentStage(): Stage|undefined {
		return this.#currentStage;
	}

	/****/
	set currentStage(stage: Stage) {
		this.#currentStage = stage;
	}
}
