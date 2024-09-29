import { Engine } from '../engine.class.js';
import { EntityManager } from '../entity-manager.class.js';
import { KeyboardManager } from '../keyboard-manager.class.js';

export abstract class AbstractSystem {
	/****/
	#engine: Engine;

	/****/
	constructor(engine: Engine) {
		this.#engine = engine;
	}

	/****/
	abstract update(delta: number): void;

	/****/
	protected get entities(): EntityManager {
		return this.#engine.entities;
	}

	/****/
	protected get keyboard(): KeyboardManager {
		return this.#engine.keyboard;
	}
}
