import { AbstractComponent } from './components/component.abstract.js';
import { ComponentTypes } from './component-types.enum.js';

export class EntityManager {
	/****/
	#entities: Map<string, Map<ComponentTypes, AbstractComponent>> = new Map();

	/****/
	create(): string {
		const entityId = this.#uuid();
		this.#entities.set(entityId, new Map());
		return entityId;
	}

	/****/
	addComponent(entityId: string, type: ComponentTypes, component: AbstractComponent): boolean {
		if (!this.#entities.has(entityId)) return false;
		this.#entities.get(entityId)!.set(type, component);
		return true;
	}

	/****/
	hasComponent(entityId: string, type: ComponentTypes): boolean {
		if (!this.#entities.has(entityId)) return false;
		return this.#entities.get(entityId)!.has(type);
	}

	/****/
	filter(callback: (arg: string) => boolean): string[] {
		return [...this.#entities.keys()].filter(callback);
	}

	/****/
	#uuid(): string {
		let i: number = 0;
	    let u: string = '';

	    while (i++ < 36) {
	        const c = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'[i-1]
			const r = Math.random() * 16 | 0
			const v = (c == 'x') ? r : (r & 0x3 | 0x8);
	        u += (c == '-' || c=='4' ) ? c : v.toString(16);
	    }

	    return u;
	}
}
