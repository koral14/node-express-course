const { readFile, writeFile } = require('fs')

writeFile(
    './temporary/fileD.txt', 
    'This is first line',
    (err, result) => {
        if (err) {
            console.log(err)
            return
        } 
        console.log('done with this task');
    }
    )
    .then(() => {
        return writeFile('./temporary/fileD.txt', 'This is second line', {flag: 'a'})
    })
    .then(() => {
        return writeFile('./temporary/fileD.txt', 'This is third line', {flag: 'a'})
    })
    .then(() => {
        return readFile('./temporary/fileD.txt', 'utf-8', (err, result) => {
            if (err) {
                console.log(err);
                return
            }
            const resultFile = result
        })
    })
    .then(() => {
        console.log(`this is the result from THEN: ${resultFile}`);
    })
    .catch((error) => {
        console.log("An error occured: ", error);
    })
