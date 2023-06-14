console.log('Express Tutorial')

const express = require('express');
const app = express();

// app.get('/', (req, res) => {
//     console.log('user hit the resource');
//     res.send('Home page test')
// })

// app.get('/about', (req, res) => {
//     console.log('test about');
//     res.send('about page')
// })

app.use(express.static('./public'));

app.all('*', (req, res) => {
    res.status(404).send('<h1>resource not found</h1>')
})

app.listen(3000, () => {
    console.log('server is listening on port 5000...');
});

  

//Edit app.js to add all the elements of an Express application as listed above, in the right order. 
// The basic elements of an express program are as follows:

// The require statement for express
// Creation of the app as returned from express()
// app.use statements for the middleware. You’ll eventually use many kinds of middleware, but for now the only middleware we are using is express.static().
// app.get and app.post statements for the routes you will handle. Eventually these will be refactored into router modules, but for now you can put them inline.
// An app.all statement after these to handle page not found conditions.
// An app.listen statement

//Edit app.js to add all the elements of an Express application as listed above, in the right order. 
//You won’t have any app.get or app.post statements yet.
//You should have the statement app.use(express.static(‘./public’)) 
//so that your HTML file will load. 
//Use port 3000 in the listen statement.

//app.get - not this one
//app.post - not this one
//app.put
//app.delete
//app.all
//app.use *
//app.listen