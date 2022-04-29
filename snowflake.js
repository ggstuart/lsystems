import { LSystem } from './lsystem.js'

export class Snowflake {
	constructor(generations) {
		this.canvas = document.createElement('canvas');
		this.canvas.width = 800;
		this.canvas.height = 800;
		this.ctx = this.canvas.getContext("2d");
		this.ctx.strokeStyle = "white";
		this.ctx.lineWidth = 2;
		this.lSystem = new LSystem('F++F++F', {"F": "F-F++F-F"});
		this.lSystem.angle = 60;
		this.start_length = 600;
		this.generations = generations;
	}

	get generations() {
		return this._generations;
	}
	
	set generations(value) {
		this._generations = value;
		this.ctx.lineWidth = value < 2 ? 5 : (value > 3 ? 1 : 2);
	}

	draw() {
		let length = this.start_length;
		for(let i=0; i<this.generations; i++) {
			length /= 3
		}
		this.lSystem.length = length;
		this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
		this.ctx.save();
		this.ctx.translate(100, 225);
		this.ctx.moveTo(0, 0);
		this.lSystem.draw(this.ctx, this.generations);
		this.ctx.restore();
	}
}
