import { AbstractSystem } from './system.abstract.js';
import { ComponentTypes } from '../component-types.enum.js';
import { AppearanceComponent } from '../components/appearance.class.js';
import { CameraConfigComponent } from '../components/camera-config.class.js';
import { PositionComponent } from '../components/position.class.js';

export class CameraSystem extends AbstractSystem {
	/****/
	update(_deltaTime: number): void {
		// Find the camera entity
		const cameraEntityId = this.entities.find(
			entityId => this.entities.hasComponents(
				entityId,
				[ComponentTypes.cameraConfig, ComponentTypes.position]
			)
		);

		// Abort if no camera was found
		if (undefined === cameraEntityId) return;

		// Get the "camera" component from the camera entity
		const cameraConfigComponent = this.entities.getComponent(
			cameraEntityId, ComponentTypes.cameraConfig
		) as CameraConfigComponent;

		// Get the "position" component from the camera entity
		const cameraPositionComponent = this.entities.getComponent(
			cameraEntityId, ComponentTypes.position
		) as PositionComponent;

		//
		const targetEntityId = cameraConfigComponent.targetId;
		const targetHasComps = this.entities.hasComponents(
			targetEntityId,
			[ComponentTypes.position]
		);
		if (!targetHasComps) return;

		// Get the "position" component from the target entity
		const targetPositionComponent = this.entities.getComponent(
			targetEntityId, ComponentTypes.position
		) as PositionComponent;

		// Move the camera
		cameraPositionComponent.x = targetPositionComponent.x;
		cameraPositionComponent.y = targetPositionComponent.y;

		// Centre on the target
		if (this.entities.hasComponent(targetEntityId, ComponentTypes.appearance)) {
			const appearanceComponent = this.entities.getComponent(
				targetEntityId, ComponentTypes.appearance
			) as AppearanceComponent;

			cameraPositionComponent.x += appearanceComponent.width / 2;
			cameraPositionComponent.y -= appearanceComponent.height / 2;
		}
	}
}
