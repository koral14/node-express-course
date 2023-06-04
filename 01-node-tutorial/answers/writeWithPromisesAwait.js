const { writeFile, readFile } = require('fs').promises

// writes 3 lines to a file
const writer = async () => {
    const firstLine = 'This is first line';
    const secondLine = 'This is second line';
    const thirdLine = 'This is third line';
    try {
        await writeFile('./temporary/fileC.txt', 
            `This is the result: \n${firstLine}, \n${secondLine}, \n${thirdLine}.\n`,
            { flag: 'a' }
        )
    }
    catch(error) {
        console.log(error);
    }
}

const reader = async () => {
    try {
        const resultFile = await readFile('./temporary/fileC.txt', 'utf-8');
        console.log(`This is the result: ${resultFile}`);
    }
    catch(error) {
        console.log(error);
    }
}

const readWrite = async () => {
    await reader();
    await writer();
}
readWrite();