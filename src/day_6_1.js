const {readFileSync, promises: fsPromises} = require('fs');

function main() {
	const file = readFileSync('../input/input_day_6.in', 'utf-8');
	const data = file.split('\n')[0];

	for (let i = 0; i < data.length - 3; i++) {
		const potentialMarker = data.substring(i, i + 4);
		const uniqueCount = new Set(potentialMarker).size;
		if (uniqueCount === 4) {
			console.log(i+4);
			break;
		}
	}
}

main();
