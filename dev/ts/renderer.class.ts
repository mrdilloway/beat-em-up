import { Engine } from './engine.class.js';
import { ComponentTypes } from './component-types.enum.js';
import { PositionComponent } from './components/position.class.js';
import { AppearanceComponent } from './components/appearance.class.js';
import { Stage } from './stage.class.js';

interface ConstructorParamsInterface {
	targetFps?: number;
	canvasWidth?: number;
	canvasHeight?: number;
};

export class Renderer {
	#engine: Engine;
	#canvasEl: HTMLCanvasElement;
	#context: CanvasRenderingContext2D;

	/****/
	constructor(engine: Engine, params: ConstructorParamsInterface = {}) {
		//
		this.#engine = engine;

		//
		this.#canvasEl = document.createElement('canvas') as HTMLCanvasElement;
		this.resize(params.canvasWidth ?? 640, params.canvasHeight ?? 480);

		//
		this.#context = this.#canvasEl.getContext('2d') as CanvasRenderingContext2D;
	}

	/****/
	render(): void {
		const ctx = this.#context;

		//
		ctx.save();
		ctx.fillStyle = 'black';
		ctx.fillRect(0, 0, this.#canvasEl.width, this.#canvasEl.height);
		ctx.translate(0.5, 0.5);

		//
		this.#centreRendering(ctx);
		this.#applyCamera(ctx);

		//
		this.#renderStage(ctx);
		this.#renderEntities(ctx);

		//
		ctx.restore();
	}

	/****/
	resize(width: number, height: number): void {
		this.#canvasEl.width = width;
		this.#canvasEl.height = height;
	}

	/****/
	get surface(): HTMLCanvasElement {
		return this.#canvasEl;
	}

	/****/
	#centreRendering(ctx: CanvasRenderingContext2D): void {
		const halfWidth = ctx.canvas.width / 2;
		const halfHeight = ctx.canvas.height / 2;
		ctx.translate(halfWidth, halfHeight);
	}

	/****/
	#applyCamera(ctx: CanvasRenderingContext2D): void {
		const entities = this.#engine.entities;

		//
		const entityId = entities
			.filter(s => entities.hasComponent(s, ComponentTypes.cameraConfig))
			.filter(s => entities.hasComponent(s, ComponentTypes.position))
			.find(() => true);

		//
		if (undefined === entityId) return;

		//
		const positionComponent = entities.getComponent(entityId, ComponentTypes.position) as PositionComponent;

		//
		const x = Math.round(positionComponent.x);
		const y = Math.round(positionComponent.y);
		ctx.translate(-x, -y);
	}

	/****/
	#renderStage(ctx: CanvasRenderingContext2D): void {
		// Render the stage
		const stage = this.#engine.currentStage;
		if (stage instanceof Stage) {
			const boundingTrapezoid = stage.boundingTrapezoid;
			const height = boundingTrapezoid.height;

			ctx.fillStyle = 'grey';
			ctx.beginPath();
			ctx.moveTo(boundingTrapezoid.left(height), 0);
			ctx.lineTo(boundingTrapezoid.right(height), 0);
			ctx.lineTo(boundingTrapezoid.right(0), height);
			ctx.lineTo(boundingTrapezoid.left(0), height);
			ctx.closePath();
			ctx.fill();
		}
	}

	/****/
	#renderEntities(ctx: CanvasRenderingContext2D): void {
		const entities = this.#engine.entities;

		//
		entities
			.filter(s => entities.hasComponent(s, ComponentTypes.appearance))
			.filter(s => entities.hasComponent(s, ComponentTypes.position))
			// Sort by Y pos
			.sort((entityIdA, entityIdB) => {
				const positionComponentA = entities.getComponent(entityIdA, ComponentTypes.position) as PositionComponent;
				const positionComponentB = entities.getComponent(entityIdB, ComponentTypes.position) as PositionComponent;
				return (positionComponentA.y > positionComponentB.y) ? 1 : -1;
			})
			// Render each
			.forEach(entityId => {
				//
				const appearanceComponent = entities.getComponent(entityId, ComponentTypes.appearance) as AppearanceComponent;
				const positionComponent = entities.getComponent(entityId, ComponentTypes.position) as PositionComponent;

				//
				ctx.fillStyle = appearanceComponent.colour;
				const x = Math.round(positionComponent.x);
				const y = Math.round(positionComponent.y);
				ctx.fillRect(
					x,
					y - appearanceComponent.height,
					appearanceComponent.width,
					appearanceComponent.height
				);
			});
	}
}
