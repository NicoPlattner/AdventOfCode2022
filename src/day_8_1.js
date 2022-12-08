const {readFileSync, promises: fsPromises} = require('fs');

function main() {
	const file = readFileSync('../input/input_day_8.in', 'utf-8');
	let grid = file.split('\n').map(line => line.split(''));
	grid.pop();

	let seenCount = 0;

	grid.forEach((row, x) => {
		row.forEach((col, y) => {
			if(checkIfTreeSeen(grid, x, y)) {
				seenCount++;
			}
		});
	});

	console.log(seenCount);
}

function checkIfTreeSeen(grid, x, y) {
	let seenFromLeft = true;
	let seenFromRight = true;
	let seenFromTop = true;
	let seenFromBottom = true;

	for (let i = 0; i < x; i++) {
		if(grid[i][y] >= grid[x][y]) {
			seenFromLeft = false;
		}
	}

	for (let i = x + 1; i < grid.length; i++) {
		if(grid[i][y] >= grid[x][y]) {
			seenFromRight = false;
		}
	}

	for (let i = 0; i < y; i++) {
		if(grid[x][i] >= grid[x][y]) {
			seenFromTop = false;
		}
	}

	for (let i = y + 1; i < grid[0].length; i++) {
		if(grid[x][i] >= grid[x][y]) {
			seenFromBottom = false;
		}
	}

	return seenFromLeft || seenFromRight || seenFromTop || seenFromBottom;
}

main();
