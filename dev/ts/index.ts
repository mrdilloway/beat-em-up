import { Engine } from './engine.class.js';
import { KeyboardComponent } from './components/keyboard.class.js';
import { PositionComponent } from './components/position.class.js';
import { KeyboardSystem } from './systems/keyboard.class.js';
import { ComponentTypes } from './component-types.enum.js';

const engine = new Engine();

//
engine.systems.add(new KeyboardSystem(engine));

//
((entities) => {
	//
	const entityId = entities.create();

	//
	entities.addComponent(entityId, ComponentTypes.position, new PositionComponent());
	entities.addComponent(entityId, ComponentTypes.keyboard, new KeyboardComponent());

	//
	return entityId;
})(engine.entities);

//
engine.start();
