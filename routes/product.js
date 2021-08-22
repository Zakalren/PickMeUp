import express from 'express'
import Products from '../models/products'
import Users from '../models/users'

const router = express.Router();

// get products list
router.get('/list', (req, res, next) => {
    Products.find({}, (err, products) => {
        if (err)
            return res.status(500).send(err);

        return res.json(products);
    });
});

router.get('/list/:category', (req, res, next) => {
    Products.find({ category: req.params.category }, (err, products) => {
        if (err)
            return res.status(500).send(err);

        return res.render('products', { category: req.params.category, products: products, user: req.isAuthenticated() });
    });
});

// create product
router.post('/create', (req, res, next) => {
    const { name, image, price, category } = req.body;
    const products = new Products({
        name: name,
        image: image,
        price: price,
        category: category
    });

    products.save((err, product) => {
        if (err)
            return res.status(500).send(err);

        return res.json(product);
    });
});

// view product
router.get('/:id', (req, res, next) => {
    Products.findById(req.params.id, (err, product) => {
        if (err)
            return res.status(500).send(err);

        return res.render('product_page', { product: product, user: req.user });
    });
});

// update product
router.put('/update/:id', (req, res, next) => {
    let name, image, price, category;

    Products.findById(req.params.id, (err, product) => {
        if (err)
            return res.status(500).send(err);

        name, image, price, category = product;
    });

    name = req.body.name ? req.body.name : name;
    image = req.body.image ? req.body.image : image;
    price = req.body.price ? req.body.price : price;
    category = req.body.category ? req.body.category : category;

    Products.findByIdAndUpdate(req.params.id, {
        name: name,
        image: image,
        price: price,
        category: category
    }, (err, product) => {
        if (err)
            return res.status(500).send(err);

        return res.json(product);
    });
});

// delete product
router.delete('/delete/:id', (req, res, next) => {
    Products.findByIdAndDelete(req.params.id, (err, product) => {
        if (err)
            return res.status(500).send(err);

        return res.json(product);
    });
});

export default router;
