import express from 'express'

import Product from '../models/products'
import User from '../models/users'

const router = express.Router();

router.get('/', (req, res, next) => {
    const ua = req.header('user-agent');

    if (/mobile|iphone|ipod|android|blackberry|opera|mini|windows\sce|palm|smartphone|iemobile|ipad|android|android 3.0|xoom|sch-i800|playbook|tablet|kindle/i.test(ua)) {
        if (!req.user)
            return res.redirect('/sign/in');

        res.render('mobile/shoppingbasket', { basket: req.user.shopping_basket, user: req.user });
    } else {
        if (!req.user)
            return res.status(500).send('login first');

        res.render('shoppingbasket', { basket: req.user.shopping_basket, user: req.user });
    }
});

router.post('/add', (req, res, next) => {
    if (!req.user)
        return res.status(500).send('login first');

    const { id, amount } = req.body;

    Product.findById(id, (err, product) => {
        if (err)
            return res.status(500).send(err);

        if (!product)
            return res.status(500).send('invalid product id');

        if (isNaN(amount) || !amount || amount < 1)
            return res.status(500).send('invalid amount');

        product.amount = amount;

        let basket = req.user.shopping_basket;
        basket.push(product);

        User.findByIdAndUpdate(req.user._id, {
            shopping_basket: basket
        }, (err, user) => {
            if (err)
                return res.status(500).send(err);

            return res.json(user);
        });
    });
});

router.post('/update', (req, res, next) => {
    if (!req.user)
        return res.status(500).send('login first');

    let basket = JSON.parse(req.body.basket);
    console.log(basket);

    User.findByIdAndUpdate(req.user._id, {
        shopping_basket: basket
    }, (err, user) => {
        if (err)
            return res.status(500).send(err);

        return res.json(user);
    })
});

export default router;