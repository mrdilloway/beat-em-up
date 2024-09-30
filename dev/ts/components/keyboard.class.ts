import { AbstractComponent } from './component.abstract.js';

export class KeyboardComponent extends AbstractComponent {
	public left: string = 'KeyA';
	public right: string = 'KeyD';
	public up: string = 'KeyW';
	public down: string = 'KeyS';
	public jump: string = 'Space';
}
