const express = require('express');
const app = express();
const peopleRouter = require('./routes/people.js')
const cookieParser = require('cookie-parser')

console.log('Express Tutorial')

const logger = (req, res, next) => {
    const method = req.method;
    const url = req.url;
    const time = new Date().getFullYear();
    console.log("this is the logger: ", method, url);
    next();
};

app.use('/api/v1/test', logger);

app.use(express.static('./methods-public'));

app.get('/api/v1/test', (req, res) => {
    res.json({message: 'It worked'});
})

app.get('/api/v1/products', (req, res) => {
    res.json(products);
})

// parsing form data and json
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser())
app.use('/api/v1/people', peopleRouter)

const auth = (req, res, next) => {
    const name = req.cookies.name
    if (!name) {
        return res.status(401).json({ message: 'Unauthorized' })
    } else {
        req.user = name
        next()
    }
}
// ====================== Optional Additional Assignment 
app.post('/logon', (req, res) => {
    const { name } = req.body;

    if (!name) {
        return res.status(400).json({ message: 'Please add a valid name' })
    } else {
        res.cookie('name', name)
        res.status(201).json({message: `<h1>Hello ${name}!</h1>`})
    }
})

app.delete('/logoff', (req, res) => {
    res.clearCookie('name')
    res.status(200).json({ message: 'The user is logged off!' })
})

app.get('/test', auth, (req, res) => {
    res.status(200).json({ message: `Welcome, ${req.user}!` });
  });
// ==================================

app.post('/login', (req, res) => {
    console.log(req.body);
    res.send('POST')
})

app.get('/api/v1/products/:productID', logger, (req, res) => {
    const {productID} = req.params;
    const idToFind = Number(productID);
    const product = products.find(p => p.id = idToFind);
    if (!product) {
        return res.status(404).send('<h1>Product not found!!!</h1>')
    }
    res.status(201).json({});
});

app.get('/api/v1/query', (req, res) => {
    const { search, limit, newSearch, priceSearch } = req.query;
    let sortedProducts = [...products];
    if (search) {
        sortedProducts = sortedProducts.filter((product) => {
            return product.name.startsWith(search)
        });
    }
    if (newSearch) {
        return res.status(200).send(`<h1>You searched for the "${newSearch.toUpperCase()}" word!!!</h1>`)
    }
    if (priceSearch) {
        sortedProducts = sortedProducts.filter((product) => {
            return product.price < priceSearch;
        })
    }
    if (limit) {
        sortedProducts = sortedProducts.slice(0, parseInt(limit));
    }
    if (sortedProducts.length < 1) {
        return res.status(200).json({ success: true, data: [] });
    }
    res.status(200).json(sortedProducts)
})

app.all('*', (req, res) => {
    res.status(404).send('<h1>resource not found</h1>')
})

app.listen(3000, () => {
    console.log('server is listening on port 3000...');
}); 