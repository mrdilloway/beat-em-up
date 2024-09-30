import { AbstractSystem } from './system.abstract.js';
import { ComponentTypes } from '../component-types.enum.js';
import { KeyboardComponent } from '../components/keyboard.class.js';
import { MovementComponent } from '../components/movement.class.js';

export class KeyboardSystem extends AbstractSystem {
	/****/
	update(_deltaTime: number): void {
		this.entities
			.filter(s => this.entities.hasComponent(s, ComponentTypes.movement))
			.filter(s => this.entities.hasComponent(s, ComponentTypes.keyboard))
			.forEach(entityId => {
				//
				const movementComponent = this.entities.getComponent(entityId, ComponentTypes.movement) as MovementComponent;
				const keyboardComponent = this.entities.getComponent(entityId, ComponentTypes.keyboard) as KeyboardComponent;

				//
				movementComponent.x = 0;
				if (this.keyboard.isDown(keyboardComponent.left)) movementComponent.x -= 1;
				if (this.keyboard.isDown(keyboardComponent.right)) movementComponent.x += 1;

				//
				movementComponent.y = 0;
				if (this.keyboard.isDown(keyboardComponent.up)) movementComponent.y -= 1;
				if (this.keyboard.isDown(keyboardComponent.down)) movementComponent.y += 1;
			});
	}
}
