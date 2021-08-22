import express from 'express'
import passport from 'passport'
import User from '../models/users'
import Products from '../models/products'
import fs from 'fs'
import path from 'path'

const router = express.Router();

const __dirname = path.resolve();

// Sign-up
router.post('/signup', async (req, res, next) => {
    const { service_number, password, password_check, name, affiliated_unit, rank, date_of_birth, tel_number } = req.body;

    if (password != password_check)
        return res.status(500).send('password does not match password check');

    try {
        const user = await User({ service_number, name, affiliated_unit, rank, date_of_birth, tel_number, avatarUrl: 'images/avatar/' + service_number + '.jpeg' });

        await User.register(user, password);

        fs.copyFileSync(path.join(__dirname, 'public/images/avatar.png'), path.join(__dirname, 'public/images/avatar/' + service_number + '.jpeg'));

        passport.authenticate('local', {
            successRedirect: '/',
            failureRedirect: '/user/signin'
        })(req, res, next);
    }
    catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
});

router.get('/signup', (req, res, next) => {
    if (req.user)
        return res.status(500).send('already signed');

    res.render('signup');
});

// Sign-in
router.post('/signin', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/user/signin'
}));

router.get('/signin', (req, res, next) => {
    if (req.user)
        return res.status(500).send('already signed');

    res.render('signin');
});

// Sign-out
router.get('/signout', (req, res, next) => {
    if (!req.user)
        return res.status(500).send('login first');

    req.logout();
    res.redirect('/');
})

// Get current profile
router.get('/profile', (req, res, next) => {
    if (!req.user)
        return res.status(500).send('login first');

    res.render('profile', { user: req.user });
});

router.get('/profile/edit', (req, res, next) => {
    if (!req.user)
        return res.status(500).send('login first');

    res.render('edit_profile', { user: req.user });
});

router.post('/profile/edit', (req, res, next) => {
    if (!req.user)
        return res.status(500).send('login first');

    const { new_password, new_password_check, tel_number, password, avatarUrl } = req.body;

    if (new_password != new_password_check)
        return res.status(500).send('password does not match password check');

    User.findById(req.user._id, (err, user) => {
        if (err)
            return res.status(500).send(err);
        else {
            user.authenticate(password, async (err, model, passwordErr) => {
                if (err)
                    return res.status(500).send(err);

                if (passwordErr)
                    return res.status(500).send('the given password is not correct');
                else if (model) {
                    if (new_password) {
                        await user.setPassword(new_password);
                    }

                    if (tel_number) {
                        user.tel_number = tel_number;
                    }

                    if (avatarUrl) {
                        user.avatarUrl = avatarUrl;
                    }

                    await user.save();
                    return res.status(200).send('update profile successful');
                }
            });
        }
    });
});

router.get('/basket', (req, res, next) => {
    if (!req.user)
        return res.status(500).send('login first');

    res.render('shoppingbasket', { basket: req.user.shopping_basket });
});

// add to basket
router.post('/add_to_basket', (req, res, next) => {
    if (!req.user)
        return res.status(500).send('login first');

    const { id, amount } = req.body;

    Products.findById(id, (err, product) => {
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

// update basket
router.post('/update_basket', (req, res, next) => {
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