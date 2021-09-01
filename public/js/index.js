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


const VIEW_FILTER_CLASS = "invisible";

function showUserData() {
	if (user.avatarUrl)
		loginedProfileSection[0].style.backgroundImage = `url(${user.avatarUrl})`;
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
	let result = false;

	$.ajax({
		type: 'get',
		url: '/profile',
		success: function (data) {
			result = true;
			console.log("success", data);
		},
		error: function (err) {
			result = false;
			console.log("failed", err);
		},
		async: false
	});

	return result;
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
	fitShoppingBagHeight();
}

init();
