export class Trapezoid {
	readonly width: number;
	readonly height: number;

	/****/
	constructor(
		width: number,
		height: number
	) {
		this.width = width;
		this.height = height;
	}

	/****/
	left(y: number): number {
		const leftBottom = 0;
		const leftTop = this.height;
		return leftBottom + (y / this.height) * (leftTop - leftBottom);
	}

	/****/
	right(y: number): number {
		const rightBottom = this.width;
		const rightTop = this.width - this.height;
		return rightBottom + (y / this.height) * (rightTop - rightBottom);
	}
}
