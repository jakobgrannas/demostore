document.onload = init();

function init () {
	var submitBtn = document.getElementById('subscribe-btn');
	submitBtn.addEventListener('click', setLoading);
}

/**
 * Work-around only to showcase the loader message. Would otherwise
 * be implemented in an AJAX function
 */
function setLoading (e) {
	/*
	 * Stop default click behavior, since this is only for demonstration.
	 * We're not actually submitting anything anywhere
	 */
	e.preventDefault() ? e.preventDefault() : e.stopPropagation();

	var msg = "Subscribing...",
	    event = e;

	showAlert('loading', msg);

	setTimeout(function () {
		subscribe(event);
	}, 400);
}

function subscribe (e) {
	var me = e.target;
	var msg = '',
	    val = me.parentNode.querySelector('#email').value;

	if (/[a-z0-9!#$%&'*+/=?^_`{|}~.-]+@[a-z0-9-]+(\.[a-z0-9-]+)*/.test(val)) {
		msg = 'You are now subscribed to our newsletter. Thank you!';
		showAlert('success', msg);
	}
	else {
		msg = 'Please enter a valid email address';
		showAlert('error', msg);
	}
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