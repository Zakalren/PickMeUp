function deleteProducts(index) {
    basket.splice(index, 1);
    console.log(JSON.stringify(basket));
    $.post('update_basket', {
        basket: JSON.stringify(basket)
    }, function (data, status) {
        if (status == 'success')
            window.location.reload();
    });
}

var totalPrice = 0;
basket.forEach(function (product) {
    totalPrice += product.price * product.amount;
});
$('.total-cost__number').text(totalPrice + ' ');