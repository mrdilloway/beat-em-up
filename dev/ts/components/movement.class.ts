import { AbstractComponent } from './component.abstract.js';

export class MovementComponent extends AbstractComponent {
	public x: number = 0;
	public y: number = 0;
	public jumping: boolean = false;
}
