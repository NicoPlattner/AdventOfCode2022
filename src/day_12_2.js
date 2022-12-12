const {readFileSync, promises: fsPromises} = require('fs');

class Node {
	constructor(x, y, g, f, parent) {
		this.x = x;
		this.y = y;
		this.g = g;
		this.f = f;
		this.parent = parent;
	}
}

function main() {
	const file = readFileSync('../input/input_day_12.in', 'utf-8');
	let grid = file.split('\n').map(line => line.split(''));
	grid.pop();

	const start = getPositionOf(grid, 'S');
	grid[start[0]][start[1]] = 'a';

	const lowestPoints = [];
	for (let i = 0; i < grid.length; i++) {
		for (let j = 0; j < grid[i].length; j++) {
			if (grid[i][j] === 'a') {
				lowestPoints.push([i, j]);
			}
		}
	}

	const end = getPositionOf(grid, 'E');

	grid[start[0]][start[1]] = 'a';
	grid[end[0]][end[1]] = 'z';

	let minPathLength = Number.MAX_SAFE_INTEGER;
	lowestPoints.forEach(point => {
		const path = aStar(grid, point, end);
		if (path && path.length-1 < minPathLength) {
			minPathLength = path.length-1;
		}
	});

	console.log(minPathLength);
}

function aStar(grid, start, end) {
	const open = [];
	const closed = [];

	const startNode = new Node(start[1], start[0], 0, 0, null);
	open.push(startNode);

	while (open[0]) {
		const sortedOpen = open.sort((a, b) => a.f - b.f);
		const q = sortedOpen.shift();
		const neighbours = getNeighbours(grid, q.x, q.y).map(n => new Node(n[0], n[1], 0, 0, q));

		for (let i = 0; i < neighbours.length; i++) {
			const neighbour = neighbours[i];
			if (neighbour.x === end[1] && neighbour.y === end[0]) {
				const path = [];
				let current = neighbour;
				while (current.parent) {
					path.push(current);
					current = current.parent;
				}
				path.push(current);
				return path.reverse();
			}
			if (closed.find(n => n.x === neighbour.x && n.y === neighbour.y)) {
				continue;
			}
			if (open.find(n => n.x === neighbour.x && n.y === neighbour.y)) {
				continue;
			}

			const g = q.g + 1;
			const h = Math.abs(neighbour.x - end[0]) + Math.abs(neighbour.y - end[1]);
			neighbour.g = g;
			neighbour.f = g + h;
			open.push(neighbour);
		}

		closed.push(q);
	}
}

function getPositionOf(grid, char) {
	let pos = [];
	for (let i = 0; i < grid.length; i++) {
		for (let j = 0; j < grid[i].length; j++) {
			if (grid[i][j] === char) {
				pos = [i, j];
			}
		}
	}
	return pos;
}

function getNeighbours(grid, x, y) {
	const neighbours = [];

	if(x > 0 && isAtMostOneHigher(x, y, x - 1, y, grid)) {
		neighbours.push([x - 1, y]);
	}
	if(x < grid[0].length-1 && isAtMostOneHigher(x, y, x + 1, y, grid)) {
		neighbours.push([x + 1, y]);
	}
	if(y > 0 && isAtMostOneHigher(x, y, x, y - 1, grid)) {
		neighbours.push([x, y - 1]);
	}
	if(y < grid.length-1 && isAtMostOneHigher(x, y, x, y + 1, grid)) {
		neighbours.push([x, y + 1]);
	}

	return neighbours;
}

function isAtMostOneHigher(x1, y1, x2, y2, grid) {
	return grid[y1][x1].charCodeAt(0) >= grid[y2][x2].charCodeAt(0) - 1;
}


main();
