const process = require('process');
const fs = require('fs');
const axios = require('axios');

function cat(path, out) {
    fs.readFile(path, 'utf8', (e, data) => {
        if (e) {
            console.error(`Error reading ${path}: ${e}`);
            process.exit(1);
        } else {
            handleOutput(data, out);
        }
    });
}

async function webCat(url, out) {
    try {
        let response = await axios.get(url);
        handleOutput(response.data, out);
    } catch (e) {
        console.error(`Error fetching ${url}: ${e}`);
        process.exit(1);
    }
}

function handleOutput(data, out) {
    if (out) {
        fs.writeFile(out, data, 'utf8', e => {
            if (e) {
                console.error(`Couldn't write ${out}: ${e}`);
                process.exit(1);
            }
        });
    } else {
        console.log(data);
    }
}

let out;
let path;

if (process.argv[2] === '--out') {
    out = process.argv[3];
    path = process.argv[4];
} else {
    path = process.argv[2];
}

if (path.startsWith('http://') || path.startsWith('https://')) {
    webCat(path, out);
} else {
    cat(path, out);
}


