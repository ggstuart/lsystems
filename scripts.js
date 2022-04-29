// "use strict";
import { KochCurve } from './kochcurve.js';
import { Snowflake } from './snowflake.js';
import { Sierpinski } from './sierpinski.js';
import { Tree } from './tree.js';

const examples = [
	{
		"title": "Koch Curve",
		"obj": new KochCurve(3),
		"description": "The Koch curve is a fractal based on a line. Each line is given an additional central square. This is applied to each face fractally.",
		"controls": [{'id': 'generations', 'min': 0, 'max': 5, 'type': 'range'}]
	},
	{
		"title": "Snowflake",
		"obj": new Snowflake(4),
		"description": "The snowflake is a fractal based on a triangle. Each side of the triangle is given an additional central peak. This is applied to each face fractally.",
		"controls": [{'id': 'generations', 'min': 0, 'max': 5, 'type': 'range'}]
	},
	{
		"title": "Sierpinski Triangle",
		"obj": new Sierpinski(6),
		"description": "The Sierpinski Triangle is a fractal based on a single line. Much like the snowflake, the line is given an additional central peak. Each line is divided into three segments which alternate from left to right. This is applied to each line fractally.",
		"controls": [
			{'id': 'generations', 'min': 0, 'step': 2, 'max': 8, 'type': 'range'},
		]
	},
	{
		"title": "Tree",
		"obj": new Tree(125, 20, 0.75, 10, true),
		"description": "The tree is a fractal based on a forking design. Each prong of the fork has a further fork added. This is applied to each prong fractally.",
		"controls": [
			{'id': 'generations', 'min': 0, 'max': 14, 'type': 'range'},
			{'id': 'angle', 'min': 0, 'max': 90, 'type': 'range'},
			{'id': 'length', 'min': 0, 'max': 400, 'type': 'range'},
			{'id': 'zoom', 'min': 0.25, 'max': 1, 'step': 0.01, 'type': 'range'},
			{'id': 'randomise', 'type': 'checkbox'}
		]
	}
]

function add_control(obj, control) {
	const system = obj.obj;
	const input = document.createElement('input');
	const label = document.createElement('label');
	const div = document.createElement('div');
	div.classList.add('control');
	input.type = control.type;
	input.id = `${obj.title.toLowerCase().replace(" ", "_")}_${control.id}`;
	label.for = input.id;
	switch(input.type) {
		case "range":
			input.max = control.max;
			input.min = control.min;
			input.step = control.step || 1;
			input.value = system[control.id];
			label.textContent = `${control.id} (${input.value}): `;
			input.addEventListener('input', ev => {
				system[control.id] = parseFloat(input.value);
				label.textContent = `${control.id} (${system[control.id]}): `;
				system.draw();
			});
			break;
		case "checkbox":
			input.checked = system[control.id];
			label.textContent = control.id;
			input.addEventListener('input', ev => {
				system[control.id] = input.checked;
				system.draw();
			});
	}
	div.append(label, input);
	return div;
}

for (const example of examples) {
	const section = document.createElement("section");
	const div = document.createElement("div");
	const h2 = document.createElement("h2");
	const a = document.createElement("a");
	const p = document.createElement("p");
	const controls = document.createElement("div");
	section.id = example.title.toLowerCase().replace(' ', '_');
	a.textContent = example.title;
	a.href = `#${section.id}`;
	p.textContent = example.description;
	div.classList.add("description");
	h2.append(a);
	div.append(h2, p, controls);

	const system = example.obj;
	for (const id of example.controls) {
		const control = add_control(example, id);
		controls.append(control);
	}
	section.append(system.canvas, div);
	target.appendChild(section);
	system.draw();
}

window.addEventListener('scroll', ev => {
	totop.classList.toggle('hidden', window.scrollY < 200);
})

window.examples = examples;
