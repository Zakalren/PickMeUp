import express from 'express'

import User from '../models/users'

const router = express.Router();

// Get current profile
router.get('/', (req, res, next) => {
    if (!req.user)
        return res.status(500).send('login first');

    return res.render('profile', { user: req.user });
});

router.get('/edit', (req, res, next) => {
    if (!req.user)
        return res.status(500).send('login first');

    return res.render('edit_profile', { user: req.user });
});

router.post('/edit', (req, res, next) => {
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

export default router;