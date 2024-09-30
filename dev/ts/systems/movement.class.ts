import { AbstractSystem } from './system.abstract.js';
import { ComponentTypes } from '../component-types.enum.js';
import { AppearanceComponent } from '../components/appearance.class.js';
import { MovementComponent } from '../components/movement.class.js';
import { PositionComponent } from '../components/position.class.js';

export class MovementSystem extends AbstractSystem {
	/****/
	update(deltaTime: number): void {
		//
		this.entities
			.filter(s => this.entities.hasComponent(s, ComponentTypes.appearance))
			.filter(s => this.entities.hasComponent(s, ComponentTypes.movement))
			.filter(s => this.entities.hasComponent(s, ComponentTypes.position))
			.forEach(entityId => {
				//
				const appearanceComponent = this.entities.getComponent(entityId, ComponentTypes.appearance) as AppearanceComponent;
				const movementComponent = this.entities.getComponent(entityId, ComponentTypes.movement) as MovementComponent;
				const positionComponent = this.entities.getComponent(entityId, ComponentTypes.position) as PositionComponent;

				//
				const perSecond = deltaTime / 1000;
				const walkSpeed = 200 * perSecond;

				//
				positionComponent.x += (walkSpeed * movementComponent.x);
				positionComponent.y += (walkSpeed * movementComponent.y);

				//
				this.#restrictToStageBounds(positionComponent, appearanceComponent);
			}, this);
	}

	/****/
	#restrictToStageBounds(positionComponent: PositionComponent, appearanceComponent: AppearanceComponent): void {
		if (!this.stage) return;

		const boundingTrapezoid = this.stage.boundingTrapezoid;
		let x = positionComponent.x;
		let y = positionComponent.y;

		y = Math.max(y, 0);
		y = Math.min(y, boundingTrapezoid.height);

		const yy = boundingTrapezoid.height - y;
		x = Math.max(x, boundingTrapezoid.left(yy));
		x = Math.min(x, boundingTrapezoid.right(yy) - appearanceComponent.width);

		positionComponent.y = y;
		positionComponent.x = x;
	}
}
