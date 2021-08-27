let submitButton = document.querySelector(".submit-button");

function onSubmitEventHandler(event) {
	event.preventDefault();

	if (!signed) {
		alert('먼저 로그인 해주세요.');
		window.location = '/sign/in';
		return;
	}

	let password = document.querySelector('[name=password]').value;
	let tel_number = document.querySelector('[name=tel_number]').value;
	let new_password = document.querySelector('[name=new_password]').value;
	let new_password_check = document.querySelector('[name=new_password_check]').value;
	let avatarFile = document.querySelector('[name=avatarFile]').value;

	if (new_password != new_password_check) {
		alert('새 비밀번호와 비밀번호 확인이 일치하지 않습니다.');
		return;
	}

	if (avatarFile) {
		let form = $('#uploadAvatar')[0];
		let data = new FormData(form);

		$.ajax({
			type: 'post',
			url: '/upload/avatar',
			data: data,
			processData: false,
			contentType: false,
			cache: false,
			timeout: 600000,
			success: function (res) {
				console.log(res);
			},
			error: function (err) {
				alert('이미지 업로드가 실패했습니다.');
			},
			async: false
		});
	}

	$.ajax({
		type: 'post',
		url: '/profile/edit',
		data: {
			'password': password,
			'tel_number': tel_number,
			'new_password': new_password,
			'new_password_check': new_password_check,
		},
		success: function (data) {
			alert('성공적으로 변경되었습니다.');
			window.location = '/';
		},
		error: function (err) {
			console.log('error', err);
		}
	});
}


function init() {
	submitButton.addEventListener("click", onSubmitEventHandler);
}

function readFile(input) {
	if (input.files && input.files[0]) {
		let reader = new FileReader();

		reader.onload = function (e) {
			$('.change-avatar_image')
				.css('background-image', `url(${e.target.result})`)
				.width(150)
				.height(200);
		};

		reader.readAsDataURL(input.files[0]);
	}
}

init();
