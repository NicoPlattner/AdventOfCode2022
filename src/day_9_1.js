const {readFileSync, promises: fsPromises} = require('fs');

function main() {
	const file = readFileSync('../input/input_day_9.in', 'utf-8');
	let steps = file.split('\n').map(line => line.split(' '));
	steps.pop();

	const head = { x: 0, y: 0 };
	const tail = { x: 0, y: 0 };
	const visited = {};

	steps.forEach(step => {
		const stepSize = parseInt(step[1]);

		for (let i = 0; i < stepSize; i++) {
			moveHead(head, step[0]);

			if(!areNeighbours(head, tail)) {
				moveTail(tail, head);

			}
			if(!visited[tail.x]) {
				visited[tail.x] = new Set();
			}

			visited[tail.x].add(tail.y);
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

function moveTail(tail, head) {
	if(head.x > tail.x) {
		tail.x++;
	}
	if(head.x < tail.x) {
		tail.x--;
	}
	if(head.y > tail.y) {
		tail.y++;
	}
	if(head.y < tail.y) {
		tail.y--;
	}
}

main();
