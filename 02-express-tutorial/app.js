console.log('Express Tutorial')

const express = require('express');
const app = express();
const { products } = require('./data')

app.use(express.static('./public'));

app.get('/api/v1/test', (req, res) => {
    res.json({message: 'It worked'});
})

app.get('/api/v1/products', (req, res) => {
    res.json(products);
})

app.get('/api/v1/products/:productID', (req, res) => {
    const {productID} = req.params;
    const idToFind = Number(productID); //because this will be a string but we need an integer
    const product = products.find(p => p.id = idToFind);
    if (!product) {
        return res.status(404).send('<h1>Product not found!!!</h1>')
    }
    res.json(product);
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
        sortedProducts = sortedProducts.slice(0, Number(limit));
    }
    if (sortedProducts.length < 1) {
        return res.status(200).json({success: true, data: []});
    }
    res.status(200).json(sortedProducts)
})

app.all('*', (req, res) => {
    res.status(404).send('<h1>resource not found</h1>')
})

app.listen(3000, () => {
    console.log('server is listening on port 5000...');
});