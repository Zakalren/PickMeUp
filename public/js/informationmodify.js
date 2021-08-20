let changeAvatar = document.querySelector(".informationmodify--change-avatar");
let changePassword = document.querySelector(".informationmodify--password-change");
let changeMobilePhoneNumber = document.querySelector(".informationmodify--mobile-phone-number-change");
let changeAccountLink = document.querySelector(".informationmodify--account-link-change");

function changePasswordOnclickEventHandler(event) {
	event.preventDefault();
	const newPassword = prompt("새 비밀번호");
	if (newPassword === null || newPassword === undefined) {
		return;
	}
	const passwordCheck = prompt("비밀번호 확인");
	if (passwordCheck === null || passwordCheck === undefined) {
		return;
	}
	if (newPassword !== passwordCheck) {
		alert("비밀번호가 일치하지 않습니다.");
		return;
	}
	alert("비밀번호가 변경되었습니다.");
}


function changeMobilePhoneNumberOnClickEventHandler(event) {
	event.preventDefault();
	const newPhoneNumber = prompt("새 번호 입력");
	if (newPhoneNumber === null || newPhoneNumber === undefined) {
		return;
	}
	alert("휴대폰 번호가 변경되었습니다.");
}


function init() {
	changePassword.addEventListener("click", changePasswordOnclickEventHandler);
	changeMobilePhoneNumber.addEventListener("click", changeMobilePhoneNumberOnClickEventHandler);
}

init();
