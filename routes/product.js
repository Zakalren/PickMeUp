import express from 'express'

import Product from '../models/products'

const router = express.Router();

// get products list
router.get('/list/:category', (req, res, next) => {
    Product.find({ category: req.params.category }, (err, products) => {
        if (err)
            return res.status(500).send(err);

        const ua = req.header('user-agent');

        if (/mobile|iphone|ipod|android|blackberry|opera|mini|windows\sce|palm|smartphone|iemobile|ipad|android|android 3.0|xoom|sch-i800|playbook|tablet|kindle/i.test(ua)) {
            return res.render('mobile/products', { category: req.params.category, products: products, user: req.isAuthenticated() });
        } else {
            return res.render('products', { category: req.params.category, products: products, user: req.isAuthenticated() });
        }
    });
});

// create product
router.post('/create', (req, res, next) => {
    const { name, image, price, category } = req.body;
    const product = new Product({
        name: name,
        image: image,
        price: price,
        category: category
    });

    product.save((err, p) => {
        if (err)
            return res.status(500).send(err);

        return res.json(p);
    });
});

// view product
router.get('/:id', (req, res, next) => {
    Product.findById(req.params.id, (err, product) => {
        if (err)
            return res.status(500).send(err);

        Product.find({ category: product.category }, (err, products) => {
            if (err)
                return res.status(500).send(err);

            const ua = req.header('user-agent');

            if (/mobile|iphone|ipod|android|blackberry|opera|mini|windows\sce|palm|smartphone|iemobile|ipad|android|android 3.0|xoom|sch-i800|playbook|tablet|kindle/i.test(ua)) {
                return res.render('mobile/product_page', { product: product, user: req.user, category_products: products });
            } else {
                return res.render('product_page', { product: product, user: req.user, category_products: products });
            }
        });
    });
});

// update product
router.put('/update/:id', (req, res, next) => {
    let name, image, price, category;

    Product.findById(req.params.id, (err, product) => {
        if (err)
            return res.status(500).send(err);

        name, image, price, category = product;
    });

    name = req.body.name ? req.body.name : name;
    image = req.body.image ? req.body.image : image;
    price = req.body.price ? req.body.price : price;
    category = req.body.category ? req.body.category : category;

    Product.findByIdAndUpdate(req.params.id, {
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
    Product.findByIdAndDelete(req.params.id, (err, product) => {
        if (err)
            return res.status(500).send(err);

        return res.json(product);
    });
});

export default router;
