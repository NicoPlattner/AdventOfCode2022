const {readFileSync, promises: fsPromises} = require('fs');

function main() {
	const file = readFileSync('../input/input_day_7.in', 'utf-8');
	let commandBlocks = file.split('$').map(line => line.trim()).map(line => line.split('\n'));
	const fileSystem = {};

	fileSystem['/'] = {};
	commandBlocks = commandBlocks.slice(2);
	let currentDirectory = fileSystem['/'];
	let currentDirectoryPath = '/';
	const folders = [];

	commandBlocks.forEach(commandBlock => {
		if(commandBlock[0].startsWith('cd')) {
			const argument = commandBlock[0].split(' ')[1];

			if(argument === '..') {
				const parent = getParentFolder(fileSystem, currentDirectoryPath);
				currentDirectory = parent[0];
				currentDirectoryPath = parent[1];
			} else {
				currentDirectory = currentDirectory[argument];
				currentDirectoryPath += argument + '/';
			}
		} else if(commandBlock[0].startsWith('ls')) {
			for (let i = 1; i < commandBlock.length; i++) {
				const dirOrSize = commandBlock[i].split(' ')[0];
				const name = commandBlock[i].split(' ')[1];

				if(dirOrSize === 'dir') {
					currentDirectory[name] = {};
					folders.push(currentDirectory[name]);
				} else {
					currentDirectory[name] = parseInt(dirOrSize);
				}
			}
		}
	});

	console.log(folders.map(folder => getFolderSize(folder)).filter(size => size < 100000).reduce((a, b) => a + b));
}

function getParentFolder(fileSystem, currentDirectoryPath) {
	const pathParts = currentDirectoryPath.split('/');
	let tempFolder = fileSystem['/'];
	let tempFolderPath = '/';

	for (let i = 1; i < pathParts.length - 2; i++) {
		tempFolder = tempFolder[pathParts[i]];
		tempFolderPath += pathParts[i] + '/';
	}

	return [tempFolder, tempFolderPath];
}

function getFolderSize(folder) {
	let size = 0;

	for (const key in folder) {
		if(folder[key] instanceof Object) {
			size += getFolderSize(folder[key]);
		} else {
			size += folder[key];
		}
	}

	return size;
}

main();
