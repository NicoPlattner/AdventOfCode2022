const {readFileSync, promises: fsPromises} = require('fs');

function main() {
	const file = readFileSync('../input/input_day_10.in', 'utf-8');
	let operations = file.split('\n').map(line => line.split(' '));
	operations.pop();

	const screen = [];

	for (let i = 0; i <= 200; i+=40) {
		let currentRow = '';

		for (let j = 1; j <= 40; j++) {
			const registerValue = getRegisterValueAt(i + j, operations);

			if(j-1 >= registerValue - 1 && j-1 <= registerValue + 1) {
				currentRow += '#';
			} else {
				currentRow += '.';
			}
		}

		screen.push(currentRow);
	}

	console.log(screen);
}

function getRegisterValueAt(targetCycle, operations) {
	let registerValue = 1;
	let cycleCount = 0;
	let operationCount = 0;

	while(cycleCount < targetCycle) {
		const currentOperation = operations[operationCount];

		if(currentOperation[0] === 'noop') {
			cycleCount++;
		} else if(currentOperation[0] === 'addx') {
			if(cycleCount + 2 < targetCycle) {
				registerValue += parseInt(currentOperation[1]);
			}
			cycleCount += 2;
		}

		operationCount++;
	}

	return registerValue;
}

main();
