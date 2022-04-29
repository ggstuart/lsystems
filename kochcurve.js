import { LSystem } from './lsystem.js'

export class KochCurve {
	constructor(generations) {
		this.canvas = document.createElement('canvas');
		this.canvas.width = 400;
		this.canvas.height = 400;
		this.ctx = this.canvas.getContext("2d");
		this.ctx.strokeStyle = "white";
		this.lSystem = new LSystem('F', {"F": "F-F+F+F-F"});
		this.lSystem.angle = 90;
		this.start_length = 350;
		this.generations = generations;
	}

	draw() {
		let length = this.start_length;
		for(let i=0; i<this.generations; i++) {
			length /= 3
		}
		this.lSystem.length = length;
		this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
		this.ctx.save();
		this.ctx.translate(25, 275);
		this.ctx.moveTo(0, 0);
		this.lSystem.draw(this.ctx, this.generations);
		this.ctx.restore();
	}
}
