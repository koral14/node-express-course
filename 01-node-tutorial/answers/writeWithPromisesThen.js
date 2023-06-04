const { readFile, writeFile } = require('fs').promises

writeFile('./temporary/fileD.txt', 'This is first line')
.then(() => {
    console.log('1');
    return writeFile('./temporary/fileD.txt', '\nThis is second line\n', {flag: 'a'})
})
.then(() => {
    console.log('2');
    return writeFile('./temporary/fileD.txt', 'This is third line\n', {flag: 'a'})
})
.then(() => {
    console.log('3');
    return readFile('./temporary/fileD.txt', 'utf-8', (err, result) => {
        if (err) {
            console.log(err);
            return
        } else {
            return result;
        }
    })
})
.then((result) => {
    console.log('4');
    console.log(`This is the result from THEN cascading: \n${result}`);
})
.catch((error) => {
    console.log("An error occured: ", error);
})
