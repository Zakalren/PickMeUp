let loginedProfileSection = [
	document.querySelector(".logined-user__avatar"),
	document.querySelector(".logined-user__information"),
	document.querySelector(".logined-user__information--account-information"),
	document.querySelector(".account-information__name"),
	document.querySelector(".account-information__modify"),
	document.querySelector(".logined-user__id"),
	document.querySelector(".logined-user__bank-account")
];

let unloginedProfileSection = [document.querySelector(".logined-user__unlogined")];

let user = null;


const VIEW_FILTER_CLASS = "unvisible";

function showUserData() {
	loginedProfileSection[3].innerText = user.name;
	loginedProfileSection[5].innerText = user.service_number;
}

function viewController(hideArray, showArray) {
	for (let i = 0; i < hideArray.length; i++) {
		hideArray[i].classList.add(VIEW_FILTER_CLASS);
	}

	for (let j = 0; j < showArray.length; j++) {
		showArray[j].classList.remove(VIEW_FILTER_CLASS);
	}
}

function checkLogIn() {
	ajaxTemplate('GET', '/user/me', null, function() {}, function(responseText) {
		user = JSON.parse(responseText);
	});

	if (user !== null) {
		return true;
	} else {
		return false;
	}
}

function showScreen() {
	if (checkLogIn()) {
		viewController(unloginedProfileSection, loginedProfileSection);
		showUserData();
	} else {
		viewController(loginedProfileSection, unloginedProfileSection);
	}
}

function init() {
	showScreen();
}

init();
