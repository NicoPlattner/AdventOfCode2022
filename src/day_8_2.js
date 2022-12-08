const {readFileSync, promises: fsPromises} = require('fs');

function main() {
	const file = readFileSync('../input/input_day_8.in', 'utf-8');
	let grid = file.split('\n').map(line => line.split(''));
	grid.pop();

	let maxScenicScore = 0;

	grid.forEach((row, x) => {
		row.forEach((col, y) => {
			const scenicScore = getScenicScoreAtPosition(grid, x, y);

			if(scenicScore > maxScenicScore) {
				maxScenicScore = scenicScore;
			}
		});
	});

	console.log(maxScenicScore);
}

function getScenicScoreAtPosition(grid, x, y) {
	let scenicScoreLeft = 0;
	let scenicScoreRight = 0;
	let scenicScoreTop = 0;
	let scenicScoreBottom = 0;

	for (let i = x-1; i >= 0; i--) {
		if(grid[i][y] < grid[x][y]) {
			scenicScoreLeft++;
		}
		if(grid[i][y] >= grid[x][y]) {
			scenicScoreLeft++;
			break;
		}
	}

	for (let i = x + 1; i < grid.length; i++) {
		if(grid[i][y] < grid[x][y]) {
			scenicScoreRight++;
		}
		if(grid[i][y] >= grid[x][y]) {
			scenicScoreRight++;
			break;
		}
	}

	for (let i = y-1; i >= 0; i--) {
		if(grid[x][i] < grid[x][y]) {
			scenicScoreTop++;
		}
		if(grid[x][i] >= grid[x][y]) {
			scenicScoreTop++;
			break;
		}
	}

	for (let i = y + 1; i < grid[0].length; i++) {
		if(grid[x][i] < grid[x][y]) {
			scenicScoreBottom++;
		}
		if(grid[x][i] >= grid[x][y]) {
			scenicScoreBottom++;
			break;
		}
	}

	return scenicScoreLeft * scenicScoreRight * scenicScoreTop * scenicScoreBottom;
}

main();
