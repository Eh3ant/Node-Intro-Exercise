const process = require('process');

const fs = require('fs');

function cat(path) {
    fs.readFile(path, 'utf8', (e, data) => {
        if (e) {
            console.log(`Error reading ${path}: ${e}`)
            process.exit(1);
        } else {
            console.log(data)
        }
    })
}

cat(process.argv[2]);


