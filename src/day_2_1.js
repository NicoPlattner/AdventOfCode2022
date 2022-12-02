const {readFileSync, promises: fsPromises} = require('fs');

function main() {
    const file = readFileSync('../input/input_day_2.in', 'utf-8');
    const lines = file.split('\n');
    const moves = lines.map(line => line.split(' '));
    let score = 0;

    moves.forEach(move => {
        score += move[1].charCodeAt() - 87;

        if ((move[1].charCodeAt() - 88) === (move[0].charCodeAt() - 65)) {
            score += 3;
        } else if ((move[1].charCodeAt() - 88) % 3 === (move[0].charCodeAt() - 64) % 3) {
            score += 6;
        }
    });

    console.log(score)
}

main()