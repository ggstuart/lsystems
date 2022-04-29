import { LSystem } from './lsystem.js'

export class Tree {
	constructor(length, angle, zoom, generations, randomise) {
		this.canvas = document.createElement('canvas');
		this.canvas.width = 800;
		this.canvas.height = 800;
		this.ctx = this.canvas.getContext("2d");
		this.ctx.lineWidth = 2;
		this.ctx.strokeStyle = "white";
		this.randomised = new LSystem('RXY', {
			"X": "[_zRXY]",
			"Y": "[=zRXY]",
		});
		this.normal = new LSystem('FXY', {
			"X": "[-zFXY]",
			"Y": "[+zFXY]",
		});
		this.randomise = randomise;
		this.length = length;
		this.angle = angle;
		this.zoom = zoom;
		this.generations = generations;
	}

	get lSystem() {
		return this.randomise ? this.randomised : this.normal;
	}

	draw() {
		this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
		this.ctx.save();
		this.ctx.translate(400, 400);
		this.ctx.rotate(-Math.PI/2);
		this.ctx.translate(-this.length*2, 0);

		this.lSystem.zoom = this.zoom;
		this.lSystem.angle = this.angle;
		this.lSystem.length = this.length;
		this.lSystem.draw(this.ctx, this.generations);
		this.ctx.restore();
	}
}
