const { writeFile, readFile } = require('fs'); 
console.log("at start");   
writeFile('./temporary/fileB.txt', 
    // line 1
    'This is line 1\n', (err, result) => {     
        console.log("at point 1");
        if(err) {           
        console.log("This error happened: ", err);     
        } else {       
            // line 2   
            writeFile('./temporary/fileB.txt', 
            'This is line 2\n', { flag: 'a' }, (err, result) => {     
                console.log("at point 2");
                if(err) {           
                    console.log("This error happened: ", err);     
                } else {      
                    // line 3      
                    writeFile('./temporary/fileB.txt', 
                    'This is line 3\n', { flag: 'a' }, (err, result) => {     
                        console.log("at point 3");
                        if(err) {           
                            console.log("This error happened: ", err);   
                        } else {
                            // line 4
                            readFile('./content/first.txt', 'utf-8', (err, result) => {
                                console.log("at point 4");
                                if(err) {
                                    console.log("This error happened: ", err);  
                                    return;
                                } else {
                                    const fourth = result;
                                    writeFile(
                                        './temporary/fileB.txt',
                                        `${fourth}\r\n`,
                                        { flag: 'a' },
                                        (err, result) => {
                                            console.log("at point 5");
                                            if(err) {
                                                console.log(err);
                                                return;
                                            } else {
                                                // line 5
                                                readFile('./content/second.txt', 'utf-8', (err, result) => {
                                                    console.log("at point 6");
                                                    if(err) {
                                                        console.log('this error happened: ', err);
                                                        return;
                                                    } else {
                                                        const fifth = result;
                                                        writeFile(
                                                            './temporary/fileB.txt',
                                                            `${fifth}`,
                                                            { flag: 'a' },
                                                            (err, result) => {
                                                                console.log("at point 7");
                                                                if(err) {
                                                                    console.log(err);
                                                                    return;
                                                                } 
                                                                // log the result out
                                                                console.log(result);
                                                            }
                                                        )
                                                    }
                                                })
                                            }
                                        }
                                    )
                                }
                            })
                        }
                    }) 
                }
            })
        // console.log('at point 8');
        }
    // console.log('at point 9');
    }
)  
console.log('at end'); 
