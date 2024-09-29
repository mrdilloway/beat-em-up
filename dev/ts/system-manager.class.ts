import { AbstractSystem } from './systems/system.abstract.js';

export class SystemManager {
	/****/
	#systems: AbstractSystem[] = [];

	/****/
	add(system: AbstractSystem): void {
		this.#systems.push(system);
	}

	/****/
	update(delta: number): void {
		this.#systems.forEach(o => o.update(delta));
	}
}
