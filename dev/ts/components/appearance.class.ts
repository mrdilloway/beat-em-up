import { AbstractComponent } from './component.abstract.js';

export class AppearanceComponent extends AbstractComponent {
	constructor(
		public width: number = 32,
		public height: number = 32,
		public colour: string = 'white'
	) {
		super();
	}
}
