"use strict";

export class LSystem {
	constructor(axiom, rules) {
		this.axiom = axiom;
		this.rules = rules;
		this.zoom = 0.75;
		this.angle = 60;
		this.length = 10;
		this.cache = {};
	}

	set rules(value) {
		const pattern = new RegExp(Object.keys(value).join('|'), 'g');
		const func = replacement => {
			return value[replacement];
		};
		this.apply_pattern = str => str.replace(pattern, func);
	}
	convert(generations) {
		let result = this.axiom;
		for (let g = 0; g < generations; g++) {
			result = this.apply_pattern(result);
		}
		return result;
	}

	set angle(degrees) {
		this.radians = degrees * Math.PI / 180;
	}

	draw(ctx, generations) {
		ctx.save();
		ctx.beginPath();
		ctx.moveTo(0, 0);
		const instructions = this.convert(generations);
		for(const ch of instructions) {
			const r = 1 + (Math.random() - 0.5);
			switch(ch) {
				case "G": 																				// Move without drawing
					ctx.translate(this.length, 0);
					ctx.moveTo(0, 0);
					break;
				case "B":																					// Move back without drawing
					ctx.translate(-this.length, 0);
					ctx.moveTo(0, 0);
					break;
				case "F":																					// Draw a line forward
					ctx.translate(this.length, 0);
					ctx.lineTo(0, 0);
					break;
				case "R":																					// Draw a random line forward
					ctx.translate(this.length * r, 0);
					ctx.lineTo(0, 0);
					break;
				case "+": ctx.rotate(this.radians); break;				// Rotate clockwise
				case "-": ctx.rotate(-this.radians); break;				// Rotate anticlockwise
				case "=": ctx.rotate(this.radians * r); break;				// Rotate clockwise
				case "_": ctx.rotate(-this.radians * r); break;				// Rotate anticlockwise
				case "z": ctx.scale(this.zoom, this.zoom); break;	// Zoom out
				case "[": ctx.save(); break;											// Save context
				case "]": ctx.restore(); ctx.moveTo(0, 0); break;										// Restore context
			}
		}
		ctx.stroke();
		ctx.restore();
	}
}
