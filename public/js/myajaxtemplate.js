function ajaxTemplate(method, domain, parameter, setEventHandler, processData) {
	let httpRequest;

	setEventHandler(makeRequest);

	function makeRequest() {
		httpRequest = new XMLHttpRequest();
		if (!httpRequest) {
			return false;
		}
		httpRequest.addEventListener("readystatechange", processResponseData);
		httpRequest.open(method, domain);

		httpRequest.setRequestHeader('Content-Type', 'application/json');
		httpRequest.setRequestHeader('Cache-Control', 'no-cache');

		httpRequest.send(parameter);
	}

	function processResponseData() {
		try {
			if (httpRequest.readyState !== XMLHttpRequest.DONE ||
					httpRequest.status !== 200) {
				return false;
			}
			processData(httpRequest.responseText);
		} catch (error) {
			console.log(e.description);
		}
	}
}
