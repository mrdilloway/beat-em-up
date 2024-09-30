import { AbstractComponent } from './component.abstract.js';

export class PositionComponent extends AbstractComponent {
	constructor(
		public x: number = 0,
		public y: number = 0
	) {
		super();
	}
}
