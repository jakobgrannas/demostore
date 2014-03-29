/**
 * Extendable ajax class
 * Currently only supports basic POST and GET with fixed headers
 */
var Ajax = (function () {
	var me = {},
	    defaults = {
			method: 'GET',
			url: '',
			data: null,
			headers: {},
			beforeSend: null,
			successHandler: null,
			errorHandler: null
		};
	
	var baseAjax = function (config) {
		var request = new XMLHttpRequest(),
			header,
			headerValue;
		var cfg = _.extend(defaults, config),
			params = me.toQueryParams(cfg.data);

		if(cfg.beforeSend instanceof Function) {
			cfg.beforeSend();
		}

		// Begin AJAX request
		var request = new XMLHttpRequest();
		request.onreadystatechange = function() {
			if (request.readyState === 4) { // Complete
				if(request.status === 200 && cfg.errorHandler instanceof Function) { // Success
					cfg.successHandler(JSON.parse(this.responseText));
				}
				else if(cfg.errorHandler instanceof Function) { // Error
					cfg.errorHandler(JSON.parse(this.responseText));
				}
			}
		};

		request.open(cfg.method, cfg.url, true);

		// Set request headers
		if(cfg.headers) {
			for (header in cfg.headers) {
				headerValue = cfg.headers[header];
				if(cfg.headers.hasOwnProperty(header)) {
					request.setRequestHeader(header, headerValue);
				}
			}
		}
		request.send(params);
	};
	
	me.post = function (config) {
		defaults.method = 'POST';
		defaults.headers = {
			"Content-Type": 'application/x-www-form-urlencoded'
		};
		
		baseAjax(config);
	};
	
	me.get = function (config) {
		baseAjax(config);
	};
	
	me.toQueryParams = function (obj) {
		var str = "";
		for (var key in obj) {
			if(obj.hasOwnProperty(key)) {
				if (str !== "") {
					str += "&";
				}
				str += key + "=" + encodeURIComponent(obj[key]);
			}
		}
		return str;
	};
	
	return me;
}());