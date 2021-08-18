import express from 'express'
import passport from 'passport'
import User from '../models/users'
import Products from '../models/products'

const router = express.Router();

// Sign-up
router.post('/signup', async (req, res, next) => {
    const { service_number, password, name, affiliated_unit, rank, date_of_birth, tel_number } = req.body;

    try {
        const user = await User({ service_number, name, affiliated_unit, rank, date_of_birth, tel_number });

        await User.register(user, password);

        res.redirect('/');
    }
    catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
});

// Sign-in
router.post('/signin', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/signin'
}));

// Sign-out
router.get('/signout', (req, res, next) => {
    if (!req.user)
        return res.status(500).send('login first');

    req.logout();
    res.redirect('/');
})

// Get current profile
router.get('/me', (req, res, next) => {
    if (!req.user)
        return res.status(500).send('login first');

    res.json(req.user);
});

// add to basket
router.post('/add_to_basket', (req, res, next) => {
    if (!req.user)
        return res.status(500).send('login first');

    Products.findById(req.body.id, (err, product) => {
        if (err)
            return res.status(500).send(err);

        if (!product)
            return res.status(500).send('invalid product id');

        product.amount = req.body.amount;

        let basket = req.user.shopping_basket;
        basket.push(product);

        Users.findOneAndUpdate({ _id: req.user._id }, {
            shopping_basket: basket
        }, (err, user) => {
            if (err)
                return res.status(500).send(err);

            return res.json(user);
        });
    });
});

// update basket
router.post('/update_basket', (req, res, next) => {
    if (!req.user)
        return res.status(500).send('login first');

    let basket = req.body.basket;

    Users.findOneAndUpdate({ _id: req.user._id }, {
        shopping_basket: basket
    }, (err, user) => {
        if (err)
            return res.status(500).send(err);

        return res.json(user);
    })
});

export default router;