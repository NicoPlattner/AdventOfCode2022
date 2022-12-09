const {readFileSync, promises: fsPromises} = require('fs');

function main() {
	const file = readFileSync('../input/input_day_9.in', 'utf-8');
	let steps = file.split('\n').map(line => line.split(' '));
	steps.pop();

	const head = { x: 0, y: 0 };
	const knots = [];
	const visited = {};

	for (let i = 0; i < 10; i++) {
		knots.push({ x: 0, y: 0 });
	}

	steps.forEach(step => {
		const stepSize = parseInt(step[1]);

		for (let i = 0; i < stepSize; i++) {
			moveHead(head, step[0]);

			knots.forEach((knot, count) => {
				const previous = count === 0 ? head : knots[count - 1];

				if(!areNeighbours(previous, knot)) {
					moveKnot(knot, previous);
				}
			});

			if(!visited[knots[8].x]) {
				visited[knots[8].x] = new Set();
			}

			visited[knots[8].x].add(knots[8].y);
		}
	});

	const visitedCount = Object.keys(visited).reduce((acc, key) => acc + visited[key].size, 0);

	console.log(visitedCount);
}

function moveHead(head, step) {
	switch(step) {
		case 'L':
			head.x--;
			break;
		case 'R':
			head.x++;
			break;
		case 'D':
			head.y++;
			break;
		case 'U':
			head.y--;
			break;
	}
}

function areNeighbours(head, tail) {
	return Math.abs(head.x - tail.x) <= 1 && Math.abs(head.y - tail.y) <= 1;
}

function moveKnot(knot, previous) {
	if(previous.x > knot.x) {
		knot.x++;
	}
	if(previous.x < knot.x) {
		knot.x--;
	}
	if(previous.y > knot.y) {
		knot.y++;
	}
	if(previous.y < knot.y) {
		knot.y--;
	}
}

main();
