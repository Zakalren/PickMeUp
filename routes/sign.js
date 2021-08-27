import express from 'express'
import passport from 'passport'
import path from 'path'
import fs from 'fs'

import User from '../models/users'

const router = express.Router();

const __dirname = path.resolve();

router.get('/up', (req, res, next) => {
    const { nextURL } = req.query;

    if (req.user) {
        if (nextURL)
            return res.redirect(nextURL);
        else
            return res.redirect('/');
    }

    res.render('signup');
});

router.post('/up', async (req, res, next) => {
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

router.get('/in', (req, res, next) => {
    const { nextURL } = req.query;
    const ua = req.header('user-agent');

    if (req.user) {
        if (nextURL)
            return res.redirect(nextURL);
        else
            return res.redirect('/');
    }

    if (/mobile|iphone|ipod|android|blackberry|opera|mini|windows\sce|palm|smartphone|iemobile|ipad|android|android 3.0|xoom|sch-i800|playbook|tablet|kindle/i.test(ua)) {
        res.render('mobile/signin');
    } else {
        res.render('signin');
    }
});

router.post('/in', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/sign/in'
}));

router.get('/out', (req, res, next) => {
    if (!req.user)
        return res.status(500).send('login first');

    req.logout();
    res.redirect('/');
})

export default router;