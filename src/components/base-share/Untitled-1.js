/*
    core.ios.js
    v1.0
    create bridge for qq browser
    client environment can only be iOS
    date:2014-08-13
*/

;
! function(window, ns, bridge) {

	"use strict";

	var exports = window[ns] = window[ns] || {};

	// 此方法用于创建 qb_channel
	! function() {
		var QbChannel = function(type) {
			this.type = type;
			this.handlers = {};
			this.numHandlers = 0;
			this.onHasSubscribersChange = null;
		};

		QbChannel.prototype.subscribe = function(f) {
			var func = f,
				guid = f.observer_guid;

			if (!guid) {
				// first time any channel has seen this subscriber
				guid = '' + window.qb_channel.nextGuid++;
			}
			func.observer_guid = guid;
			f.observer_guid = guid;

			// Don't add the same handler more than once.
			if (!this.handlers[guid]) {
				this.handlers[guid] = func;
				this.numHandlers++;
				if (this.numHandlers == 1) {
					this.onHasSubscribersChange && this.onHasSubscribersChange();
				}
			}
		};

		/**
		 * Unsubscribes the function with the given guid from the channel.
		 */
		QbChannel.prototype.unsubscribe = function(f) {
			var guid = f.observer_guid,
				handler = this.handlers[guid];
			if (handler) {
				delete this.handlers[guid];
				this.numHandlers--;
				if (this.numHandlers === 0) {
					this.onHasSubscribersChange && this.onHasSubscribersChange();
				}
			}
		};

		/**
		 * Calls all functions subscribed to this channel.
		 */
		QbChannel.prototype.fire = function(e) {
			if (this.numHandlers) {
				// Copy the values first so that it is safe to modify it from within
				// callbacks.
				var toCall = [];
				for (var item in this.handlers) {
					toCall.push(this.handlers[item]);
				}
				for (var i = 0; i < toCall.length; ++i) {
					toCall[i](e);
				}
			}
		};

		window.qb_channel = {
			create: function(type) {
				return window.qb_channel[type] = new QbChannel(type);
			},
			nextGuid: 0
		};
	}();

	// 创建命名空间
	var createNamespace = function(name) {
		var arr = name.split('.'),
			space = window;
		arr.forEach(function(a) {
			!space[a] && (space[a] = {});
			space = space[a];
		});
		return space;
	};

	//实现bridge的内容
	if (typeof bridge === 'function') {
		bridge();
	}

	//用来对API进行定义
	exports.define = function(name, fn) {
		var index = name.lastIndexOf('.'),
			ns = createNamespace(name.substring(0, index));
		ns[name.substring(index + 1)] = fn;
	};

}(window, 'browser', function() {
	var x5 = {
		commandQueue: [],
		commandQueueFlushing: false,
		resources: {
			base: !0
		}
	};

	x5.callbackId = 0;
	x5.callbacks = {};
	x5.callbackStatus = {
		NO_RESULT: 0,
		OK: 1,
		CLASS_NOT_FOUND_EXCEPTION: 2,
		ILLEGAL_ACCESS_EXCEPTION: 3,
		INSTANTIATION_EXCEPTION: 4,
		MALFORMED_URL_EXCEPTION: 5,
		IO_EXCEPTION: 6,
		INVALID_ACTION: 7,
		JSON_EXCEPTION: 8,
		ERROR: 9
	};

	x5.createBridge = function() {
		var iframe = document.createElement("iframe");
		iframe.style.cssText = 'display:none;width:0px;height:0px;';
		(document.body || document.documentElement).appendChild(iframe);
		return iframe;
	};

	x5.exec = function(successCallback, errorCallback, service, action, options) {
		var callbackId = null;
		var command = {
			className: service,
			methodName: action,
			options: {},
			arguments: []
		};

		if (successCallback || errorCallback) {
			callbackId = service + x5.callbackId++;
			x5.callbacks[callbackId] = {
				success: successCallback,
				fail: errorCallback
			};
		}

		if (callbackId != null) {
			command.arguments.push(callbackId);
		}

		for (var i = 0; i < options.length; ++i) {
			var arg = options[i];

			if (arg == undefined || arg == null) {
				continue;
			} else if (typeof(arg) == 'object') {
				command.options = arg;
			} else {
				command.arguments.push(arg);
			}
		}

		x5.commandQueue.push(JSON.stringify(command));
		if (x5.commandQueue.length == 1 && !x5.commandQueueFlushing) {
			if (!x5.bridge) {
				x5.bridge = x5.createBridge();
			}
			x5.bridge.src = "mtt:" + service + ":" + action;
		}
	};

	// 浏览器调用接口
	x5.getAndClearQueuedCommands = function() {
		var json = JSON.stringify(x5.commandQueue);
		x5.commandQueue = [];
		return json;
	};

	// 浏览器执行成功的回调函数
	x5.callbackSuccess = function(callbackId, args) {
		if (x5.callbacks[callbackId]) {
			if (args.status === x5.callbackStatus.OK) {
				try {
					if (x5.callbacks[callbackId].success) {
						x5.callbacks[callbackId].success(args.message);
					}
				} catch (e) {
					console.log("Error in success callback: " + callbackId + " = " + e);
				}
			}
			if (!args.keepCallback) {
				delete x5.callbacks[callbackId];
			}
		}
	};

	// 浏览器执行失败的回调函数
	x5.callbackError = function(callbackId, args) {
		if (x5.callbacks[callbackId]) {
			try {
				if (x5.callbacks[callbackId].fail) {
					x5.callbacks[callbackId].fail(args.message);
				}
			} catch (e) {
				console.log("Error in error callback: " + callbackId + " = " + e);
			}
			if (!args.keepCallback) {
				delete x5.callbacks[callbackId];
			}
		}
	};

	x5.createEvent = function(type, data) {
		var event = document.createEvent('Events');
		event.initEvent(type, false, false);
		if (data) {
			for (var i in data) {
				if (data.hasOwnProperty(i)) {
					event[i] = data[i];
				}
			}
		}
		return event;
	};

	x5.fireEvent = function(type, params) {
		var channel = window.qb_channel[type];
		if (channel) {
			var data = params && JSON.parse(params);
			var evt = x5.createEvent(type, data);
			channel.fire(evt);
		};
	};

	window.T5Kit = window.x5 = x5;
});
browser.define("browser.app.share", function(options, callback) {
	callback = callback || function() {};
	if (typeof options === 'object') {
		if (options.title && options.description && options.img_url) {
			options.content_type = 1;
		} else {
			options.content_type = 0;
		}
	}
	x5.exec(callback, function() {}, "app", "share", [options]);
});