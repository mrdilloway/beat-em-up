import { Trapezoid } from './trapezoid.class.js';

export class Stage {
	readonly width: number;
	readonly height: number;
	readonly boundingTrapezoid

	/****/
	constructor(width: number, height: number) {
		//
		this.width = width;
		this.height = height;

		//
		this.boundingTrapezoid = new Trapezoid(width, height);
	}
}
