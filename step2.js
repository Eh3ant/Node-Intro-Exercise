const process = require('process');
const fs = require('fs');
const axios = require('axios')

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

async function webCat(url) {
    try {
        let response = await axios.get(url);
        console.log(response.data)
    } catch (e) {
        console.log(`Error fetchinghttp" ${url}:${e}`)
        process.exit(1);
    }
}

let path = process.argv[2]

if (path.startsWith('http://') || path.startsWith('https://')) {
    webCat(path)
} else {
    cat(path)
}