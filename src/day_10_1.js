const {readFileSync, promises: fsPromises} = require('fs');

function main() {
	const file = readFileSync('../input/input_day_10.in', 'utf-8');
	let operations = file.split('\n').map(line => line.split(' '));
	operations.pop();

	let sum = 0;
	for (let i = 20; i <= 220; i+=40) {
		sum += getRegisterValueAt(i, operations) * i;
	}

	console.log(sum);
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
