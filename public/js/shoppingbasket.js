var totalPrice = 0;
basket.forEach(function (product) {
    totalPrice += product.price * product.amount;
});
$('.total-cost__number').text(totalPrice + ' ');

var IMP = window.IMP;
IMP.init('imp55921996');

function deleteProducts(index, reload) {
    basket.splice(index, 1);
    console.log(JSON.stringify(basket));
    $.ajax({
        method: 'post',
        url: '/basket/update',
        data: {
            basket: JSON.stringify(basket)
        },
        success: function (data) {
            if (reload)
                window.location.reload();
        }
    });
}

function requestPay() {
    let orderId;

    let organizedBasket = [];

    basket.forEach(function (product) {
        organizedBasket.push({
            _id: product._id,
            name: product.name,
            amount: product.amount,
            price: product.price
        });
    });

    $.ajax({
        method: 'post',
        url: '/payments/issue',
        data: {
            items: JSON.stringify(organizedBasket),
            amount: totalPrice
        },
        success: function (data) {
            orderId = data;
        },
        async: false
    });

    IMP.request_pay({
        pg: 'html5_inicis',
        pay_method: 'card',
        merchant_uid: orderId,
        name: 'PickMeUp',
        amount: totalPrice,
        buyer_name: user.name,
        buyer_tel: user.tel_number,
        buyer_email: '',
        m_redirect_url: 'fauxseal.iptime.org:3000/payments/complete/mobile'
    }, function (res) {
        if (res.success) {
            $.ajax({
                method: 'post',
                url: '/payments/complete',
                data: {
                    imp_uid: res.imp_uid,
                    merchant_uid: res.merchant_uid
                },
                success: function (data) {
                    alert('결제가 완료되었습니다.');
                    for (let i = 0; i < basket.length; i++) {
                        deleteProducts(i, false);
                    }
                    window.location.reload();
                },
                error: function (err) {
                    console.log('err', err);
                    alert('결제에 실패했습니다. 에러: ' + res.error_msg + ',' + err);
                }
            });
        }
        else {
            alert('결제에 실패했습니다.');
        }
    });
}