import express from 'express'

import Order from '../models/orders'

const router = express.Router();

router.get('/', (req, res, next) => {
    if (!req.user)
        return res.redirect('/sign/in');

    Order.find({ customer: req.user.service_number, picked: false, complete: true }, (err, orders) => {
        if (err)
            return res.status(500).send(err);

        res.render('reservation', { user: req.user, orders: orders });
    });
});

export default router;