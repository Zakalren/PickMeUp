const form = document.querySelector(".login--form");
const id = document.querySelector(".login--id");
const pw = document.querySelector(".login--password");
const loginButton = document.querySelector(".login--title");

function submitEventHandler(event) {
	const service_number = id.value;
	const password = pw.value;

	event.preventDefault();

	$.post('http://localhost:3000/user/signin', {
		service_number: service_number,
		password: password
	},
		function (data, status) {
			alert(data + status);
		});
}

function init() {
	form.addEventListener("submit", submitEventHandler);
	loginButton.addEventListener("click", submitEventHandler);
}

init();
