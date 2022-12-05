const {readFileSync, promises: fsPromises} = require('fs');

function main() {
	const file = readFileSync('../input/input_day_5.in', 'utf-8');
	const crateBlock = file.split('\n\n')[0];
	const crates = getCrateLists(crateBlock);

	const moveBlock = file.split('\n\n')[1];
	const moves = moveBlock.split('\n');
	moves.pop();

	moves.forEach(move => {
		const amount = parseInt(move.split(' ')[1]);
		const origin = parseInt(move.split(' ')[3]) - 1;
		const destination = parseInt(move.split(' ')[5]) - 1;

		const cratesToBeMoved = [];
		for (let i = 0; i < amount; i++) {
			cratesToBeMoved.push(crates[origin].pop());
		}
		crates[destination] = crates[destination].concat(...cratesToBeMoved.reverse());
	});

	let result = '';
	crates.forEach(stack => {
		result += stack[stack.length - 1];
	});
	console.log(result);

	//
	// const moves = lines.map(line => line.split(' '));
	// let score = 0;
	//
	// moves.forEach(move => {
	//     score += (move[1].charCodeAt() - 88) * 3;
	//     const moveModifier = (move[1].charCodeAt() - 89);
	//     const myMove = (move[0].charCodeAt() + moveModifier - 62) % 3 + 1
	//     score += myMove;
	// });
	//
	// console.log(score)
}

function getCrateLists(crateBlock) {
	const lines = crateBlock.split('\n');
	const crates = [];

	for (let i = lines.length - 2; i >= 0; i--) {
		const line = lines[i];

		let count = 0;
		for (let j = 1; j < line.length; j += 4) {
			if(crates[count] === undefined) {
				crates[count] = [];
			}
			if(line[j] !== ' ') {
				crates[count].push(line[j]);
			}
			count++;
		}
	}

	return crates;
}

main();
