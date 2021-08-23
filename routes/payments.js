import express from 'express'
import axios from 'axios'
import config from '../config'
import Order from '../models/orders'

const router = express.Router();

router.post('/issue', (req, res, next) => {
    if (!req.user)
        return res.status(500).send('login first');

    const { items, amount } = req.body;

    const order = new Order({
        items: JSON.parse(items),
        amount: amount,
        customer: req.user.service_number
    });

    order.save((err, order) => {
        if (err)
            return res.status(500).send(err);

        return res.send(order._id);
    });
});

// called when the payment is complete.
router.post('/complete', async (req, res, next) => {
    try {
        const { imp_uid, merchant_uid } = req.body;

        const getToken = await axios({
            url: 'https://api.iamport.kr/users/getToken',
            method: 'post',
            data: {
                imp_key: config.imp_key, // api key
                imp_secret: config.imp_secret // secret key
            }
        });

        const access_token = getToken.data.response;
        console.log('token', access_token.access_token);

        const getPaymentData = await axios({
            url: `https://api.iamport.kr/payments/${imp_uid}`,
            method: 'get',
            headers: { 'Authorization': access_token.access_token }
        });

        const paymentData = getPaymentData.data.response;
        console.log(paymentData);

        const order = await Order.findById(paymentData.merchant_uid);
        console.log('order', order);
        const amountToBePaid = order.amount;

        const { amount, status } = paymentData;
        if (amount == amountToBePaid) {
            await Order.findByIdAndUpdate(merchant_uid, { $set: paymentData });

            switch (status) {
                case 'paid':
                    return res.send('결제 성공');
                    break;
            }
        }
        else {
            throw { message: '결제 금액이 일치하지 않습니다.' };
        }
    }
    catch (err) {
        res.status(500).send(err);
    }
});

export default router;