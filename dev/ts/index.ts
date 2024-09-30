import { ComponentTypes } from './component-types.enum.js';
import { Engine } from './engine.class.js';
import { Stage } from './stage.class.js';

import { AppearanceComponent } from './components/appearance.class.js';
import { CameraConfigComponent } from './components/camera-config.class.js';
import { KeyboardComponent } from './components/keyboard.class.js';
import { MovementComponent } from './components/movement.class.js';
import { PositionComponent } from './components/position.class.js';

import { CameraSystem } from './systems/camera.class.js';
import { KeyboardSystem } from './systems/keyboard.class.js';
import { MovementSystem } from './systems/movement.class.js';

const engine = new Engine({
	targetFps: 30,
});

//
engine.systems.add(new KeyboardSystem(engine));
engine.systems.add(new MovementSystem(engine));
engine.systems.add(new CameraSystem(engine));

//
engine.currentStage = new Stage(1200, 300);

// Player
const playerId = ((entities) => {
	const entityId = entities.create();
	entities.addComponent(entityId, ComponentTypes.appearance, new AppearanceComponent(32, 64));
	entities.addComponent(entityId, ComponentTypes.keyboard, new KeyboardComponent());
	entities.addComponent(entityId, ComponentTypes.movement, new MovementComponent());
	entities.addComponent(entityId, ComponentTypes.position, new PositionComponent(128, 128));
	return entityId;
})(engine.entities);

// Camera
((entities, playerId) => {
	const entityId = entities.create();
	entities.addComponent(entityId, ComponentTypes.cameraConfig, new CameraConfigComponent(playerId));
	entities.addComponent(entityId, ComponentTypes.position, new PositionComponent(128, 128));
	return entityId;
})(engine.entities, playerId);

// Other
((entities) => {
	const entityId = entities.create();
	entities.addComponent(entityId, ComponentTypes.appearance, new AppearanceComponent(32, 64, 'blue'));
	entities.addComponent(entityId, ComponentTypes.position, new PositionComponent(480, 128));
	return entityId;
})(engine.entities);

//
document.body.appendChild(engine.surface);

//
engine.resize(window.innerWidth, window.innerHeight);
engine.start();

//
window.addEventListener(
	'resize',
	() => engine.resize(window.innerWidth, window.innerHeight),
	{ passive: true }
);
