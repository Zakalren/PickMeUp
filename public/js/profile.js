const informationModifyButton = document.querySelector(".information__information-modify");

function rightPasswordProcess() {
	location.replace("informationmodify.html");
}

function checkPassword(password) {
	if (password === null || password === undefined) {
		return;
	}

	rightPasswordProcess();
}

function informationModifyButtonOnClickEventHandler(event) {
	event.preventDefault();
	const accept = confirm("개인정보를 변경하시겠습니까?");
	if (accept) {
		const password = prompt("비밀번호를 입력하시오.");
		checkPassword(password);
	}
}

function init() {
	informationModifyButton.addEventListener("click", informationModifyButtonOnClickEventHandler);
}

init();
