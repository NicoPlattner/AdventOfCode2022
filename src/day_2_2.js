const {readFileSync, promises: fsPromises} = require('fs');

function main() {
    const file = readFileSync('../input/input_day_2.in', 'utf-8');
    const lines = file.split('\n');
    const moves = lines.map(line => line.split(' '));
    let score = 0;

    moves.forEach(move => {
        score += (move[1].charCodeAt() - 88) * 3;
        const moveModifier = (move[1].charCodeAt() - 89);
        const myMove = (move[0].charCodeAt() + moveModifier - 62) % 3 + 1
        score += myMove;
    });

    console.log(score)
}

main()