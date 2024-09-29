import { AbstractSystem } from './system.abstract.js';
import { ComponentTypes } from '../component-types.enum.js';

export class KeyboardSystem extends AbstractSystem {
	/****/
	update(_delta: number): void {
		this.entities
			.filter(s => this.entities.hasComponent(s, ComponentTypes.keyboard))
			.forEach(this.#updateOne, this);
	}

	/****/
	#updateOne(_entityId: string): void {
		// console.log(entityId);
	}
}
