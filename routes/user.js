import express from 'express'
import passport from 'passport'
import User from '../models/users'

const router = express.Router();

// Sign-up
router.post('/signup', async (req, res, next) => {
    const { service_number, password, name, affiliated_unit, rank, date_of_birth, tel_number } = req.body;

    try {
        const user = await User({ service_number, name, affiliated_unit, rank, date_of_birth, tel_number });

        await User.register(user, password);

        res.redirect('/');
    }
    catch (error) {
        console.log(error);
        res.redirect('/');
    }
});

// Sign-in
router.post('/signin', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/signin'
}));

// Sign-out
router.post('/signout', (req, res, next) => {
    req.logout();
    res.redirect('/');
})

// Get current profile
router.get('/me', (req, res, next) => {
    res.json(req.user);
});

export default router;