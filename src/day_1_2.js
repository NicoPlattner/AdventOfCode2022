const {readFileSync, promises: fsPromises} = require('fs');

function main() {
    const file = readFileSync('../input/input_day_1.in', 'utf-8');
    const blocks = file.split('\n\n');
    const inventories = blocks.map(block => block.split('\n').map(item => parseInt(item)));
    const caloricCount = inventories.map(inventory => inventory.reduce((acc, item) => acc + item, 0));
    const calorieSumsOrdered = caloricCount.sort((a, b) => a > b ? -1 : 1);
    const topThree = calorieSumsOrdered.slice(0, 3);
    const sumOfTopThree = topThree.reduce((acc, item) => acc + item, 0);

    console.log(sumOfTopThree)
}

main()