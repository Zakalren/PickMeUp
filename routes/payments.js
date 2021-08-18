import express from 'express'
import axios from 'axios'

const router = express.Router();

// called when the payment is complete.
router.post('/complete', async (req, res, next) => {
    try {
        const { imp_uid, merchant_uid } = req.body;

        const getToken = await axios({
            url: 'https://api.iamport.kr/users/getToken',
            method: 'post',
            headers: { 'Content-Type': 'applications/json' },
            data: {
                imp_key: 'imp_apikey', // api key
                imp_secret: 'secret' // secret key
            }
        });

        const access_token = getToken.data.response;

        const getPaymentData = await axios({
            url: `https://api.iamport.kr/payments/${imp_uid}`,
            method: 'get',
            headers: { 'Authorization': access_token }
        });

        const paymentData = getPaymentData.data.response;

        const order = await Orders.findById(paymentData.merchant_uid);
        const amountToBePaid = order.amount;

        const { amount, status } = paymentData;
        if (amount == amountToBePaid) {
            await Orders.findByIdAndUpdate(merchant_uid, { $set: paymentData });

            switch (status) {
                case 'paid':
                    res.send('결제 성공');
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