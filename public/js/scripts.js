document.onload = init();

function init () {
	var submitBtn = document.getElementById('subscribe-btn');
	submitBtn.addEventListener('click', subscribe);
}

function subscribe (e) {
	e.preventDefault();
	e.stopPropagation();
	
	var me = e.target;
	var emailAddress = me.parentNode.querySelector('#email').value;
	
	var data = {
		email: emailAddress
	};
	var successHandler = function (response) {
		if(response.data) {
			showAlert('success', response.data.message);
		}
		else if(response.errorMessage) {
			showAlert('error', response.errorMessage);
		}
	};
	var errorHandler = function () {
		showAlert('error', 'Could not send request :(');
	};
	var beforeSend = function () {
		showAlert('loading', 'Subscribing...');
	};
		
	Ajax.post({
		method: 'POST',
		url: "newsletter/subscribe",
		data: data,
		beforeSend: beforeSend,
		successHandler: successHandler,
		errorHandler: errorHandler
	});
}

function showAlert (className, msg) {
	var el = document.querySelectorAll('.alert.newsletter')[0];

	clearAlertClassList(el);

	el.classList.add(className);
	el.innerHTML = msg;
}

function clearAlertClassList(el) {
	var alertList = ['error', 'success', 'loading'],
		cls;

	for (var i=0; i < alertList.length; i++) {
		cls = alertList[i];
		if(el.classList.contains(cls)) {
			el.classList.remove(cls);
		}
	}
}