function add_to_basket(id, amount) {
    if (!signed) {
        alert('먼저 로그인 해주세요.');
        return;
    }

    if (isNaN(amount) || !amount || amount < 1) {
        alert('상품 개수에 올바른 숫자를 입력해주세요.');
        return;
    }

    $.ajax({
        method: 'post',
        url: '/basket/add',
        data: {
            id: id,
            amount: amount
        },
        success: function (data) {
            let move = confirm('장바구니에 상품을 담았습니다. 장바구니로 이동할까요?');

            if (move) {
                window.location = '/basket';
                return;
            }
        },
        error: function (err) {
            console.log(err);
            alert('에러가 발생했습니다.');
        }
    });
}