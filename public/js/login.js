const form = document.querySelector(".login--form");
const id = document.querySelector(".login--id");
const pw = document.querySelector(".login--password");
const loginButton = document.querySelector(".login--title");


function makeLogInJSON(service_number_string, password_string) {
	return JSON.stringify({
		service_number: service_number_string,
		password: password_string
	});
}

function submitEventHandler(event) {
	event.preventDefault();
	const service_number = id.value;
	const password = pw.value;
	const submitData = makeLogInJSON(service_number, password);
	alert(submitData);
	ajaxTemplate('POST', '/user/signin', submitData, function() {}, function() {});
}

function init() {
	form.addEventListener("submit", submitEventHandler);
	loginButton.addEventListener("click", submitEventHandler);
}

init();
