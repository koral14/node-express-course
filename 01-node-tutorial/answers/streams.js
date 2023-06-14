const { createReadStream } = require('fs');

// by default the size of the buffer is 64kb
// last buffer - remainder
// highWaterMark - control size

const readStream = createReadStream('../content/big.txt', { 
    highWaterMark: 200, 
    encoding: 'utf-8' 
});

let counter = 0;

readStream.on('data', (result) => {
    counter += 1;
    console.log(result);
})

readStream.on('end', () => {
    console.log(`This is the end of the stream. There are ${counter} chunks.`)
})

readStream.on('error', (err) => console.log(err))



