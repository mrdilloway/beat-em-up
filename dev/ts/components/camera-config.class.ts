import { AbstractComponent } from './component.abstract.js';

export class CameraConfigComponent extends AbstractComponent {
	constructor(
		public targetId: string = '',
	) {
		super();
	}
}
