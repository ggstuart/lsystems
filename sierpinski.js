import { LSystem } from './lsystem.js'

export class Sierpinski {
	constructor(generations) {
		this.canvas = document.createElement('canvas');
		this.canvas.width = 800;
		this.canvas.height = 800;
		this.ctx = this.canvas.getContext("2d");
		this.ctx.strokeStyle = "white";
		this.lSystem = new LSystem('XF', {
			"Y": "XF-YF-X",
			"X": "YF+XF+Y"
		});
		this.lSystem.angle = 60;
		this.length = 650;
		this.generations = generations;
	}

	draw() {
		let length = this.length;
		for(let i=0; i<this.generations; i++) {
			length /= 2
		}
		this.lSystem.length = length;
		this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
		this.ctx.save();
		this.ctx.translate(75, 600);
		this.ctx.moveTo(0, 0);
		this.lSystem.draw(this.ctx, this.generations);
		this.ctx.restore();
	}
}
