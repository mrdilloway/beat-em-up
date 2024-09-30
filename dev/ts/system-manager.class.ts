import { AbstractSystem } from './systems/system.abstract.js';

export class SystemManager {
	/****/
	#systems: AbstractSystem[] = [];

	/****/
	add(system: AbstractSystem): void {
		this.#systems.push(system);
	}

	/****/
	update(deltaTime: number): void {
		this.#systems.forEach(o => o.update(deltaTime));
	}
}
