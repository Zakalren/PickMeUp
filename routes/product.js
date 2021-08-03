const express = require('express');
const router = express.Router();

const Products = require('../models/products');

// create product
router.post('/', (req, res, next) => {
    const { name, image, price } = req.body;
    const products = new Products({
        name: name,
        image: image,
        price: price
    });

    products.save((err, product) => {
        res.json(product);
    });
});

// view product
router.get('/:id', (req, res, next) => {
    Products.findById(req.params.id, (err, product) => {
        res.json(product);
    });
});

// update product
router.put('/:id', (req, res, next) => {
    let name, image, price;

    Products.findById(req.params.id, (err, product) => {
        name, image, price = product;
    });

    name = req.body.name ? req.body.name : name;
    image = req.body.image ? req.body.image : image;
    price = req.body.price ? req.body.price : price;

    Products.findOneAndUpdate({ _id: req.params.id }, {
        name: name,
        image: image,
        price: price
    }, (err, product) => {
        if (err)
            return res.status(500).send(err);

        return res.json(product);
    });
});

// delete product
router.delete('/:id', (req, res, next) => {
    Products.findOneAndDelete({ _id: req.params.id }, (err, product) => {
        if (err)
            return res.status(500).send(err);

        return res.json(product);
    });
});

module.exports = router;
