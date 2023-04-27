                                                                                                                                     
try { if(!window.JSK$EPB && navigator.appVersion.match(/[345]\.[.0-9 ]+Safari/)) {
	var d = document.createElement('div');
	d.style.height = 0;
	var tgt = 'jsk-ifrmsess-' + Math.random();
	d.innerHTML = '<iframe id="' + tgt + '" name="' + tgt + '" src="about:blank" width=0 height=0 style="border: none"></iframe>';
	var f = function() {
		document.body.appendChild(d);
		var ifrsess = d.firstChild;
		var getFrame = function(FrameName, Parent) {
			var tp = Parent ? getFrameDoc(Parent) : document;
			var fr = tp.getElementById(FrameName).contentWindow;
			return fr;
		}
		var getFrameDoc = function(FrameName, Parent) {
			var FEl = getFrame(FrameName, Parent);
			return FEl.contentDocument || FEl.document;
		}

		var iDOC = getFrameDoc(tgt);
		var frm = iDOC.createElement('form');
		frm.method = 'post';frm.action = window.location.protocol + '//js-kit.com/api/session/refresh.js';
		iDOC.body.appendChild(frm);
		ifrsess.onreadystatechange = ifrsess.onload = function() {
			if(ifrsess.readyState && ifrsess.readyState != 'loaded'
				&& ifrsess.readyState != 'complete') return;
			ifrsess.onload = ifrsess.onreadystatechange = null;
			
		};
		frm.submit();
	}
	if(document.body) f();
	else setTimeout(f, 0);
} else {}} catch(e) {};
/*
 * Copyright (c) 2007 JS-Kit.com. All rights reserved.
 * $Date: 2011-02-04 00:50:36 -0800 (Fri, 04 Feb 2011) $
 * $Id: ratings.js 30602 2011-02-04 08:50:36Z oleg $
 */

if ( ! window.$JRA) {
  /* Global JS Ratings Array */
  var $JRA = [];
  var $JRH = {};

  var $JRLT = {
    yourRatingTitleCase: 'Seu voto',
    yourRating: 'SEU VOTO',
    vote: 'VOTO',
    votes: 'VOTOS',
    unrated: 'SEM VOTOS',
    rateThis: 'SUA NOTA',
    avgRating: 'class. m&eacute;dia',
    avgRatingExtend: 'class. m&eacute;dia',
    poweredBy: '',
    youHaveNotRatedYet: 'VOC&Ecirc; AINDA N&Atilde;O AVALIOU',
    addACommentToYourRating: 'ADICIONE UM COMENT&Aacute;RIO COM SEU VOTO',
    noVotesReceivedYet: 'SEM VOTOS RECEBIDOS',
    beTheFirstToRate: 'SEJA O PRIMEIRO A AVALIAR',
    ratingsDisabled: 'VOTA&Ccedil;&Atilde;O FECHADA',
    thankYou: 'OBRIGADO!',
    thank: 'OBRIGADO!',
    scoreThis: 'PONTUA&Ccedil;&Atilde;O',
    yourScore: 'SUA PONTUA&Ccedil;&Atilde;O',
    up: 'ACIMA',
    down: 'ABAIXO'
  };

  var $JRL = window.JSRC_Translate || function(t) {
        return (window.$JRLTL ? $JRLTL[t] : false) || $JRLT[t] || t;
  }
}



if(!window.JSKitLib) JSKitLib = {vars:{}};





JSKitLib.cr = function(arg) {
	if(!arg) return document.createElement("div");
	arg.t = arg.t || "div";
	var div = document.createElement(arg.t);
	if(arg.className) div.className = arg.className;
	if(arg.style) JSKitLib.addStyle(div, arg.style);
	return div;
}

JSKitLib.deleteProperty = function(obj, prop) {
	if (typeof obj[prop] == 'function') {
		obj[prop] = null;
	} else {
		try {
			delete obj[prop];
		} catch (e) {
			obj[prop] = null;
		}
	}
}

JSKitLib.trim = function(str) {
	if (typeof(str) != "string") return "";
	var str = str.replace(/^\s\s*/, ''), ws = /\s/, i = str.length;
	while (ws.test(str.charAt(--i)));
	return str.slice(0, i + 1);
}

JSKitLib.truncate = function(text, maxLength, postfix, cutWords) {
        if (text.length <= maxLength) return text;
        var match = text.match(new RegExp("^.{1," + maxLength + "}\\b"));
        return ((match && !cutWords ? match[0] : false) || text.substr(0, maxLength)) + (postfix || "");
}

JSKitLib.extractDomain = function(url) {
	var match = url.match(/(https?:\/\/)?(www.)?([^\/]*)/);
	return match ? match[3] : url;
}

JSKitLib.encodeJSONLiteral = function(string) {
	var replacements = {'\b': '\\b', '\t': '\\t', '\n': '\\n', '\f': '\\f', '\r': '\\r', '"' : '\\"', '\\': '\\\\'};
	return string.replace(/[\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff\\]/g, 
		function (a) { return (replacements.hasOwnProperty(a)) ? replacements[a] : '\\u' + ('0000' + a.charCodeAt(0).toString(16)).slice(-4); });
}

JSKitLib.Object2JSON = function(obj) {
	var out;
	switch (typeof(obj)) {
		case "number"  : out = isFinite(obj) ? obj : 'null'; break; 
		case "string"  : out = '"' + JSKitLib.encodeJSONLiteral(obj) + '"'; break;	
		case "boolean" : out = '"' + obj.toString() + '"'; break;
		default :
			if (obj instanceof Array) {
				var container = JSKitLib.fmap(obj, function(element) { return JSKitLib.Object2JSON(element); });
				out = '[' + container.join(",") + ']';
			} else if(obj instanceof Object) {
				var source = obj.exportProperties || obj;
				var container = JSKitLib.fmap(source, function(value, property) {
					if (source instanceof Array) { property = value; value = obj[property]; } 
					return '"' + property + '":' + JSKitLib.Object2JSON(value);
				});
	      			out = '{' + container.join(",") + '}';
			} else {
				out = 'null';
			}
	}
	return out;
}

JSKitLib.appendExternalParams = function(service, requestType, currentParams) {
	if (!window.JSKitExternalParams) return currentParams;
	JSKitLib.fmap(window.JSKitExternalParams, function(data) {
		var serviceRegExp = new RegExp(data.service || "*");
		var requestTypeRegExp = new RegExp(data.requestType || "*");
		if (serviceRegExp.test(service) && requestTypeRegExp.test(requestType)) {
			JSKitLib.fmap(data.params, function(value, key) { currentParams[key] = value; });
		}
	});
	return currentParams;
}





JSKitLib.isPreIE7 = function() {
	if (document.body && document.body.filters && parseInt(navigator.appVersion.split("MSIE") [1]) < 7)
		return true;
}

JSKitLib.isPreIE8 = function() {
	if (document.body && document.body.filters && parseInt(navigator.appVersion.split("MSIE") [1]) < 8)
		return true;
}

JSKitLib.isIE = function() {
	if (document.body && document.body.filters && navigator.appVersion.match(/MSIE/))
		return true;
}

JSKitLib.getBrowser = function() {
	if (JSKitLib.vars.browser) return JSKitLib.vars.browser;
	if (document.body && document.body.filters && navigator.appVersion.match(/MSIE/)) {
			JSKitLib.vars.browser = "IE";
	} else if ((navigator.appCodeName.toLowerCase()=="mozilla") 
		&& (navigator.appName.toLowerCase()=="netscape") 
		&& (navigator.product.toLowerCase()=="gecko") 
	) {
		if (navigator.userAgent.toLowerCase().indexOf("safari")!=-1) {
			JSKitLib.vars.browser = "safari";
		} else if (navigator.userAgent.toLowerCase().indexOf("firefox")!=-1) {
			JSKitLib.vars.browser = "gecko";
		}
	} else if (navigator.product && navigator.product.toLowerCase()=="gecko") {
		JSKitLib.vars.browser = "gecko";
	} else if (navigator.appName.match(/Opera/)) { 
		JSKitLib.vars.browser = "opera"; 
	}
	return JSKitLib.vars.browser;
}

JSKitLib.isFF3 = function() {
	return (navigator.userAgent.indexOf("Firefox/3") != -1);
}

JSKitLib.isGChrome = function() {
	return (navigator.userAgent.toLowerCase().indexOf('chrome') != -1);
}

JSKitLib.isSafari = function() {
	if (navigator.appVersion.match(/Safari/)) {
		return true;
	}
}

JSKitLib.isOpera = function() {
	if (navigator.appName.match(/Opera/)) {
		return true;
	}
}





JSKitLib.getOuterHTML = function(node) {
	var clone = node.cloneNode(true);
	var parent = document.createElement('div');
	parent.appendChild(clone);
	var ihtml = parent.innerHTML;

    // ff converts sp characters inside of href to hex ascii
	var ihtmlHref = ihtml.match(/href\s*=\s*"[^"]*(%7B|%7D)[^"]*"/g) || [];
	for (var i=0; i< ihtmlHref.length; i++) {
		var a = ihtmlHref[i];
		var b = a.replace(/%7B/g, '{');
		b = b.replace(/%7D/g, '}');
		ihtml = ihtml.replace(a, b);
	}
	return ihtml;
};

JSKitLib.html = function() {
        var div = document.createElement("div");
        for(var text = '', i = 0; i < arguments.length; i++)
                text += arguments[i];
        div.innerHTML = text;
        var ch = div.firstChild;
        div = null;
        return ch;
}

JSKitLib.text = function(text, element, clear) {
	var textNode = document.createTextNode(text);
	if (element) {
		if (clear) JSKitLib.removeChildren(element);
		element.appendChild(textNode);
	}
	return textNode;
}

JSKitLib.attachDescriptors2Elements = function(elements, layoutBlocksPrefix, descriptors, parentStructure) {
	JSKitLib.fmap(elements, function(element, id) {
		var pattern = id.match(layoutBlocksPrefix + "(.*)");
		var name = pattern ? pattern[1] : undefined;
		if (name && typeof(descriptors[name]) == "function") {
			var node = descriptors[name](element, parentStructure);
			if (node) element.appendChild(node);
		}
	});
}

JSKitLib.toDOM = function(template, layoutBlocksPrefix, descriptors) {
	var content = JSKitLib.html(template);
	var elements = JSKitLib.mapClass2Object({}, content);
	var structure = {
		"set" : function(name, element) { elements[layoutBlocksPrefix + name] = element; },
		"get" : function(name, ignorePrefix) { return elements[((ignorePrefix) ? "" : layoutBlocksPrefix) + name]; },
		"content" : content
	};
	JSKitLib.attachDescriptors2Elements(elements, layoutBlocksPrefix, descriptors, structure);
	return structure;
}

JSKitLib.htmlQuote = function (newValue, param) {
	newValue = newValue.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;")
	param = param || {};
	if(!param.title)
		newValue = newValue.replace(/ /,"&nbsp;");
	if(param.attribute)
		newValue = newValue.replace(/"/g,"&quot;");
	return newValue;
}

JSKitLib.htmlUnquote = function (newValue) {
	return newValue.replace(/&lt;/g,"<").replace(/&gt;/g,">").replace(/&amp;/g,"&");
}

JSKitLib.addScript = function(src, content, callback) {
	var sId = "js-kit-script-"+src.replace(/[\/.]/g, '');
	content.jsk$scriptId = sId;
	if(document.getElementById(sId)) {
		if (callback) callback();
		return;
	}
	var s = document.createElement('script');
	s.id = sId;
	s.type ='text/javascript';
	s.charset = 'utf-8';
	s.src = src;
	content.appendChild(s);
	if (callback) {
		s.onload = s.onreadystatechange = function() {
			if (s.readyState && s.readyState != 'loaded' && s.readyState != 'complete') return;
			s.onreadystatechange = s.onload = null;
			callback();
		}
	}
	return s;
}

JSKitLib.stripTags = function(text) {
	var r = /<\/?(a|em|strong|i|b|u|sup|sub|object|param|embed|span|pre|p)(.|\n)*?>/gi;
	text = text.replace(/<object(.|\n)+?<\/object>/gi,"[video]");
	text = text.replace(r,"");
	return (text.length > 150) ? text.slice(0,150) + "..." : text;
}

JSKitLib.createHiddenIframe = function(id, target, cb, clearOnload, src) {
	clearOnload = (typeof clearOnload == 'undefined' ? true : !!clearOnload);
	src = src || 'about:blank';
	target = target || document.body;
	var d = document.createElement('div');
	d.style.height = 0;
	d.innerHTML = '<iframe id="' + id + '" name="' + id + '" src="' + src + '" width="0" height="0" frameborder="0"  style="border: none"></iframe>';
	target.appendChild(d);
	var ifr = d.firstChild;
	if (cb) {
		ifr.onreadystatechange = function(e) {
			if (ifr.readyState && ifr.readyState != 'loaded' && ifr.readyState != 'complete') return;
			if (clearOnload) {
				ifr.onreadystatechange = ifr.onload = null;
			}
			cb();
		};
		if (!JSKitLib.isOpera()) {
			ifr.onload = ifr.onreadystatechange;
		}
	}
	return ifr;
}

JSKitLib.overlapSelectsIE = function(target) {
	var container = document.createElement('div');
	container.innerHTML = '<iframe style="position: absolute; z-index: -1; filter: mask(); border: 0; margin: 0; padding: 0; top: 0; left: 0; width: 9999px; height: 9999px; overflow: hidden;"></iframe>';
	target.appendChild(container.firstChild);
}

JSKitLib.openPopup = function(url, extConfig){
	var target = '_blank';
	var config = { 
		'width' : '960',
		'height' : '800',
		'status' : 'no',
		'menubar' : 'no',
		'toolbar' : 'no',
		'resizable' : 'no',
		'location'  : 'yes',
		'scrollbars' : 'yes',
		'directories': 'no'};

	JSKitLib.fmap(extConfig || [], function(value, key){
		if (key == 'target') target = value; else config[key] = value; 
	});

	var calcScreenDimensions = function(){
		if (JSKitLib.isOpera()) {
			var doc = (document.compatMode == "BackCompat") ? document.body : document.documentElement;
			return {'width': doc.clientWidth,
				'height': doc.clientHeight};
		}
		return {'width': screen.width,
			'height': screen.height};
	};

	var calcCorrections = function() {
		if (JSKitLib.isOpera()) return {'height': 35, 'width': 10, 'top' : 0}; 
		if (JSKitLib.isSafari() && !JSKitLib.isGChrome()) return {'height': 150, 'width': 0, 'top' : 100};
		return {'height': 0, 'width': 0, 'top' : 0};
	};

	var screenDimensions = calcScreenDimensions();
	var corrections = calcCorrections();

	if (config.height > screenDimensions.height - corrections.height) config.height = screenDimensions.height - corrections.height;
	if (config.width > screenDimensions.width - corrections.width) config.width = screenDimensions.width - corrections.width;

	if (!(config.left && config.top) && config.width && config.height) {
		config.left = Math.round((screenDimensions.width - config.width)/2);
		config.top = Math.round((screenDimensions.height - corrections.top - config.height)/2);
	}

	var params = JSKitLib.fmap(config, function(value, key) {return key + "=" + value;}).join(", ");
	return window.open(url, target, params);
}





JSKitLib.setEventHandler = function(obj, eventNames, eventHandler) {
	JSKitLib.fmap(eventNames, function(eventName) {
		obj["on" + eventName] = function(){
			eventHandler();
			return false;
		}
	});
}

JSKitLib.resetEventHandler = function(obj, eventNames) {
	JSKitLib.fmap(eventNames, function(eventName) {
		obj["on" + eventName] = function(){};
	});
}

JSKitLib.addEventHandler = function(obj, eventNames, eventHandler, capture) {
	JSKitLib.fmap(eventNames, function(e) {
		if (obj.addEventListener) {
			obj.addEventListener(e, eventHandler, !!capture);
		} else if (obj.attachEvent) {
			if (capture) {
				if (capture === true) capture = obj;
				capture.setCapture();
				capture.attachEvent('onlosecapture', eventHandler);
			}
			obj.attachEvent('on' + e, eventHandler);
		}
	});
}

JSKitLib.removeEventHandler = function(obj, eventNames, eventHandler, capture) {
	JSKitLib.fmap(eventNames, function(e) {
		if (obj.removeEventListener) {
			obj.removeEventListener(e, eventHandler, !!capture);
		} else if (obj.detachEvent) {
			if (capture) {
				if (capture === true) capture = obj;
				capture.detachEvent('onlosecapture', eventHandler);
				capture.releaseCapture();
			}
			obj.detachEvent('on' + e, eventHandler);
		}
	});
}

JSKitLib.setMouseEvent = function(obj, eventName, eventHandler) {
	var normalize = function(pr_event){
		e = pr_event || window.event;
		if (!e.target)
			e.target = e.srcElement || document;
		if (e.target.nodeType == 3)
			e.target = e.target.parentNode;
		if (!e.relatedTarget && e.fromElement)
			e.relatedTarget = (e.fromElement == e.target) ? e.toElement : e.fromElement;
		return e;
	};
	obj["onmouse" + eventName] = function(pr_event) {
		var e = normalize(pr_event);
		if (e.relatedTarget == obj || JSKitLib.isChildNodeOf(obj, e.relatedTarget)) return false;
		eventHandler(e);
	};
}

JSKitLib.stopEventPropagation = function(e) {
	if (!e) e = window.event;
	e.cancelBubble = true;
	if (e.stopPropagation) e.stopPropagation();
}

JSKitLib.preventDefaultEvent = function(e) {
  if (!e) e = window.event;
  e.returnValue = false;
  if (e.preventDefault) e.preventDefault();
}

JSKitLib.deferCall = function(func, onlyIE) {
	if (!JSKitLib.vars.windowOnLoadFired && (!onlyIE || (onlyIE && JSKitLib.isIE() && !window.$JSKitNoDeferCallIfIE))) {
		JSKitLib.addEventHandler(window, ['load'], func);
	} else {
		func();
	}
}

JSKitLib.addHandlers = function(obj, moveHandler, upHandler, capture) {
	JSKitLib.addEventHandler(obj, ['mousemove'], moveHandler, capture);
	JSKitLib.addEventHandler(obj, ['mouseup'], upHandler, capture);
}

JSKitLib.removeHandlers = function(obj, moveHandler, upHandler, capture) {
	JSKitLib.removeEventHandler(obj, ['mousemove'], moveHandler, capture);
	JSKitLib.removeEventHandler(obj, ['mouseup'], upHandler, capture);
}

JSKitLib.notDraggable = function(element) {
	element.onselectstart = function(ev) { JSKitLib.stopEventPropagation(ev); return true; }
	element.onmousedown = JSKitLib.stopEventPropagation;
	return element;
}

JSKitLib.getMousePosition = function(e) {
	if (!e) var e = window.event;
	if (e.clientX || e.clientY) {
		return {x:e.clientX, y:e.clientY};
	} else {
		return {x:e.pageX, y:e.pageY};
	}
}

JSKitLib.preventSelect = function(element, exceptions) {
	var browser = JSKitLib.getBrowser();
	var prevent = function() {
		if (browser == 'IE' || browser == 'safari') {
			element.onselectstart = function() { return false; }
		} else if (browser == 'gecko') {
			JSKitLib.addClass(element, 'js-nsgecko');
		}
	}
	if (typeof exceptions == 'object') {
		var include = exceptions.include || [];
		var exclude = exceptions.exclude || [];
		// Do not handle for certain browsers
		if (exclude.length) {
			for (var i=0; i < exclude.length; i++) {
				if (exclude[i] != browser) {
					prevent();
				}
			}
		}
		// Handle for certain browsers
		if (include.length) {
			for (var i=0; i < include.length; i++) {
				if (include[i] == browser) {
					prevent();
				}
			}
		}
	} else {
		prevent();
	}
}

JSKitLib.timedRetry = function(obj) {
	if(obj.pred()) {
		obj.onSuccess();
	} else {
		obj.currentRetries = (obj.currentRetries || 0) + 1;
		if(obj.currentRetries > obj.maxRetries) {
			if(obj.onFailure) obj.onFailure();
		} else {
			if(obj.onRetry) obj.onRetry();
			setTimeout(function(){
					JSKitLib.timedRetry(obj);
				}, obj.timeout);
		}
	}
}

JSKitLib.addDOMLoadedListener = function(callback) {
	window.JSK$DOMLoadedCallbacks = window.JSK$DOMLoadedCallbacks || [];
	window.JSK$DOMLoadedCallbacks.push(callback);
	if (window.JSK$DOMLoadedCallbacks.length > 1)
		return;
	var totalListener = function() {
		JSKitLib.fmap(window.JSK$DOMLoadedCallbacks, function(c) { c(); });
	}
	switch (JSKitLib.getBrowser()) {
		case 'gecko':
		case 'opera':
			document.addEventListener("DOMContentLoaded", totalListener, false);
			break;
		case 'IE':
			var temp = document.createElement('div');
			(function() {
				try {
					temp.doScroll('left');
				} catch (e) {
					setTimeout(arguments.callee, 100);
					return;
				}
				totalListener();
			})();
			break;
		case 'safari':
			(function() {
				if (document.readyState != 'complete') {
					setTimeout(arguments.callee, 100);
					return;
				}
				totalListener();
			})();
			break;
		default:
			JSKitLib.addEventHandler(window, ['load'], totalListener);
	}
}






JSKitLib.addCss = function(cssCode, name, content) {
	var doc = content || document;
	if(name) {
		name = "js-" + name + "-css";
		if (doc.getElementById(name)) return;
	}
	var se = doc.createElement("style");
	se.type = "text/css";
	if(name) se.id = name;
	if (se.styleSheet) se.styleSheet.cssText = cssCode;
	else se.appendChild(doc.createTextNode(cssCode));
	var hd = doc.getElementsByTagName("head");
	if(hd && hd[0]) hd[0].appendChild(se);
	else if (JSKitLib.isGChrome()) {
		doc.body.insertBefore(se, doc.body.firstChild);
	} else doc.write('<style>'+cssCode+'</style>');
}

JSKitLib.getElementsByClass = function(node, searchClass, tag) {
	var classElements = [];
	node = node || document;
	tag = tag || '*';
	var tagElements = node.getElementsByTagName(tag);
	var regex = new RegExp("(^|\\s)" + searchClass + "(\\s|$)");
	for (var i=0, j=0; i < tagElements.length; i++) {
		if (regex.test(tagElements[i].className)) {
			classElements[j] = tagElements[i];
			j++;
		}
	}
	return classElements;
};

JSKitLib.mapClass2Object = function(ctl, e) {
        if(e.className) {
                var arr = String(e.className).split(/[ ]+/);
                JSKitLib.map(function(el) { ctl[el] = e }, arr);
        }
        if(e.name) ctl[e.name] = e;
        try {
                var self = this;
                JSKitLib.map(function(child) {
                        JSKitLib.mapClass2Object(ctl, child);
                }, e.childNodes);
        } catch(e){}
        return ctl;
}

JSKitLib.hasClass = function(element, className) {
	return element.className.match(new RegExp('(\\s|^)' + className + '(\\s|$)'));
}

JSKitLib.addClass = function(element, className) {
	if (!JSKitLib.hasClass(element, className)) {
		element.className += ' ' + className;
	}
}

JSKitLib.removeClass = function(element, className) {
	if (JSKitLib.hasClass(element, className)) {
		var regex = new RegExp('(\\s|^)' + className + '(\\s|$)');
		element.className = element.className.replace(regex, ' ');
	}
}





JSKitLib.addPNG = function(node, imageURL) {
	if (JSKitLib.isIE()) {
		var cp = $JSKitGlobal.cachedPngs;
		JSKitLib.fmap(cp, function(img) {
			img.nodes = JSKitLib.filter(function(elm) { return elm != node; }, img.nodes);
		});
		if(cp[imageURL]) {
			if(cp[imageURL].loaded) {
				node.runtimeStyle.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(src='" + imageURL + "', sizingMethod='crop')"
			} else {
				cp[imageURL].nodes.push(node);
			}
		} else {
			cp[imageURL] = {nodes:[node]};
			var tPng = document.createElement("IMG");
			tPng.style.display = "none";
			tPng.onload = function() {
				cp[imageURL].loaded = true;
				var n = cp[imageURL].nodes;
				for(var i=0; i<n.length; i++) {
					n[i].runtimeStyle.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(src='" + imageURL + "', sizingMethod='crop')";
				}
				cp[imageURL].nodes = [];
			};
			node.appendChild(tPng);
			tPng.src = imageURL;
		}
	} else {
		node.style.backgroundImage = 'url(' + imageURL + ')';
		node.style.backgroundRepeat = 'no-repeat';        
	}
	return node;
}

JSKitLib.preloadImg = function(imgURL) { 
	if (!JSKitLib.preloadImgList) JSKitLib.preloadImgList = {};
	if (!JSKitLib.preloadImgList[imgURL]) {
		(new Image()).src = imgURL; 
		JSKitLib.preloadImgList[imgURL] = true;
	}
};

JSKitLib.pngBar = function(color, div, fixed) {
	var str;
	var url = "'//cdn.js-kit.com/images/bars/bar-" + color + ".png'";
	if(document.body && document.body.filters) {
		str = "progid:DXImageTransform.Microsoft.AlphaImageLoader(src="
			+ url + ", sizingMethod='"+(fixed?'crop':'scale')+"')";
		if(div) div.runtimeStyle.filter = str;
		return "filter: " + str + ";";
	} else {
		str = "url(" + url + ")";
		if(div) div.style.backgroundImage = str;
		return "background: " + str + ";";
	}
};

JSKitLib.createMiniStarObject = function(rating, scale, specs) {
	var fullStar = specs.full;
	var emptyStar = specs.empty;
	var starWidth = specs.width;
	var starHeight = specs.height;

	var setImage = function(star, imageURL) {
		if(star.imageURL == imageURL)
			return; // Already set and we know it

		star.imageURL = imageURL;
		JSKitLib.addPNG(star, imageURL);
	}

	var obj = document.createElement('div');
	var objWidth = 0;
	var objHeight = starHeight;

	/* Increment by Full Star Ratings */
	for (var i=2; i <= scale; i += 2) {
		var star = document.createElement('div');

		star.style.cssFloat   = 'left';
		star.style.styleFloat = 'left';
		star.style.width    = starWidth + 'px';
		star.style.height   = starHeight + 'px';
		star.style.fontSize = starHeight + 'px'; // ie6

		objWidth += starHeight;

		if (rating >= i) {
			setImage(star, fullStar);
		} else {
			setImage(star, emptyStar);
		}

		obj.appendChild(star);
	}

	JSKitLib.setStyle(obj, "height: " + objHeight + "px; width: " + objWidth + "px; float: left; margin-right: 5px;");

	return obj;
}





JSKitLib.map = function(f, arr) {
	if(arr) for(var i = 0; i < arr.length; i++) f(arr[i], i, arr);
	return arr;
}

JSKitLib.filter = function(f, arr) {
	var newArr = [];
	if(arr)
		for(var i = 0; i < arr.length; i++)
			if(f(arr[i], i, arr))
				newArr.push(arr[i]);
	return newArr;
}

JSKitLib.lookup = function(f, arr){
	return JSKitLib.filter(f, arr).shift();
}

JSKitLib.fmap = function(o,f) {
	var r, a = [], l = o.length;
	if(l > 0 || l === 0)
		for(var i = 0; i < l; i++) {
			r = f.call(this,o[i],i,arguments);
			if(r !== undefined) a.push(r);
		}
	else
		for(var i in o)
			if(o.hasOwnProperty(i)) {
				r = f.call(this,o[i],i,arguments);
				if(r !== undefined) a.push(r);
			}
	return a;
}

JSKitLib.foldl = function(acc,o,f) {
	var r, l = o.length;
	if(l > 0 || l === 0)
		for(var i = 0; i < l; i++) {
			r = f.call(this,o[i],acc,i);
			if(r != undefined) acc = r;
		}
	else
		for(var i in o)
			if(o.hasOwnProperty(i)) {
				r = f.call(this,o[i],acc,i);
				if(r != undefined) acc = r;
			}
	return acc;
}

JSKitLib.intersperse = function(f) {
	return JSKitLib.foldl([], this, function(e, acc, i) {
		if(acc.length) acc.push(f);
		acc.push(e);
	});
}

JSKitLib.merge = function() {
	return Array.prototype.concat.apply([], arguments);
}

JSKitLib.cloneObject = function(obj) {
	return JSKitLib.foldl({}, obj, function(value, acc, key) { acc[key] = value; });
}





// rounds number to x decimal places
JSKitLib.round = function(number, x) {
	x = (!x ? 2 : x);
	return Math.round(number*Math.pow(10,x))/Math.pow(10,x);
}

JSKitLib.zeroPad = function(number, x) {
	number = JSKitLib.round(number, x);
	var text = new String(number);
	var matches = text.match(/(\d*)(\.(\d*))?/) || [];
	var decimal = matches[3] || '';
	if (!decimal) {
		text += '.';
	}
	var count = x - decimal.length;
	for (var i=0; i<count; i++) {
		text += '0';
	}
	return text;
}





JSKitLib.removeChildren = function(element) {
	while(element && element.hasChildNodes())
		element.removeChild(element.firstChild);
}

JSKitLib.visible = function(element) {
	return element.style.display != 'none';
}

JSKitLib.show = function(element, style) {
	element.style.display = style || '';
}

JSKitLib.hide = function(element) {
	element.style.display = 'none';
}

JSKitLib.toggle = function(element, style) {
	(element.style.display == 'none') ? JSKitLib.show(element, style) :  JSKitLib.hide(element);
}

JSKitLib.getStyle = function(element) {
	if (typeof element.style.cssText != "undefined") {
		return element.style.cssText;
	} else {
		return element.getAttribute("style");
	}
}

JSKitLib.setStyle = function(element, style) {
	if (typeof element.style.cssText != "undefined") {
		element.style.cssText = style;
	} else {
		element.setAttribute("style", style);
	}
}

JSKitLib.addStyle = function(element, style) {
	var oldStyle = JSKitLib.getStyle(element);
	JSKitLib.setStyle(element, oldStyle + '; ' + style); // IE needs ;
}

JSKitLib.getStyleProperty = function(el, prop) {
	if (typeof el == 'string') {
		el = document.getElementById(el);
	}
	if (el.currentStyle) {
		return el.currentStyle[prop];
	} else if (window.getComputedStyle) {
		return document.defaultView.getComputedStyle(el, null).getPropertyValue(prop);
	} else {
		return el.style[prop];
	}
}

JSKitLib.findPos = function(obj) {
	var origObj = obj;
	var curleft = curtop = curright = curbottom = 0;
	if (obj.offsetParent) {
		curleft = obj.offsetLeft;
		curtop = obj.offsetTop;
		while (obj = obj.offsetParent) {
			curleft += obj.offsetLeft;
			curtop += obj.offsetTop;
		}
	}
	curright = curleft + origObj.offsetWidth;
	curbottom = curtop + origObj.offsetHeight;
	return [curleft,curtop,curright,curbottom];
}

JSKitLib.calcCenterPos = function(elmWidth, elmHeight) {
	var doc = (document.compatMode == "BackCompat") ? document.body : document.documentElement;
	var scroll = JSDL.prototype.getCurScroll();
	return [
		scroll.scroll_left + Math.max(0, Math.round((doc.clientWidth - elmWidth)/2)),
		scroll.scroll_top + Math.max(0, Math.round((doc.clientHeight - elmHeight)/2))
	];
}

JSKitLib.getDocSize = function (){
	var doc_width,doc_height;
	if(typeof window.innerWidth=="number"){
		if(document.documentElement && document.defaultView && typeof document.defaultView.scrollMaxY=="number"){
			doc_height=document.documentElement.offsetHeight-document.defaultView.scrollMaxY;
			doc_width=document.documentElement.offsetWidth;
		} else {
			doc_height=window.innerHeight;
			doc_width=window.innerWidth;
		}
	} else {
		if(document.documentElement && typeof document.documentElement.clientWidth=="number" && document.documentElement.clientWidth){
			doc_height=document.documentElement.clientHeight;
			doc_width=document.documentElement.clientWidth;
		} else {
			if(document.compatMode == "BackCompat"){
				doc_height=document.body.offsetHeight;
				doc_width=document.body.offsetWidth;
			} else {                                
				doc_height=document.body.clientHeight;
				doc_width=document.body.clientWidth;
			}
		}
	}
	return [doc_height,doc_width];
}

JSKitLib.getJSKitBodyElement = function() {
	var be = document.getElementById('js-kit-body-element');
	if (!be) {
		be = document.createElement('div');
		be.id = "js-kit-body-element";
		document.body.appendChild(be);
	}
	return be;
}

JSKitLib.isChildNodeOf = function(parent, child) {
	if (parent === child) 
		return false
	while (child && child !== parent) {
		try {child = child.parentNode;}
		catch(e){child = parent;}
	}
	return child === parent;
}

JSKitLib.replaceChildren = function(where, replacement) {
	JSKitLib.removeChildren(where);
	JSKitLib.addChild(where, replacement);
}

JSKitLib.addChild = function(to, what) {
	if (typeof(to) != 'object')
		return;
	if(arguments.length == 3 && arguments[2])
		to.insertBefore(what, to.firstChild);
	else
		to.appendChild(what);
}

JSKitLib.hasParentNode = function(el) {
	return el && el.parentNode && el.parentNode.nodeType != 11;
}

JSKitLib.setOpacity = function(div, val) {
	if(document.body.filters) {
		if(val == 1) div.style.filter = '';
		else div.style.filter = 'alpha(opacity: ' + Math.round(val * 100) + ')';
	} else {
		div.style.opacity = val;
	}
}





if (typeof JSKitLib.vars.windowOnLoadFired == 'undefined') {
        JSKitLib.vars.windowOnLoadFired = false;
        JSKitLib.addEventHandler(window, ['load'], function(){ JSKitLib.vars.windowOnLoadFired = true; });
}





JSKitLib.setThumbImage = function(args) {

	if (typeof args != 'object')
		return;

	var element     = args.element;
	var ud          = args.ud;
	var actionable  = args.actionable;
	var imageURL    = args.imageURL;
	var ignoreEmpty = args.ignoreEmpty;
	var numVotes    = args.numVotes; 
	var thumbWidth  = args.thumbWidth;
	var thumbHeight = args.thumbHeight;

	if(element.imageURL != imageURL){
		element.imageURL = imageURL
		JSKitLib.addPNG(element, imageURL);
	}

	var offsetTop=0;
	var offsetLeft=0;
	if(ud == 'down') offsetLeft=-thumbWidth;
	if((!actionable)||(!numVotes && !ignoreEmpty)) offsetTop=-thumbHeight;
	if(JSKitLib.isIE() && !JSKitLib.isPreIE7()){
		element.parentNode.parentNode.style.left=offsetLeft+'px';
		element.parentNode.parentNode.style.top=offsetTop+'px';
	} else {
		element.parentNode.style.left=offsetLeft+'px';
		element.parentNode.style.top=offsetTop+'px';
	}
}

// Returns an single div with a specified thumb image
JSKitLib.createThumbImage = function(args) {

	if (typeof args != 'object')
		return;

	var ud = args.ud;
	var actionable = args.actionable;
	var imageURL = args.imageURL;
	var ignoreEmpty = args.ignoreEmpty;
	var numVotes = args.numVotes;
	var thumbWidth = args.thumbWidth;
	var thumbHeight = args.thumbHeight;

	var div1 = document.createElement('div');
	var div2 = document.createElement('div');
	var div3 = document.createElement('div');

	div3.style.position = 'relative';
	div3.style.width = thumbWidth + 'px';
	div3.style.height = thumbHeight + 'px';
	div3.style.overflow = 'hidden';

	div2.style.position = 'absolute';
	div2.style.width = thumbWidth + 'px';
	div2.style.height = thumbHeight + 'px';

	// div1 is full size of all thumb images, and uses offset and 
	// overflow of its parents to show specific thumb image
	div1.style.width = (thumbWidth * 2) + 'px';
	div1.style.height = (thumbHeight * 2) + 'px';

	if(JSKitLib.isIE() && !JSKitLib.isPreIE7()){
		var divtmp = document.createElement('div');
		divtmp.style.width = (thumbWidth * 2) + 'px';
		divtmp.style.height = (thumbHeight * 2) + 'px';
		div3.appendChild(div2);
		div2.appendChild(divtmp);
		divtmp.appendChild(div1);
	} else {
		div2.appendChild(div1);
	}

	div3.appendChild(div2);

	JSKitLib.setThumbImage( { element: div1, ud: ud, actionable: actionable, imageURL: imageURL, ignoreEmpty: ignoreEmpty, numVotes: numVotes, thumbWidth: thumbWidth, thumbHeight: thumbHeight } );

	return div3;

}





var JSKitGlobal = function() {

	this._appAvailable = {};
	this._appObjects = {};  // Specific objects of an application type 
	this._appObjectActions = {}; // app.object.actions
	
	this.cachedPngs = {};

	this._isAppAvailable = function(app) {
		return (this._appAvailable[app]) ? true : false;
	}

	this.isRatingsAppAvailable = function() {
		return this._isAppAvailable('ratings');
	}

	this.isCommentsAppAvailable = function() {
		return this._isAppAvailable('comments');
	}

	this._setAppAvailable = function(app) {
		this._appAvailable[app] = true;
		/* index this app */
		this.indexAppObjects(app);
		/* execute any queued actions */
		this.executeAppObjectActions(app);
	}

	this.setRatingsAppAvailable = function() {
		this._setAppAvailable('ratings');
	}

	this.setCommentsAppAvailable = function() {
		this._setAppAvailable('comments');
	}

	this.indexAppObjects = function(app) {
		if (app == 'ratings') {
			var appArray = $JRA;
		} else if (app == 'comments') {
			var appArray = $JCA;
		} else {
			alert('Attempt to index invalid app type');
			return;
		}
		for (var i=0; i < appArray.length; i++) {
			// Check that it's not standalone
			if (appArray[i].isStandalone()) {
				continue;
			}
			var uniq = appArray[i].uniq;
			if ( ! this._appObjects[uniq] ) {
				this._appObjects[uniq] = {};
			}
			if ( ! this._appObjects[uniq][app]) {
				this._appObjects[uniq][app] = [];
			}
			this._appObjects[uniq][app].push(appArray[i]);
		}
	}

	this.executeAppObjectActions = function(app) {
		if (this._appObjectActions[app]) {
			for (var i=0; i < this._appObjectActions[app].length; i++) {
				var uniq = this._appObjectActions[app][i].uniq;
				if (this._getAppObject(app, uniq)) {
					this._appObjectActions[app][i].action();
				}
			}
		}
	}

	this._getAppObject = function(app, uniq) {
		if (this._appObjects[uniq] && this._appObjects[uniq][app]) {
			return this._appObjects[uniq][app][0];  // Return only the first
		}
		return null;
	}

	this.getCommentsAppObject = function(uniq) {
		return this._getAppObject('comments', uniq);
	}

	/* Returns a Ratings Object */
	this.getRatingsAppObject = function(uniq) {
		return this._getAppObject('ratings', uniq);
	}

	this.copyRatingsAppObject = function(uniq, node) {
		if ( ! this.isRatingsAppAvailable()) {
			return;
		}
		var oldObj = this.getRatingsAppObject(uniq);
		var newObj = oldObj.clone(node, { 'view':'user', 'commentprompt':'no', 'menu':'no'  } );
		return newObj;
	}

	this._tryAppObjectAction = function(app, uniq, action) {
		if (this._isAppAvailable(app)) {
			if (this._getAppObject(app, uniq)) {
				action();
			}
		} else {
			if ( ! this._appObjectActions[app]) {
				this._appObjectActions[app] = [];
			}
			this._appObjectActions[app].push( { 'uniq' : uniq, 'action' : action } );
		}
	}

	this.tryRatingsAppObjectAction = function(uniq, action) {
		this._tryAppObjectAction('ratings', uniq, action);
	}

	this.tryCommentsAppObjectAction = function(uniq, action) {
		this._tryAppObjectAction('comments', uniq, action);
	}
}

/* Singleton-like handler */
JSKitGlobal.getInstance = function() {
	if (!window.JSKitGlobalInstance) {
		JSKitGlobalInstance = new JSKitGlobal();
	}
	return JSKitGlobalInstance;
}





/* JSKitGlobal  object */
$JSKitGlobal = JSKitGlobal.getInstance();





JSKitLib.getRef = function(self) {
	var wl = window.location;
	return wl.protocol + "//" + self.config.domain + wl.pathname;
}

JSKitLib.readConfig = function(wtype, target, cf) {
	cf = cf || {};
	var gtags = JSKitLib.parseConfigTags(document, wtype, 'span');
	var ltags = JSKitLib.parseConfigTags(target, '', 'span');
	var gc = window.JSKitConfig || {};
	for(var i = 3; i < arguments.length; i++) {
		var arg = arguments[i];
		if(typeof(arg) == 'string') arg = [arg];
		var name = arg[0];
		var value = cf[name] || target.getAttribute(name) || ltags[name]
			|| gc[wtype + '-' + name] || gtags[name];
		var wl = window.location;
		switch (name) {
			case 'path': value = JSKitLib._normPath(target, value); break;
			case 'permalink':
				value = value || wl.href.replace(wl.hash,'');
				if (!value.match(/^https?:\/\//))
					value = "http://" + wl.host + value.replace(/^([^\/]+)/, "/$1");
				break;
			case 'title': value = value || document.title; break;
			case 'domain': value = value || wl.host; break;
		}
		if(arg.length > 1) {
			if(typeof(arg[1]) == 'number') {
				if(value) {
					var n = parseInt(value);
					if(isNaN(n) || n < 0) {
						if(value == "no") value = 0;
						else value = arg[1];
					} else value = n;
				} else value = arg[1];
			} else if(typeof(arg[1]) == 'object') {
				for(var j=arg[1].length; j; j--)
					if(arg[1][j-1] == value) break;
				if(!j) value = arg[1][j];
			} else {
				if(!value) value = arg[1];
			}
		}
		cf[name] = value;
	}
	return cf;
}

JSKitLib.parseConfigTags = function(target, wtype, tag) {
	var cache = document._widgets_config;
	if (wtype && cache && cache[wtype])
		return cache[wtype];
	var regp = wtype ? wtype+'?-' : '';
	var nodes = target.getElementsByTagName(tag);
	var config = {};
	for (var i = 0; i < nodes.length; i++) {
		var reg = RegExp("^js-kit-config-"+regp+"(.*)$");
		var m = reg.exec(nodes[i].className);
		if (m && m.length) {
			config[m[1].toLowerCase()] = nodes[i].innerHTML;
			nodes[i].style.display = 'none';
		}
	}
	if (wtype) {
		document._widgets_config = document._widgets_config || {};
		document._widgets_config[wtype] = config;
	}
	return config;
}

JSKitLib._normPath = function(target, path) {
	var wl = window.location;
	var uniq = String(target.getAttribute("uniq") || target.getAttribute("unique") || '');
	/* trim uniq */
	var uniq = uniq.replace(/^\s\s*/, ''), ws = /\s/, i = uniq.length;
	while (ws.test(uniq.charAt(--i)));
	uniq = uniq.slice(0, i + 1);
	/* end of trim */
	var plus = true;
	if (uniq) {
		plus = uniq.match(/^\+\/*(.*)/);
		if (plus) path = plus[1];
		else path = uniq;
	}
	if(path) {
		path = String(path);
		var ar = path.match(/^https?:\/\/[^\/]+(.*)/);
		if(ar) path = ar[1];
		else path = path.replace(/^([^\/]+)/, (plus ? wl.pathname : "") + "/$1");
		path = path.replace(/^\/+/, "/");
	} else { path=wl.pathname; }
	return path;
}

JSKitLib.initWidgets = function(widget_type, request, constructor) {
	var sendRequest = function(domain, multiParams, target) {
		if (!multiParams.length)
			return;
		var wl = window.location;
		request = request || {"extra_params": {}};
		var req = {
			uri: request.base_uri,
			ref: wl.protocol + "//" + domain + wl.pathname,
			epb: window.JSKitEPB ? JSKitEPB.getAsHash() : {},
			request: request.extra_params,
			variableRequest: multiParams,
			transport: 'GET',
			target: target,
			trailer: request.trailer
		};
		new JSRVC(req);
	}

	var els = document.body.getElementsByTagName("div");
	if(!els || !els.length)
		return;

	var multiI = {};
	var multiQ = {};
	var obj;
	var reg = new RegExp('js-kit-' + widget_type + '?');
	for (var i = 0; i < els.length; i++) {
		var m = reg.exec(els[i].className);
		if (!m || !m.length || els[i].jsk$initialized)
			continue;

		obj = constructor(els[i]);
		els[i].jsk$initialized = true;
		if (obj.config.disabled && obj.config.disabled != "no") continue;
		var d = obj.config.domain;

		if (!multiQ[d]) {
			multiQ[d] = [];
			multiI[d] = 0;
		}
		multiQ[d].push(obj.singleRequestParams);
		multiI[d]++;
	}
	JSKitLib.fmap(multiQ, function(v, k){ if (v) sendRequest(k, v, obj.target); });
}





if(!window.JSKW$Events){
        var JSKW$Events = new JSEC();
}

/////////////////////////////////////
// JS Event Class
/////////////////////////////////////
function JSEC() {
	this.contextHandles = [];
}

JSEC.prototype.registerEventCallback = function (contextHandle, eventHandle, eventName) {
	if(!contextHandle) {
		contextHandle = new JSECC(eventHandle, eventName);
		this.contextHandles.push(contextHandle);
		contextHandle.cHdlId = this.contextHandles.length - 1;
	} else {
		contextHandle.registerEventCallback(eventHandle, eventName);
	}
	return contextHandle;
}

JSEC.prototype.deRegisterEventCallback = function (contextHandle, eventHandle, eventName) {
	contextHandle.deRegisterEventCallback(eventHandle, eventName);
}

JSEC.prototype.syncBroadcast = function (eventName) {
	var args = arguments;
	JSKitLib.fmap(this.contextHandles, function(c){
		if(c) c.broadCast.apply(c, args);
	});
}

JSEC.prototype.asyncBroadcast = function (eventName) {
	var self = this;
	var args = arguments;
	setTimeout(function(){
		self.syncBroadcast.apply(self, args);
	}, 0);
}

JSEC.prototype.invalidateContext = function (contextHandle) {
	if(contextHandle) {
		contextHandle.invalidateContext();
		delete this.contextHandles[contextHandle.cHdlId];
	}
}

/////////////////////////////////////
// JS Event Context Class
/////////////////////////////////////
function JSECC(eventHandle, eventName) {
	this.registeredCallbacks = [];
	if(eventName || eventHandle) this.registerEventCallback(eventHandle, eventName);
}

JSECC.prototype.registerEventCallback = function (eventHandle, eventName) {
	var ev = eventName || '';
	if(!this.registeredCallbacks[ev]) this.registeredCallbacks[ev] = [];
	this.registeredCallbacks[ev].push(eventHandle);
}

JSECC.prototype.deRegisterEventCallback = function (eventHandle, eventName) {
	var ev = eventName || '';
	var self = this;
	if(!eventHandle) {
		delete this.registeredCallbacks[ev];
		return;
	}
	var k=0;
	while(k<this.registeredCallbacks[ev].length) {
		if(this.registeredCallbacks[ev][k] == eventHandle) {
			self.registeredCallbacks[ev].splice(k, 1);
		} else k++;
	}
	if(!this.registeredCallbacks[ev].length) delete this.registeredCallbacks[ev];
}

JSECC.prototype.invalidateContext = function () {
	this.registeredCallbacks = [];
	try {
		if(this.jsk$invalidate) this.jsk$invalidate();
	} catch(e) { ; };
}

JSECC.prototype.broadCast = function (eventName) {
	var self = this;
	var ar = [''];
	var args = arguments;
	if(eventName!='') ar.push(eventName);
	JSKitLib.fmap(ar, function(ev){
		if(self.registeredCallbacks[ev]) JSKitLib.fmap(self.registeredCallbacks[ev], function(evHdl){
			evHdl.apply(self, args);
		});
	});
}





//////////////////// JSRVC
// requestObj
// request: {uri: someuri, param1: val1, param2: val2, ...}
// [transport: ("GET" | "POST")]
// [target: some_DOM_element]
// [variableRequest: [{param1_1: val1_1, param1_2: val1_2, ...},
//			{param2_1: val2_1, param2_2: val2_2,...}, ...]]
// [form: some_form]
// [onreturn: some_callback]
// [randevu : (true | false)]
// [requestId: some request identity]
// [trailer: specifies the name of parameter which should terminate
//						each sub-request of multi-request]

function JSRVC(requestObj) {
	var s = this;
	s.requestId = requestObj.requestId || s.generateRequestId();
	s.requestsInProgress = 0;
	s.requestsQueue = [];
	s.trailer = requestObj.trailer;
	s.processRequest(requestObj);
}

JSRVC.prototype.generateRequestId = function() {
	return ((new Date()).valueOf() + Math.random()).toString();
}

JSRVC.prototype.processRequest = function(requestObj) {
	var s = this;
	s.error = undefined;
	if(s.requestsInProgress) {
		s.requestsQueue.push(requestObj);
		return;
	}
	s.requestObj = requestObj;
	if(s.requestObj.pickup && !s.eventCtx) s.eventCtx = JSKW$Events.registerEventCallback(s.eventCtx, function() {s.eventCallback.apply(s, arguments);}, "randevu_answer");
	var req = s.requestObj;
	s.preProcessRequest();
	if(!req.transport)
		req.transport = req.form ? "POST" : s.getRequestTransport();
	req.target = req.target || document.body;
	var onCompleteCB = req.timeout ? function() {
		s.startTimeoutTimer.call(s);
	} : undefined;
	var handlers = {'onload': s.onLoadRequest, 'onreadystatechange': s.onLoadRequest};
	switch(req.transport) {
	case "GET":
		s.processGETRequest(onCompleteCB, handlers);
		break;
	case "POST":
		s.processPOSTRequest(onCompleteCB, handlers);
		break;
	}
}

JSRVC.prototype.preProcessRequest = function() {
	var req = this.requestObj;
	if(!req.request) req.request = {};
	JSKitLib.fmap(req.epb || {}, function(v, k) { req.request[k] = v; });
	if (req.ref) req.request.ref = req.ref;
	req.request.randevuId = this.requestId;
	if(!req.variableRequest) req.variableRequest = [];
	if(req.pickup) req.request.randevuRnd = Math.random();
}

JSRVC.prototype.calcGetRequest = function() {
	var s = this;
	var req = s.requestObj;
	var reqvar = req.variableRequest;
	var permGETReq = s.serializeRequest(req.request);
	var varGETReq = JSKitLib.fmap(reqvar, function(el, idx){
		return s.serializeRequest(el, '[' + idx + ']');
	});
	return [permGETReq, varGETReq];
}

JSRVC.prototype.getRequestTransport = function() {
	var ser = this.calcGetRequest();
	var permReq = ser[0];
	var varReq = ser[1];
	var firstReqLen = permReq.length +
		(varReq.length>0 ? varReq[0].length : 0);
	var totalReqLen = 0;
	for(var i=0; i<varReq.length; i++)
		totalReqLen += varReq[i].length;
	
	return ((firstReqLen > 1700) || (totalReqLen > 3400) ?
		"POST" : "GET");
}

JSRVC.prototype.startTimeoutTimer = function() {
	var s = this;
	if(s.timeoutTimer) clearTimeout(s.timeoutTimer);
	s.timeoutTimer = setTimeout(function() { s.timeoutExpired(); }, s.requestObj.timeout);
}

JSRVC.prototype.timeoutExpired = function() {
	this.timeoutTimer = undefined;
	this.error = "timeout";
	this.returnAnswer();
}

JSRVC.prototype.returnAnswer = function(answerData) {
	var s = this;
	answerData = answerData || {};
	if(answerData.script) {
		var script = document.createElement('script');
		script.text = answerData.script;
		this.requestObj.target.appendChild(script);
	}
	if(s.requestObj.onreturn) {
		s.requestObj.onreturn.call(s, s.error || "data", answerData.data);
	}
}

JSRVC.prototype.serializeRequest = function(obj, prefix) {
	var s = this;
	var toString = function(k, v) {
		return encodeURIComponent(k) + (prefix || '') + "=" + encodeURIComponent(v);
	};
	var request = JSKitLib.fmap(obj, function(v, k) {
		if (s.trailer != k) return toString(k, v);
	});
	if (s.trailer && typeof(obj[s.trailer]) != "undefined") {
		request.push(toString(s.trailer, obj[s.trailer]));
	}
	return request.join("&");
}

JSRVC.prototype.setElementAttributes = function(obj, attrs) {
	var s = this;
	if (!obj) return;
	JSKitLib.fmap(attrs, function(v, k) {
		obj[k] = function() { v.call(s, obj) };
	});
}

JSRVC.prototype.runScript = function(src, data, handlers) {
	var script = document.createElement('script');
	this.setElementAttributes(script, handlers);
	script.setAttribute("charset", "utf-8");
	script.setAttribute("src",  src + (data ? '?' + data : ''));
	this.requestsInProgress++;
	this.requestObj.target.appendChild(script);
	this.script = script;
}

JSRVC.prototype.processGETRequest = function(onCompleteCB, handlers) {
	var s = this;
	var ser = s.calcGetRequest();
	var reqperm = ser[0];
	var reqpermlen = reqperm.length;
	var reqvar = ser[1];
	var reqvarlen = reqvar.length;
	var currequest = '';
	for(var i=0; i<reqvarlen; i++) {
		currequest += '&' + reqvar[i];
		if(currequest.length + reqpermlen +
			(i+1<reqvarlen ? reqvar[i+1].length : 0) > 2000) {
			s.runScript(s.requestObj.uri,
				reqperm + currequest, handlers);
			currequest = '';
		}
	}
	if((currequest) || (!reqvarlen))
		s.runScript(s.requestObj.uri,
			reqperm + '&' + currequest, handlers);
	if(onCompleteCB) onCompleteCB();
}

JSRVC.prototype.processPOSTRequest = function(onCompleteCB, handlers) {
	var s = this;
	var req = s.requestObj.request;
	var reqvar = s.requestObj.variableRequest;
	var reqvarlen = s.requestObj.variableRequest.length;
	var createForm = function() {
		var iframe = 'js-ifrm-' + Math.random();
		var ifr = JSKitLib.createHiddenIframe(iframe, s.requestObj.target);
		var doc = ifr.contentDocument ? ifr.contentDocument : ifr.document;
		var f = doc.createElement('FORM');
		f.doc = doc;
		if(JSKitLib.isIE()) doc.charset = "utf-8";
		f.target = iframe;
		JSKitLib.timedRetry({
				timeout: 100,
				maxRetries: 50,
				onSuccess: function() {
						doc.body.appendChild(f); },
				pred: function() { return !!doc.body; }
			});
		return f;
	};
	var getForm = function() {
		return (s.requestObj.form && !reqvarlen) ?
			s.requestObj.form : createForm();
	}
	var fillForm = function(form, obj) {
		form.method  = 'POST';
		form.enctype = "application/x-www-form-urlencoded";
		form.acceptCharset = 'UTF-8';
		form.action  = s.requestObj.uri;
		JSKitLib.fmap(obj, function(v, k) {
			var frmel = (form.doc || document).createElement('INPUT');
			frmel.type = "hidden";
			frmel.name = k;
			frmel.value = v;
			form.appendChild(frmel);
		});
	}
	var postRequest = function(pobj, vobj) {
		var form = getForm();
		fillForm(form, pobj);
		if(vobj) fillForm(form, vobj);
		if (form.target) s.setElementAttributes(document.getElementById(form.target), handlers);
		JSKitLib.fmap(handlers, function(v, k) {
			form[k] = v;
		});
		s.requestsInProgress++;
		JSKitLib.timedRetry({
				timeout: 100,
				maxRetries: 50,
				onSuccess: function() {
						form.submit(); },
				pred: function() {
					return (form.parentNode &&
						form.parentNode.nodeType!=11); }
			});
	}
	JSKitLib.fmap(reqvar, function(v) {
		postRequest(req, v);
	});
	if(!reqvarlen) postRequest(req);
	if(onCompleteCB) onCompleteCB();
}

JSRVC.prototype.onLoadRequest = function(el) {
	var s = this;
	if(el.readyState && el.readyState != 'loaded'
		&& el.readyState != 'complete') return;
	el.onreadystatechange = el.onload = null;
	if(!s.requestObj.pickup) {
		s.requestObj.checked = true;
		s.requestsInProgress--;
	}
	s.postProcessRequest();
}

JSRVC.prototype.postProcessRequest = function(source, data) {
	var s = this;
	if(s.requestObj.pickup && source!="pickup") return;
	if(s.requestObj.randevu && !s.error && s.requestObj.transport == "POST") {
		s.processRequest({
			'uri': '//js-kit.com/api/server-answer.js',
			'ref': s.requestObj.ref,
			'epb': s.requestObj.epb,
			'pickup': true,
			'onreturn': s.requestObj.onreturn,
			'target': s.requestObj.target});
		return;
	}
	s.returnAnswer(data);
	if(!s.requestsInProgress) {
		if(s.timeoutTimer) {
			clearTimeout(s.timeoutTimer);
			s.timeoutTimer = undefined;
		}
		if(s.requestsQueue.length && !s.error)
			s.processRequest(s.requestsQueue.pop());
	}
}

JSRVC.prototype.eventCallback = function(eventName, randevuId, status, data) {
	if(this.requestId != randevuId) return;
	this.requestsInProgress--;
	if(this.script && this.script.parentNode) {
		this.script.parentNode.removeChild(this.script);
		this.script = undefined;
	}
	switch(status) {
	case "ready":
		if(this.eventCtx) {
			JSKW$Events.invalidateContext(this.eventCtx);
			this.eventCtx = undefined;
		}
		this.postProcessRequest("pickup", data);
		break;
	case "timeout":
		if(this.error) {
			this.returnAnswer(data);
		} else {
			this.processRequest(this.requestObj);
		}
		break;
	case "exceeded": 
		this.error = "attempts_number_exceeded";
		this.returnAnswer(); 
		break;
	}
}

JSRVC.prototype.cancelRequest = function() {
	this.error = 'canceled';
}





if(!window.JSKitEPB){
	var JSKitEPB = new JSKitEPBLib();
}

function JSKitEPBLib() {
	this.JSK$EPB = window.JSK$EPB ? window.JSK$EPB : {};
}

JSKitEPBLib.prototype.isExists = function() {
	return (this.JSK$EPB.mac && this.JSK$EPB.profile) ? 1: 0;
}

JSKitEPBLib.prototype.getValue = function(ValueName) {
	return !this.isExists() || this.JSK$EPB.profile[ValueName] == undefined ? undefined : this.JSK$EPB.profile[ValueName];
}

JSKitEPBLib.prototype.getElement = function(Pref,El,ArrKey) {
	var rslt = [];
	if(typeof(El) == 'object') {
		if(El instanceof Array) {
			if(ArrKey) {
				var len = El.length;
				for(var i=0; i<len; i++)
					rslt = rslt.concat(this.getElement(Pref,El[i],ArrKey));
			}
		} else {
			for(var i in El)
				rslt = rslt.concat(this.getElement(Pref,El[i],i));
		}
	} else {
		if(ArrKey) {
			rslt.push({'Name': Pref+ArrKey, 'Value': El});
		}
	}
	return rslt;
}

JSKitEPBLib.prototype.getAsObj = function() {
	var rslt = [];
	var pref = "epb-";
	var epb = this.JSK$EPB;
	if(!epb.profile || !epb.mac) return rslt;
	rslt.push({'Name': pref+"mac",'Value': epb.mac});
	return rslt.concat(this.getElement(pref,epb.profile));
}

JSKitEPBLib.prototype.getURIEncodedSerialize = function() {
	var ser = this.getAsObj();
	var ar = [];
	for(var i=0; i<ser.length; i++) {
		ar.push(ser[i].Name + "=" + encodeURIComponent(ser[i].Value));
	}
	return ar.join("&");
}

JSKitEPBLib.prototype.getAsHash = function(obj) {
	var ser = this.getAsObj();
	obj = obj || {};
	JSKitLib.fmap(ser, function(v) { obj[v.Name] = v.Value; });
	return obj;
}



/* Class Functions */

// Initialize instances of JSRC objects
JSRC.init = function() {
	JSKitLib.initWidgets('ratings', {base_uri: JSRC.URI + '-data.js'}, function(div) {
		var obj = new JSRC(div);
		var params = {'jx': obj.jraIndex, 'p': obj.config.path}; 
		if (obj.config.property) params.pr = obj.config.property;
		if (obj.config.category) params.cg = obj.config.category;
		obj.singleRequestParams = params;
		return obj;
	});
}

// External API
JSRC.reinit = function() {
	$JRA = []; 
	JSRC.init();
}          

JSRC.prototype.addClassStyle = function(element, className) {
	JSKitLib.addClass(element, className);
}

JSRC.prototype.setPath = function(path) {
	this.path = path;
	this.pathOverride = path;    
}

JSRC.prototype.getRatingDataFromServer = function() {
	var mr = this.path;
	this.server('-data.js', 'p[0]=' + encodeURIComponent(mr)
		+ (this.config.property ? '&pr[0]=' + encodeURIComponent(this.config.property) : '')
		+ (this.config.category ? '&cg[0]=' + encodeURIComponent(this.config.category) : '')
		+ '&jx[0]=' + this.jraIndex);
}

/* CSS Stylings */
JSRC.writeCSS = function() {
	var css = '';
	for (prop in JSRC.CSS) {
		css += prop + ' {' + JSRC.CSS[prop] + '}';
	}
	JSKitLib.addCss(css, "js-RatingsCssText");
}

/* JS Rating Class */
function JSRC(target) {

	this.jraIndex = $JRA.length;
	$JRA.push(this);
	var self = this;

	var options = arguments[1] || {};

	this.cr = function(tag) { return document.createElement(tag) };

	this.pathOverride = '';
	this.raterInc = 2;  // Increment ratio of rateable v. displayable
	this.scale    = 10; // Points on rating scale

	this.onRate = []; // Callbacks for post rating processing

	this.isStandalone = function() {
		return (this.config.standalone == 'yes') ? true : false;
	}

	this.starWidth       = 16;
	this.starHeight      = 15;
	this.miniStarWidth   = 9;
	this.miniStarHeight  = 9;

	this.totalWidth; //The total width of the visible widget

	var wl = window.location;

	this.target = target;

	/* Configuration */
	this.config = JSKitLib.readConfig("ratings",
		target,
		{},
		'path',
		['standalone', 'no'],
		['view', 'combo'],
		['commentprompt', true],
		'imageurl',
		'imagesize',
		'title',
		'notop',
		'permalink',
		'domain',
		['freeze', 'no'],
		['menu', 'yes'],
		['subtext', 'yes'],
		'property',
		'category',
		'starcolor',
		'usercolor',
		'thumbnail',
		['thumbsize', 'normal'],
		'showinfoonrate',
		'partnerID'
	);
	for (var i in options)
		this.config[i] = options[i];

	target.innerHTML = "";
	JSKitLib.show(target);

	if (this.config.starcolor) this.config.starcolor = this.config.starcolor.toLowerCase();
	if (this.config.usercolor) this.config.usercolor = this.config.usercolor.toLowerCase();

	this.config.isExtend = (this.config.partnerID == 'Userplane');

	if(this.config.view.match(/score/)){
		if(this.config.thumbsize.match(/small/)){
			this.starWidth       = 10;
			this.starHeight      = 12;
		} else if(this.config.thumbsize.match(/large/)){
			this.starWidth       = 15;
			this.starHeight      = 18;
		} else {
			this.config.thumbsize     = 'normal';
			this.starWidth       = 12;
			this.starHeight      = 15;
		}
	}

	// Handle defaults for showinfoonrate attribute
	if ( ! this.config.showinfoonrate) {
		if (this.config.view.match(/score/)) {
			this.config.showinfoonrate = "yes";
		}
	}

	// Special menu handling for particular sites
	if (wl.host.match(/icanhascheezburger.com/)) { this.config.menu = 'no'; }

	if(this.config.imageurl && this.config.imagesize) {
		var dim = this.config.imagesize.match(/(\d+)([^\d]+(\d+))?/);
		if(dim) {
			this.starWidth = dim[1];
			this.starHeight = dim[3] || this.starWidth;
		}
	}

	if(this.config.view.match(/score/)){
		this.ratingBarWidth  = 2 * this.starWidth;
		this.ratingBarHeight = this.starHeight;
	} else {
		this.ratingBarWidth  = this.scale / this.raterInc * this.starWidth; 
		this.ratingBarHeight = this.starHeight;
	}

	this.uniq = this.path = this.pathOverride = this.config.path;
	if ( ! $JRH[this.uniq]) {
		$JRH[this.uniq] = [];
	}
	$JRH[this.uniq].push(this);

	this.defineIcons();
	JSKitLib.preloadImg(JSRC.INFO_IMG);

	if (options.newRating) {
		//TODO
		this.newRating({ Sum: options.newRating.objSum, Num: options.newRating.objNum, Votes: options.newRating.objVotes }, { Sum: options.newRating.userRating});
	}

	this.server = function(ext, data) {
		var sc = self.cr("script");
		sc.setAttribute("charset", "utf-8");
		sc.src = JSRC.URI + ext
			+ "?ref=" + encodeURIComponent(JSKitLib.getRef(self))
			+ "&" + JSKitEPB.getURIEncodedSerialize()
			+ "&p=" + encodeURIComponent(self.pathOverride) + '&' + data + self.appendExternalParams(ext);
		self.target.appendChild(sc);
		return false;
	}

	if(options.autorequest) {
		this.getRatingDataFromServer();
	}

}

/* Constants */
JSRC.DOMAIN = (window.location.protocol.substr(0, 4) != 'http' ? 'http:' : '')
              + '//js-kit.com';
JSRC.URI = JSRC.DOMAIN + '/rating';
JSRC.BASE_STAR_URI = JSRC.DOMAIN  + '/images/stars/';
JSRC.INFO_IMG = JSRC.DOMAIN + '/images/i-wg.png';
JSRC.INFO_IMG_ALERT = JSRC.DOMAIN + '/images/i-wg-green.png';
JSRC.INFO_IMG_WIDTH = 15;
JSRC.INFO_IMG_OFFSET = 7;
JSRC.INFOBOX_WINDOW_WIDTH = 200;
JSRC.CSS = {
	'.js-rating-labelText': 'padding-top: 2px; font-weight:bold; font-family: Arial; font-size: 11px; text-align: center; cursor: default; -moz-user-select: none;',
	'.js-ratingsExtend .js-rating-labelText': 'padding-top: '+(JSKitLib.isIE()?2:4)+'px; font-weight:bold; font-family: Arial; font-size: 11px; text-align: left; cursor: default; -moz-user-select: none;',
	'.js-rating-labelTextUp': 'padding-top: 2px; font-weight:bold; font-family: Arial; font-size: 11px; text-align: center; cursor: default; -moz-user-select: none;',
	'.js-rating-labelTextDown': 'padding-top: 2px; font-weight:bold; font-family: Arial; font-size: 11px; text-align: center; cursor: default; -moz-user-select: none;',
	'.js-rating-afterRating': 'width: 100px; font-weight:bold; font-family: Arial; font-size: 11px; text-align: center; padding: .3em;',
	'.js-rating-infoBox': 'color: black; text-align:left; -moz-user-select: none;',
	'.js-rating-infoBoxStats': 'line-height: 12pt; padding: 0.5em 0.8em 0.2em 0.8em; font-family: Arial; font-size: 11px;',
	'.js-rating-infoBoxPoweredBy': 'font-family: Arial; font-size: 11px;',
	'.js-ratings-tableWrapper' : 'background: transparent;',
	'.js-rating-infoBoxRatingsDisabled': 'font-family: Arial; font-size: 11px; color: #a00;',
	'.js-ratingInfoBoxTotalVotes' : 'margin-right: 3px;',
	
	//new Extend skin
	'.js-ratingsExtend .js-rating-infoBoxStats': 'line-height: 12pt; padding: 0; font-size: 10pt; color: #c2c2c2;'
}

JSRC.prototype.appendExternalParams = function(ext) {
	var params = JSKitLib.fmap(
		JSKitLib.appendExternalParams("ratings", ext, {}),
		function(value, key) { return key + "=" + value; }
	).join("&");
	return params.length ? "&" + params : "";
}

JSRC.prototype.defineIcons = function() {

  var self = this;
  this.fullStar  = [];
  this.halfStar  = [];
  this.emptyStar = [];
  this.miniFullStar  = [];
  this.miniEmptyStar = [];

  this.Thumb = [];

  var genstar = function(confColor, defColor, type) {
	var acceptedColors = { blue:1, yellow:1, gold:1, golden:1,
			green:1, violet:1, emerald:1, indigo:1, red:1, ruby:1 };
	var color = (confColor && acceptedColors[confColor])
			? confColor : defColor;
	var starURI = JSRC.BASE_STAR_URI;
	if(self.config.imageurl) {
		starURI = self.config.imageurl + '';
		color = type;
	}
	var size = '';

	self.fullStar[type]  = 'http://dl.dropbox.com/u/41516596/TEMPLATES/Template%20Verde%20Completo%20Create/js/estrelaw.png';
	self.halfStar[type]  = 'http://dl.dropbox.com/u/41516596/TEMPLATES/Template%20Verde%20Completo%20Create/js/estrelaquefalta.png';
	self.emptyStar[type] = 'http://dl.dropbox.com/u/41516596/TEMPLATES/Template%20Verde%20Completo%20Create/js/estrelaaaaaaacpia3.png';

	if ( ! self.config.imageurl) {
		self.miniFullStar[type]  = starURI + color + '-tiny.png';
		self.miniEmptyStar[type] = starURI + 'gray-tiny.png';
		self.miniStarWidth = 9;
		self.miniStarHeight = 9;
	} else {
		self.miniFullStar[type]  = self.fullStar[type];
		self.miniEmptyStar[type] = self.emptyStar[type];
		self.miniStarWidth = self.starWidth;
		self.miniStarHeight = self.starHeight;
	}

	JSKitLib.preloadImg(self.fullStar[type]);
	JSKitLib.preloadImg(self.halfStar[type]);
	JSKitLib.preloadImg(self.emptyStar[type]);
	JSKitLib.preloadImg(self.miniFullStar[type]);
	JSKitLib.preloadImg(self.miniEmptyStar[type]);

  }

  var genthumb = function(type) {
	var thumbURI = JSRC.BASE_STAR_URI;
	if(self.config.imageurl) {
		thumbURI = self.config.imageurl;
		self.Thumb[type]  = thumbURI;
	} else {
		self.Thumb[type]  = thumbURI + type + '-thumb.png';
	}

	JSKitLib.preloadImg(self.Thumb[type]);
  }

  if(this.config.view.match(/score/)){
    genthumb(this.config.thumbsize);
  } else {
    genstar(this.config.starcolor, 'green', 'star');
    genstar(this.config.usercolor, 'blue', 'user');
  }
}

JSRC.writeCSS();

/* Init a single call to init */
if ( ! $JRA.length) {
  JSRC.init();
  $JSKitGlobal.setRatingsAppAvailable();
} else {
  JSRC.init();
}


JSRC.prototype.dtInfoBox
 = '<div class="js-rating-infoBox" onselectstart="return false">'
 + '<div class="js-rTopDetailFont" style="color: white; background-color:#10a7c6; margin: .5em .8em 0 .8em; padding: 2px 5px; text-align:center;">Sobre essa postagem</div>'
 +  '<div class="js-rating-infoBoxStats">'
 +   '<div class="js-rating-infoBoxRatingsDisabled" style="display:none;">{Label:ratingsDisabled}<br></div>'
 +   '<span class="js-ratingInfoBoxTotalVotes" style="color:#0B5F79;text-transform:lowercase;font-weight:bold;">{totalVotes}</span>'
 +   '<span class="js-ratingInfoBoxAvgRating" style="white-space: nowrap;color:#0B5F79;text-transform:lowercase;">{avgStarRating}</span>'
 +   '<br>'
 +   '<span class="js-ratingInfoBoxUserRatingMsg" style="color:#0B5F79;font-weight:bold;">{userRatingMsg}</span>'
 +  '</div>'
 + '</div>';

JSRC.prototype.dtInfoBoxExtended
 = '<div class="js-rating-infoBox" onselectstart="return false">'
 +  '<div class="js-rating-infoBoxStats">'
 +   '<div class="js-rating-infoBoxRatingsDisabled" style="display:none;">{Label:ratingsDisabled}<br></div>'
 +   '<span class="js-ratingInfoBoxTotalVotes">{avgStarRating}</span>'
 +   '<span class="js-ratingInfoBoxAvgRating" style="white-space: nowrap">{totalVotes}</span>'
 +   '<br>'
 +   '<span class="js-ratingInfoBoxUserRatingMsg">{userRatingMsg}</span>'
 +  '</div>'
 + '</div>';

JSRC.prototype.contentBoxUp
= '<div style="padding-right: 7px; padding-left: 3px;"><span class="js-rating-labelTextUp"><nobr>{votedUp}</nobr></span></div>';
JSRC.prototype.contentBoxDown
= '<div style="padding-left: 3px;"><span class="js-rating-labelTextDown"><nobr>{votedDown}</nobr></span></div>';

JSRC.prototype.gtmpl = function(t) {
	var lowercase = function(a, m) { return String(m).toLowerCase(); }
	t = t.replace(/^[^<]*(<.*>)[^>]*$/m, "$1");
	t = t.replace(/(<[\/]?[A-Z]+)/g, lowercase);
	t = t.replace(/{Label:([^}]*)}/g,function(a,m){return $JRL(m);});
	return t;
}

JSRC.prototype.tmpl = function(t, obj) {
	var self = this;
	t = self.gtmpl(t);
	t = t.replace(/{([A-Za-z0-9]+)}/g,function(a,m){return obj.hasOwnProperty(m)?obj[m]:'{'+m+'}';});
	return t;
}

/* Will add a callback for post rating processing */
JSRC.prototype.addOnRate = function(action) {
	this.onRate.push(action);
}

JSRC.prototype.processOnRate = function() {
	for (var i=0; i < this.onRate.length; i++) {
		this.onRate[i]();
	}
}

JSRC.prototype.table = function(content) {
	var self = this;
	var a = function(n, w) {var o=self.cr(n);o.appendChild(w);return o;}
	var t = a('table', a('tbody', a('tr', a('td', content))));
	var z = function(a) {t.setAttribute(a, '0')}
	z('cellSpacing');
	z('cellPadding');
	z('border');
	return t;
}

JSRC.prototype.display = function() {
	var self = this;
	var target = this.target;
	// wrapper for our floated elements
	var wrapper = this.cr('div');
	wrapper.className = "js-ratingWrapper";	
	wrapper.onselectstart = function() { return false; }
	var actionable = (this.config.freeze == "yes") ? false : true;

	if (this.config.view.match(/(combo|user)/) && this.config.freeze == "yes") {
		this.userRatingBar = this.initRating(this.objEffRating, 'star', false);
	} else {
		this.userRatingBar = this.initRating(this.userRating, 'user', actionable);
	}
	this.userRatingDiv = this.cr('div');
	this.userRatingDiv.appendChild(this.userRatingBar);

	if (this.config.subtext != 'no') {
		this.textTotal = this.cr('div');
		this.addClassStyle(this.textTotal, 'js-rating-labelText');
		this.refreshTextTotal();
	}

	var rating;
	var text;
	if(this.config.isExtend){
		var tmpl = JSKitLib.html(this.tmpl(this.dtExtend, []));
		var ctls = JSKitLib.mapClass2Object({}, tmpl);
		target = ctls["js-RatingStars"];
		this.extendTarget = target;
		if(this.target.getAttribute('title')) {
			this.target.setAttribute('title', '');
			var table = ctls["js-RatingStarsView"];
			if(table)
				table.setAttribute('title', this.config.title);
		}
		var nav = ctls["js-RatingNavView"];
		this.infoBox = new JSRTC(nav, { 'count': 3 }, this, {'skin': 'Extend'});
		text = ctls["js-RatingText"];
		rating = ctls["js-Rating"];
		var ads = ctls["js-RatingNavAd"];

		var div = document.createElement('div');
		var adId = Math.floor(Math.random()*99999999999);
		var ifrId = 'userplane-ad' + adId;
		div.innerHTML = '<iframe id="' + ifrId + '" name="' + ifrId + '" frameborder="0" marginwidth="0" marginheight="0" width="100%" height="0" src="about:blank"></iframe>'; 
		ads.appendChild(div);
		var iframe = div.firstChild;
		iframe.onreadystatechange = function() {
			if (iframe.readyState && iframe.readyState != 'loaded' && iframe.readyState != 'complete') {
				return;
			}
			iframe.contentWindow.location.href =  JSRC.DOMAIN + '/userplane_ad/' + adId;
			iframe.onreadystatechange = function() {
				if (iframe.readyState && iframe.readyState != 'loaded' && iframe.readyState != 'complete') {
					return;
				}
				iframe.onload = iframe.onreadystatechange = null;

				var onUserplaneAd = function(error, data) {
					if (error != "data") return;
					iframe.height = data.height;
				}
				new JSRVC({uri: JSRC.DOMAIN + '/api/server-answer.js', 'target': target, 'onreturn': onUserplaneAd, 'pickup': true, 'requestId': 'userplanead' + adId});
			};
			iframe.onload = iframe.onreadystatechange;
		}
		iframe.onload = iframe.onreadystatechange;
	}
	if (this.config.view.match(/split/)) {
		// split view : community and user ratings
		this.defaultView = 'user';
		var starRatingBar = this.initRating(this.objEffRating, 'star', false);
		var starRatingDiv = this.cr('div');
		starRatingDiv.className = 'js-starRatingDiv';
		starRatingDiv.style.width = this.ratingBarWidth + 'px';
		starRatingDiv.appendChild(starRatingBar);
		if(this.config.isExtend) text.appendChild(this.textTotal)
		else starRatingDiv.appendChild(this.textTotal);
		wrapper.appendChild(starRatingDiv);
		JSKitLib.addStyle(this.userRatingDiv, 'float:left; width:' + this.ratingBarWidth + 'px');
		if (this.config.subtext != 'no') {
			this.textRating = this.cr('div');
			this.addClassStyle(this.textRating, 'js-rating-labelText');
			this.refreshTextRating();
			if(this.config.isExtend) {
				text.appendChild(this.textRating)
				this.textRating.style.marginTop = '7px';
			} else this.userRatingDiv.appendChild(this.textRating);
			this.activeText = this.textRating;
		}
		if(this.config.isExtend) this.totalWidth = this.ratingBarWidth;
		else this.totalWidth = 2 * this.ratingBarWidth + 10;
		wrapper.appendChild(this.userRatingDiv);
	} else if (this.config.view.match(/user/)) {
		// single star set, only shows current user's rating
		this.defaultView = 'user';
		this.userRatingDiv.style.cssFloat = 'left';
		this.userRatingDiv.style.styleFloat = 'left'; 
		if (this.config.subtext != 'no' && !this.config.isExtend) {
			this.textRating = this.cr('div');
			this.addClassStyle(this.textRating, 'js-rating-labelText');
			this.refreshTextRating();
			 if(this.config.isExtend) text.appendChild(this.textRating)
			this.userRatingDiv.appendChild(this.textRating);
			this.activeText = this.textRating;
		}
		this.totalWidth = this.ratingBarWidth;
		wrapper.appendChild(this.userRatingDiv);
	} else {
		// single star set, defaults to community rating
		this.defaultView = 'star';
		if (this.config.subtext != 'no') {
			if(!this.config.view.match(/score/)) {
				if(this.config.isExtend) text.appendChild(this.textTotal)
				else this.userRatingDiv.appendChild(this.textTotal);
			} else {
				this.userRatingBar.style.top = this.starHeight + 'px';
				this.textTotal.style.height = this.starHeight + 'px';
				if (this.config.isExtend) {
					this.userRatingDiv.style.height = this.starHeight + 'px';
					text.appendChild(this.textTotal);
				} else {
					this.userRatingDiv.style.height = 2 * this.starHeight + 'px';
					this.userRatingDiv.insertBefore(this.textTotal, this.userRatingDiv.firstChild);
				}
			}
			this.activeText = this.textTotal;
		}
		this.totalWidth = this.ratingBarWidth;
		wrapper.appendChild(this.userRatingDiv);
	}

	// Set our total width
	if(!this.config.view.match(/score/))
		wrapper.style.width = this.totalWidth + 'px';

	/* Rating Menu */
	if (this.config.menu != 'no' && this.config.freeze != 'yes' && !this.config.isExtend) {
		if(!this.config.view.match(/score/)) 
			wrapper.style.width = (this.totalWidth + 10 + JSRC.INFO_IMG_WIDTH) + 'px';
			var menuArrow = this.createMenuArrow();
			this.prepMenu(); // 'i' and infobox
			if((this.config.view.match(/score/)) && (this.config.subtext != 'no')) 
				menuArrow.style.marginTop = (2*this.starHeight-16)+'px';
			var self = this;
			this.addOnRate(function() {
				if (self.config.showinfoonrate == 'yes' || self.infoBox) self.showInfoBox();
			});
			wrapper.appendChild(menuArrow);
	}

	// Set the target width
	if(!this.config.view.match(/score/)){
		var targetMinWidth = parseInt(wrapper.style.width) + 6; // 3px margin
		var targetWidth = target.style.width || targetMinWidth;
		if (parseInt(targetWidth) <= targetMinWidth)
			target.style.width = targetMinWidth + 'px';
	}

	if(!this.isStandalone() && this.config.commentprompt != 'no') {
		var addCommentPrompt = function() {
			var afterRatingA = document.createElement('a');
			afterRatingA.appendChild(document.createTextNode($JRL('addACommentToYourRating')));
			afterRatingA.onclick = function() { 
				self.getCommentsAppObject().ShowCommentDialog(null);
				return false;
			};
			afterRatingA.href = 'javascript:void(0);';
			var afterRatingDiv = document.createElement('div');
			afterRatingDiv.appendChild(afterRatingA);
			self.addClassStyle(afterRatingDiv, 'js-rating-afterRating');
			var afterRating = self.createWindow(afterRatingDiv);
			afterRating.style.position ='absolute';
			afterRating.style.left = (self.totalWidth + 5) + 'px';
			afterRating.style.top = '-4px';
			afterRating.style.zIndex = '110'; // above menuArrow
			JSKitLib.hide(afterRating);
			self.addOnRate(function() { 
				JSKitLib.show(afterRating);
				setTimeout(function() { JSKitLib.hide(afterRating); }, 5000);
			});
			wrapper.appendChild(afterRating);
		}
		$JSKitGlobal.tryCommentsAppObjectAction(this.uniq, addCommentPrompt); 
	}

	var tableWrapper = this.table(wrapper);
	tableWrapper.className = "js-ratings-tableWrapper";
	JSKitLib.addChild(target, tableWrapper); // stars
	if(rating) JSKitLib.addChild(this.target, rating);

	if(this.config.view.match(/score/)){
		this.totalWidth=6+2*this.starWidth+this.contentBoxElUp.offsetWidth+this.contentBoxElDown.offsetWidth;
		var targetMinWidth;
		if(this.config.isExtend)
			targetMinWidth = this.totalWidth;
		else if (this.config.menu != 'no' && this.config.freeze != 'yes')
			targetMinWidth = this.totalWidth + 6 + 10 + JSRC.INFO_IMG_WIDTH;
		else
			targetMinWidth = this.totalWidth + 6;
		var targetWidth = target.style.width || targetMinWidth;
		if (parseInt(targetWidth) <= targetMinWidth)
			target.style.width = targetMinWidth + 'px';
		wrapper.style.width = targetMinWidth + 'px';
		this.userRatingDiv.style.width = (this.totalWidth) + 'px';
		if(this.textTotal)
			this.textTotal.style.width = (this.totalWidth) + 'px';
		this.userRatingBar.style.width = (this.totalWidth) + 'px';
		this.wrapper = wrapper;
	}

	if(!this.config.view.match(/split/) && !this.config.view.match(/user/)){
		this.userRatingDiv.style.cssFloat = 'left';
		this.userRatingDiv.style.styleFloat = 'left';
	}

	if(!this.config.view.match(/split/)) {
		this.refreshRating();  
	}
}

// generic jskit body tag fror absolutely position elements
JSRC.prototype.createBodyElement = function() {
  if ( ! document.getElementById('js-kit-body-element')) {
    var be = this.cr('div');
    be.id = "js-kit-body-element";
    document.body.appendChild(be);
  }
}

// Adds the 'i' button and infobox
JSRC.prototype.prepMenu = function() {
  var self = this;
  var prepMenu = function() {
    self.createBodyElement();

    var infoBoxWrapper = self.cr('div');
    self.infoBoxWrapper = infoBoxWrapper;

    document.getElementById('js-kit-body-element').appendChild(infoBoxWrapper);

    var infobox1Show = infobox2Show = false;

    var infoBoxMouseover = function() {
      clearTimeout(self.ratingMenuTimer);
    }

    self.target.onmouseover = function() { 
      infobox1Show = true; 
      infoBoxMouseover(); 
      JSKitLib.show(self.menuArrow);
    }

    // Initial time to hide box after mouseout
    self.infoBoxLifeTime = 1500;
 
    self.infoBoxWrapper.onmouseover = function() { 
      infobox2Show = true; 
      // If user is active in window, increase time before hiding
      self.infoBoxLifeTime = 3000;  
      infoBoxMouseover(); 
    }


    var infoBoxMouseout = function() {

      if (infobox1Show || infobox2Show) 
        return;

      self.ratingMenuTimer = setTimeout(function() {
        self.ratingMenuTimer = null;
          self.hideInfoBox();
          JSKitLib.hide(self.menuArrow);
      }, self.infoBoxLifeTime);
    }

    self.target.onmouseout = function() { infobox1Show = false;  infoBoxMouseout(); }
    self.infoBoxWrapper.onmouseout = function() { infobox2Show = false; infoBoxMouseout(); } 

  };

  // document.body.append functionality can only happen after window.onload in IE
  JSKitLib.deferCall(prepMenu, true);

}

JSRC.prototype.doAdminAlert = function() {
	if (this.isAdmin && !this.config.permalink && !window.$JSKitViaHaloScan) {
		var alertEndDate = new Date();
		alertEndDate.setFullYear(2008, 3, 22);
		var today = new Date();
		if (today < alertEndDate) {
			return true;
		}
	}
	return false;
}

JSRC.prototype.createMenuArrow = function() {
  this.menuArrow = document.createElement('div');
  JSKitLib.addStyle(this.menuArrow, 'width:15px; height:15px; margin-left: '+ JSRC.INFO_IMG_OFFSET + 'px; cursor:pointer; float: left;');
  JSKitLib.hide(this.menuArrow);

	if (this.doAdminAlert()) {
		JSKitLib.addPNG(this.menuArrow, JSRC.INFO_IMG_ALERT);
	} else {
		JSKitLib.addPNG(this.menuArrow, JSRC.INFO_IMG);
	}

  this.infoBoxImg = this.menuArrow;
  var self = this;
  this.menuArrow.onclick = function() { 
    self.toggleInfoBox();
  }

  return this.menuArrow;
}


JSRC.prototype.hideInfoBox = function() {
  if (this.infoBox && !this.config.isExtend) {
	JSKitLib.removeChildren(this.infoBox.target);
	this.infoBox = null;
  }
}

JSRC.prototype.toggleInfoBox = function() {
  if (this.infoBox) {
    this.hideInfoBox();
  } else {
    this.showInfoBox();
  }
}

JSRC.prototype.refreshInfoBox = function() {
  if (this.infoBox) {
    this.hideInfoBox();
    this.showInfoBox();
  }
}

JSRC.prototype.createWindow = function(content, opts) {

  if (typeof opts != 'object') opts = {};

  var wrapper = document.createElement('div');
  JSKitLib.addStyle(wrapper, 'border: 1px solid #ccc;');

  var box = document.createElement('div');
  JSKitLib.addStyle(box, 'background: #ffc; border: none; filter: alpha(opacity=90); opacity: 0.9; padding: .3em;');
  
  if (typeof content == 'string') {
    box.appendChild(JSKitLib.html(content));

  } else {
    box.appendChild(content);
  }

  wrapper.appendChild(box);


  return wrapper;

}

JSRC.prototype.createInfoBox = function() {

	var self = this;
	var ext = self.config.isExtend;
        var vars = {
                totalVotes: this.getTextForTotalVotes(this.objNum),
                avgStarRating: (function() {
                	if(self.config.view.match(/score/)){
                		if(self.objNum){
					var up = (self.objSum-self.objNum*self.raterInc)/(self.scale-self.raterInc);
					var down = self.objNum-((self.objSum-self.objNum*self.raterInc)/(self.scale-self.raterInc)); 
                			return (ext?$JRL('avgRatingExtend')+': '+$JRL('up')+': <b>'+up+'</b>, '+$JRL('down')+': <b>'+down+'</b> by '
						    : '('+$JRL('up')+': '+up+', '+$JRL('down')+': '+down+')');
                		} else {
                			return '';
                		}
                	} else {
                		return self.objAvgStarRating > 0
					? (ext?$JRL('avgRatingExtend')+' <b>'+JSKitLib.zeroPad(self.objAvgStarRating, 2)+'</b> by '
					      :'(' + JSKitLib.zeroPad(self.objAvgStarRating, 2) + '&nbsp;' + $JRL('avgRating') + ')')
					: ''
                	}
                })(),
                userRatingMsg: (function() {
                        if (self.userRating) {
                        	if(self.config.view.match(/score/)){
                                	return $JRL('yourScore') + ': ' + (self.userRating==self.raterInc? '-1' : '+1');
                        	} else {
                                	return $JRL('yourRating') + ': ' + (self.userRating / self.raterInc);
                                }
                        } else {
                                if (self.config.freeze != 'yes') {
                                        return (self.objNum) ? $JRL('youHaveNotRatedYet') : $JRL('beTheFirstToRate');
                                } else {
                                        return '';
                                }
                        }
                })()
        };

	var tmpl = JSKitLib.html(this.tmpl(this.config.isExtend ? JSRC.prototype.dtInfoBoxExtended : JSRC.prototype.dtInfoBox, vars));
	var ctls = JSKitLib.mapClass2Object({}, tmpl);

	if (this.config.freeze == "yes") {
		JSKitLib.show(ctls['js-rating-infoBoxRatingsDisabled']);
	}

	return tmpl;

}

/* Process all rating objects with the same ID */
JSRC.prototype.processSiblings = function(handler) {
  for (var i=0; i < $JRH[this.uniq].length; i++) {
    // property must match as well
    if (this.config.property || $JRH[this.uniq][i].config.property) {
      if ($JRH[this.uniq][i].config.property == this.config.property) {
        handler($JRH[this.uniq][i]);
      }
	} else if (this.config.category || $JRH[this.uniq][i].config.category) {
      if ($JRH[this.uniq][i].config.category == this.config.category) {
        handler($JRH[this.uniq][i]);
      }
    } else {
        handler($JRH[this.uniq][i]);
    }
  }
}

JSRC.prototype.rate = function(givenRating) {
  var self = this;
  var oldRating = this.userRating;
  this.setUserRating(givenRating);
  var objSum = this.objSum;
  var objNum = this.objNum;
  var objVotes = this.objVotes;
  if(oldRating) {
    objSum -= oldRating;
    objNum --;
  }
  if(this.config.view.match(/score/) && (this.config.thumbsize=='small' || this.config.thumbsize=='normal')){
    this.setTmpText($JRL('thank'));
  } else { 
    this.setTmpText($JRL('thankYou'));
  }

  // Update all ratings for this ID
  this.processSiblings(function(sibling) {
    //TODO: determine if current user increments objVotes count
    sibling.newRating({ Sum: objSum + givenRating, Num: objNum + 1, Votes: objVotes }, { Sum: givenRating });
  });

  // TODO: parametric rating
  if (window.$J$PRA && typeof $J$PRA == 'object') {
    for (var i=0; i < $J$PRA.length; i++) {
      if ($J$PRA[i].path == this.path) {
        $J$PRA[i].onRate();
      }
    }
  }

  var title = this.config.title;
  this.server(".put", "rating=" + givenRating
    + (this.config.property ? "&property=" + this.config.property : "")
    + (this.config.category ? "&category=" + this.config.category : "")
	+ (title ? ("&title=" + encodeURIComponent(title)) : "")
	+ (this.config.notop ? "&notop=true" : "")
	+ (this.config.permalink ? "&permalink=" + encodeURIComponent(this.config.permalink) : "")
	+ (this.config.thumbnail ? "&thumbnail=" + encodeURIComponent(this.config.thumbnail) : "")
	+ (this.config.view ? "&view=" + encodeURIComponent(this.config.view) : "")
	);
  // Handle any callbacks
  this.processOnRate();
}

JSRC.prototype.setUserRating = function(rating) {
  this.userRating = rating;
}

// Returns: an array of actionable rating icons 
JSRC.prototype.getRatingIcons = function() {

  if (this._ratingIcons && this._ratingIcons.length > 0) {
    return this._ratingIcons;
  }

  this._ratingIcons = this._getIcons('js-kit-rater');
  return this._ratingIcons;
}

JSRC.prototype.getObjIcons = function() {

  if (this._objIcons && this._objIcons.length > 0) {
    return this._objIcons;
  }

  this._objIcons = this._getIcons('js-kit-objIcon');
  return this._objIcons;
}

JSRC.prototype._getIcons = function(iconClass) {

  var divs = this.target.getElementsByTagName('div');
  var icons = [];
  for (var i=0; i < divs.length; i++) {
    if (divs[i].className && divs[i].className.indexOf(iconClass) >= 0) {
      icons.push(divs[i]);
    }
  }
  return icons;
}

JSRC.prototype.getTextForTotalVotes = function(votes) {
  var text;
  switch(votes) {
    case  1: text = votes + ' ' + $JRL('vote');  break;
    default: text = votes + ' ' + $JRL('votes'); break;
  }
  return $JRL(text);
}

JSRC.prototype.getTextForUserRating = function(rating) {
  var text = $JRL('yourRatingTitleCase') + ': ' + rating;
  return text;
}

JSRC.prototype.refreshTextTotal = function() {
	if(this.config.view.match(/score/)){
		this.setTextTotal("");
	} else if(this.config.isExtend) {
		var text = (this.objAvgStarRating && this.objNum) ? 
		  "Rated "+JSKitLib.zeroPad(this.objAvgStarRating,2)+" ("+this.getTextForTotalVotes(this.objNum)+")" : $JRL('unrated');
		this.setTextTotal(text);
	} else {
		var text = (this.objNum) ? this.getTextForTotalVotes(this.objNum) : $JRL('unrated');
		this.setTextTotal(text);
	}
}

JSRC.prototype.refreshTextRating = function(text) {
  if (this.userRating) {
    var text = this.getTextForUserRating(this.userRating / this.raterInc);
  } else { 
    var text = $JRL('yourRatingTitleCase');
  }
  this.setTextRating(text);
}

JSRC.prototype.setTextRating = function(text) {
  this._setText(this.textRating, text);
}

JSRC.prototype.setTextTotal = function(text) {
  this.lastSetText = text;
  if(this.tmpTextTimer)
	return;
  this._setText(this.textTotal, text);
}

JSRC.prototype.setActiveText = function(text) {
  this._setText(this.activeText, text);
}

JSRC.prototype.setTmpText = function(text) {
  var self = this;
  if(this.tmpTextTimer)
    clearTimeout(this.tmpTextTimer);
  this.tmpTextTimer = setTimeout(function() {
	self.tmpTextTimer = null;
	self.setTextTotal(self.lastSetText);
    }, 3000);
  this._setText(this.textTotal, text);
}

JSRC.prototype._setText = function(node, text) {
  if ( ! node) {
    return;
  }
  while (node.hasChildNodes()) {
    node.removeChild(node.firstChild);
  }
  node.appendChild(document.createTextNode(text));
}

JSRC.prototype.setImage = function(star, imageURL) {
	if(star.imageURL == imageURL)
		return;	// Already set and we know it
	star.imageURL = imageURL;

	JSKitLib.addPNG(star, imageURL);    
}

JSRC.prototype.setThumbImage = function(element, ud, actionable, imageURL, ignoreEmpty) {

	JSKitLib.setThumbImage( { element: element, ud: ud, actionable: actionable, imageURL: imageURL, ignoreEmpty: ignoreEmpty, numVotes: this.objNum, thumbWidth: this.starWidth, thumbHeight: this.starHeight } );

}


// Returns an single div with a specified thumb image
JSRC.prototype.createThumbImage = function(ud, actionable, imageURL, ignoreEmpty) {

	return JSKitLib.createThumbImage({ ud: ud, actionable: actionable, imageURL: imageURL, ignoreEmpty: ignoreEmpty, numVotes: this.objNum, thumbWidth: this.starWidth, thumbHeight: this.starHeight });

}

// Handles the hover state for the actionable stars
JSRC.prototype.hover = function(index) {

  if(this.tmpTextTimer) return;

  var icons = this.getRatingIcons();

  if(this.config.view.match(/score/)){
    this.setActiveText($JRL('scoreThis'));

    this.contentBoxElUp.style.opacity="0";
    this.contentBoxElUp.style.filter="alpha(opacity:0)";
    this.contentBoxElDown.style.opacity="0";
    this.contentBoxElDown.style.filter="alpha(opacity:0)";

    if(icons.length>=2){
        this.setThumbImage(icons[0],'up',1,this.Thumb[this.config.thumbsize],1);
        this.setThumbImage(icons[1],'down',1,this.Thumb[this.config.thumbsize],1);
	this.setThumbOpacity(icons[0],1);
	this.setThumbOpacity(icons[1],1);
    }
  } else {
    this.setActiveText($JRL('rateThis') + ': ' + (index / this.raterInc));
    for (var i=0; i < icons.length; i++) {
      if (index > (i * this.raterInc)) {
	this.setImage(icons[i], this.fullStar['user']);
      } else {
	this.setImage(icons[i], this.emptyStar['user']);
      }
    }
  }
}

JSRC.prototype.refreshObjRating = function() {
  var icons = this.getObjIcons();
  this._refreshRating('star', this.objEffRating, icons);
}

JSRC.prototype.calcScore = function() {
	return(this.objNum ? (this.objSum-6*this.objNum)/4 : 0);
}

JSRC.prototype.setScoreOpacity = function(icons) {
  var isfreeze=this.config.freeze=='yes'? true : false;
  var curscore=this.calcScore();
  if(icons.length>=2){
    this.setThumbImage(icons[0],'up',!isfreeze,this.Thumb[this.config.thumbsize]);
    this.setThumbImage(icons[1],'down',!isfreeze,this.Thumb[this.config.thumbsize]);
    var setTextOpacity = function(el, opacity) {
	el.style.opacity=opacity;
	el.style.filter='alpha(opacity:'+(100*opacity)+')';
    }
    if(isfreeze){
	this.setThumbOpacity(icons[0],0.6);
	this.setThumbOpacity(icons[1],0.6);
	setTextOpacity(this.contentBoxElUp, 1);
	setTextOpacity(this.contentBoxElDown, 1);
    } else if(this.objNum){
	if(curscore>0){
		this.setThumbOpacity(icons[0],1);
		this.setThumbOpacity(icons[1],0.6);
		setTextOpacity(this.contentBoxElUp, 1);
		setTextOpacity(this.contentBoxElDown, 0.6);
	} else if(curscore<0){
		this.setThumbOpacity(icons[1],1);
		this.setThumbOpacity(icons[0],0.6);
		setTextOpacity(this.contentBoxElDown, 1);
		setTextOpacity(this.contentBoxElUp, 0.6);
	} else {
		this.setThumbOpacity(icons[0],1);
		this.setThumbOpacity(icons[1],1);
		setTextOpacity(this.contentBoxElUp, 1);
		setTextOpacity(this.contentBoxElDown, 1);
	}
    } else {
	this.setThumbOpacity(icons[0],1);
	this.setThumbOpacity(icons[1],1);
	setTextOpacity(this.contentBoxElUp, 1);
	setTextOpacity(this.contentBoxElDown, 1);
    }
  }
}

JSRC.prototype.refreshUDRating = function() {
  var icons = this.getRatingIcons();
  this.setScoreOpacity(icons);
  if (this.config.view.match(/score/)){
    this.refreshContentBox('all');
  }
  if (this.defaultView == 'star') {
    this.refreshTextTotal();
  } else {
    this.refreshTextRating();
  }
}

// Resets the user rating view to their actual rating
JSRC.prototype.refreshRating = function() {

  if (this.defaultView == 'star') {
    var type = 'star';
    var comparison = this.objEffRating;
  } else {
    var type = 'user';
    var comparison = this.userRating;
  }

  var isfreeze=this.config.freeze=='yes'? true : false;
  var icons = isfreeze? this.getObjIcons() : this.getRatingIcons();
  if(this.config.view.match(/score/)){
    this.setScoreOpacity(icons);
  } else {
    this._refreshRating(type, comparison, icons);
  }

  if (this.defaultView == 'star') {
    this.refreshTextTotal();
  } else {
    this.refreshTextRating();
  }
}

JSRC.prototype._refreshRating = function(type, comparison, icons) {

  for (var i=0; i < icons.length; i++) {
    if (comparison > (i * this.raterInc)) {
      if (i * this.raterInc + (this.raterInc / 2) == comparison) {
        this.setImage(icons[i], this.halfStar[type]);
      } else {
        this.setImage(icons[i], this.fullStar[type]);
      }
    } else {
      this.setImage(icons[i], this.emptyStar[type]);
    }
  }
}

JSRC.prototype.refreshContentBox = function (refreshobj,uptext,downtext) {
	var oldTotalWidth = this.totalWidth;
	var self=this;
	var target = self.extendTarget || self.target;
	var vars={
		votedDown: downtext? downtext : (function(){
				return (self.objNum-((self.objSum-self.objNum*self.raterInc)/(self.scale-self.raterInc)))
			})(),
		votedUp: uptext? uptext : (function(){
				return ((self.objSum-self.objNum*self.raterInc)/(self.scale-self.raterInc))
			})()
	};
	if(refreshobj=='all' || refreshobj=='up'){
	  var contentUp=JSKitLib.html(this.tmpl(this.contentBoxUp,vars));
	  if(this.contentBoxElUp.hasChildNodes()){
		this.contentBoxElUp.firstChild.innerHTML=contentUp.innerHTML;
	  } else {
	  	this.contentBoxElUp.appendChild(contentUp);
	  }
	}
	if(refreshobj=='all' || refreshobj=='down'){
	  var contentDown=JSKitLib.html(this.tmpl(this.contentBoxDown,vars));
	  if(this.contentBoxElDown.hasChildNodes()){
		this.contentBoxElDown.firstChild.innerHTML=contentDown.innerHTML;
	  } else {
	  	this.contentBoxElDown.appendChild(contentDown);
	  }
	}

	if(this.userRatingBar){
		this.totalWidth=6+2*this.starWidth+this.contentBoxElUp.offsetWidth+this.contentBoxElDown.offsetWidth;
		var delta = this.totalWidth - oldTotalWidth;
		var targetMinWidth;
                if(this.config.isExtend)
                        targetMinWidth = this.totalWidth;
		else if (this.config.menu != 'no' && this.config.freeze != 'yes') {
			targetMinWidth = this.totalWidth + 6 + 10 + JSRC.INFO_IMG_WIDTH;
		} else {
			targetMinWidth = this.totalWidth + 6;
		}
		var targetWidth = target.style.width || targetMinWidth;
		if(delta>0) {
			if (parseInt(targetWidth) <= targetMinWidth) {
				target.style.width = targetMinWidth + 'px';
			}
			this.wrapper.style.width = targetMinWidth + 'px';
			this.userRatingDiv.style.width = (this.totalWidth) + 'px';
			if(this.textTotal) {
				this.textTotal.style.width = (this.totalWidth) + 'px';
			}
			this.userRatingBar.style.width = (this.totalWidth) + 'px';
		} else {
			this.userRatingBar.style.width = (this.totalWidth) + 'px';
			if(this.textTotal) {
				this.textTotal.style.width = (this.totalWidth) + 'px';
			}
			this.userRatingDiv.style.width = (this.totalWidth) + 'px';
			this.wrapper.style.width = targetMinWidth + 'px';
			if (parseInt(targetWidth) <= targetMinWidth) {
				target.style.width = targetMinWidth + 'px';
			}
		}
	}
}

JSRC.prototype.setThumbOpacity = function(element, curopacity) {
	if (JSKitLib.isPreIE7()) {
		element.parentNode.style.filter='alpha(opacity:'+(100*curopacity)+')';
	} else if (JSKitLib.isIE()) {
		element.parentNode.style.filter='progid:DXImageTransform.Microsoft.Alpha(opacity:'+(100*curopacity)+')';
	} else {
		element.style.opacity=curopacity;
	}
}

JSRC.prototype.initRating = function(rating, type, actionable) {
  var self = this;
  var node = this.cr('div');
  if(!this.config.view.match(/score/)){
    node.style.width = this.ratingBarWidth + 'px';
  }
  node.style.height = this.ratingBarHeight + 'px';

  var inf = function() {
	if(self.refreshScheduled)
		clearTimeout(self.refreshScheduled);
  }
  var outf = function() {
	if(self.refreshScheduled)
		clearTimeout(self.refreshScheduled);
	if(self.config.view.match(/score/)){
		self.refreshScheduled = setTimeout(
			function(){self.refreshScheduled=null;
			self.refreshUDRating()}, 300);
	} else {
		self.refreshScheduled = setTimeout(
			function(){self.refreshScheduled=null;
			self.refreshRating()}, 300);
	}
  }

  node.onmouseover = function() {
			if(self.refreshScheduled)
				clearTimeout(self.refreshScheduled);
		}
  node.onmouseout = outf;

  var star;

  if(this.config.view.match(/score/)){
    star = this.cr('div');
    star.style.cssFloat   = 'left';
    star.style.styleFloat = 'left';
    star.style.width    = this.starWidth + 'px';
    star.style.height   = this.starHeight + 'px';
    star.style.position = 'relative';
    star.style.overflow = 'hidden';
    star.title = '+1';

    var upThumb = this.cr('div');
    upThumb.style.width = (this.starWidth * 2)+'px';
    upThumb.style.height = (this.starHeight * 2)+'px';
    if (actionable) {
      upThumb.className += ' js-kit-rater';
      star.onmouseover = function() { inf(); self.hover(self.scale); }
      star.onmouseout  = outf;
      star.onclick     = function() { self.rate(self.scale); }
    } else {
      upThumb.className += ' js-kit-objIcon';
    }
    var startmp= this.cr('div');
    startmp.style.position='absolute';
    startmp.style.width    = this.starWidth + 'px';
    startmp.style.height   = this.starHeight + 'px';
    var startmp2;
    if(JSKitLib.isIE() && !JSKitLib.isPreIE7()){
	    startmp2=this.cr('div');
	    startmp2.style.width    = (this.starWidth * 2) + 'px';
	    startmp2.style.height   = (this.starHeight * 2)  + 'px';
	    startmp2.appendChild(upThumb);
	    startmp.appendChild(startmp2);
	    this.setThumbImage(upThumb,'up',actionable,this.Thumb[this.config.thumbsize]);
    } else {
	    startmp.appendChild(upThumb);
	    this.setThumbImage(upThumb,'up',actionable,this.Thumb[this.config.thumbsize]);
    }
    star.appendChild(startmp);
    node.appendChild(star);

    star = this.cr('div');
    star.style.cssFloat   = 'left';
    star.style.styleFloat = 'left';
    star.style.height = this.ratingBarHeight + 'px';
    this.contentBoxElUp=star;
    node.appendChild(star);

    star = this.cr('div');
    star.style.cssFloat   = 'left';
    star.style.styleFloat = 'left';
    star.style.width    = this.starWidth + 'px';
    star.style.height   = this.starHeight + 'px';
    star.style.position = 'relative';
    star.style.overflow = 'hidden';
    star.style.marginTop = '1px';
    star.title = '-1';

    var downThumb = this.cr('div');
    downThumb.style.width = (this.starWidth * 2)+'px';
    downThumb.style.height = (this.starHeight * 2)+'px';
    if (actionable) {
      downThumb.className += ' js-kit-rater';
      star.onmouseover = function() { inf(); self.hover(self.raterInc); }
      star.onmouseout  = outf;
      star.onclick     = function() { self.rate(self.raterInc); }
    } else {
      downThumb.className += ' js-kit-objIcon';
    }
    startmp= this.cr('div');
    startmp.style.position='absolute';
    startmp.style.width    = this.starWidth + 'px';
    startmp.style.height   = this.starHeight + 'px';
    if(JSKitLib.isIE() && !JSKitLib.isPreIE7()){
	    startmp2=this.cr('div');
	    startmp2.style.width    = (this.starWidth * 2) + 'px';
	    startmp2.style.height   = (this.starHeight * 2) + 'px';
	    startmp2.appendChild(downThumb);
	    startmp.appendChild(startmp2);
	    this.setThumbImage(downThumb,'down',actionable,this.Thumb[this.config.thumbsize]);
    } else {
	    startmp.appendChild(downThumb);
	    this.setThumbImage(downThumb,'down',actionable,this.Thumb[this.config.thumbsize]);
    }
    star.appendChild(startmp);
    node.appendChild(star);

    star = this.cr('div');
    star.style.cssFloat   = 'left';
    star.style.styleFloat = 'left';
    star.style.height = this.ratingBarHeight + 'px';
    this.contentBoxElDown=star;
    node.appendChild(star);

    this.refreshContentBox('all');
  } else {
    /* Increment by Full Star Ratings */
    for (var i=this.raterInc; i <= this.scale; i += this.raterInc) {

      star = this.cr('div');

      star.style.cssFloat   = 'left';
      star.style.styleFloat = 'left';
      star.style.width    = this.starWidth + 'px';
      star.style.height   = this.starHeight + 'px';

      if (rating + this.raterInc > i) {
        if (rating + this.raterInc - i >=  this.raterInc) {
	  this.setImage(star, this.fullStar[type]);
        } else {
	  this.setImage(star, this.halfStar[type]);
        }
      } else {
        this.setImage(star, this.emptyStar[type]);
      }

      if (actionable) {
        (function(i) {
        star.className += ' js-kit-rater';
        star.onmouseover = function() { inf(); self.hover(i); }
        star.onmouseout  = outf;
        star.onclick     = function() { self.rate(i); }
       })(i);
      } else {
        star.className += ' js-kit-objIcon';
      }
      node.appendChild(star);
    }
  }

  if (actionable) {
    node.style.cursor = 'pointer';
  }

  return node;
}


JSRC.prototype.getCommentsAppObject = function() {
  if (this.isStandalone()) {
    return null; 
  } else {
    return $JSKitGlobal.getCommentsAppObject(this.uniq);
  }
}

JSRC.prototype.hasCommentsAppObject = function() {
  return this.getCommentsAppObject() ? true : false;
}

JSRC.prototype.clone = function(node, options) {
  if ( ! options) {
    options = {};
  }

  var clone = new JSRC(node, {
    'newRating' : {
      'objSum' : this.objSum,
      'objNum' : this.objNum,
      'userRating' : this.userRating
    },
    'path' : options.path || this.config.path,
    'view' : options.view || this.config.view,
    'notop' : options.notop || this.config.notop,
    'commentprompt' : options.commentprompt || this.config.commentprompt,
    'starcolor' : options.starcolor || this.config.starcolor,
    'usercolor' : options.usercolor || this.config.usercolor,
    'imageurl' : options.imageurl || this.config.imageurl,
    'imagesize' : options.imagesize || this.config.imagesize,
    'menu' : options.menu || this.config.menu

  });

  return clone;
}

// Part of externally useable API
JSRC.prototype.rerender = function() {
	this.getRatingDataFromServer();    
}

JSRC.prototype.newRating = function() {
  var args = arguments;
  if(typeof args[0] != 'object')
    args = [ args[3], args[4], args[5] || {} ];
  var community = args[0];
  var user = args[1] || { Sum: 0 };
  var opts = args[2] || { admin: false};
  if(opts.sitecfg) {
	var propsMap = {
		"ratings-info-on-rate": "showinfoonrate"
	};
	JSKitLib.fmap.call(this, opts.sitecfg, function(v,k) {
		if(propsMap.hasOwnProperty(k))
			this.config[propsMap[k]] = v;
	});
  }

  this.isAdmin = opts.admin;
  this.config.isExtend = this.config.isExtend || community.isExtend;
  if(this.config.isExtend) JSKitLib.addClass(this.target, "js-ratingsExtend");

  if(user.frozen) this.config.freeze = "yes";


  this.objSum = community.Sum;
  this.objNum = community.Num;
  this.objVotes = community.Votes || community.Num;
  this.userRating = user.Sum;
  if(this.config.view.match(/score/)){
    if(this.objNum){
      this.objAvgStarRating = JSKitLib.round(((this.objSum / this.objNum)-(this.scale+this.raterInc)/2)/ this.raterInc, 2);
    } else {
      this.objAvgStarRating = 0;
    }
  } else {
    this.objAvgStarRating = JSKitLib.round((this.objSum / this.objNum) / this.raterInc, 2);
  }
  this.objEffRating = Math.round(this.objSum / this.objNum) || 0;  // Used for star display purposes

  if(this.refreshScheduled) {
	clearTimeout(this.refreshScheduled);
	this.refreshScheduled = null;
  }

  if (this.constructed) {
    this.refreshTextTotal();
    this.refreshObjRating();
    if(this.config.view.match(/score/)){
      this.refreshUDRating();
    } else {
      this.refreshRating();
    }
  } else {
    this.constructed = true;
    this.display();
  }

  // TODO: use JSKitGlobal
  if (window.$J$PRA && typeof $J$PRA == 'object') {
    for (var i=0; i < $J$PRA.length; i++) {
        $J$PRA[i].updateComposite();
    }
  }

}

JSRC.prototype.showInfoBox = function(xOpts) {

	// Only one infobox should be displayed at a time
	JSKitLib.map(function(obj) { obj.hideInfoBox(); }, $JRA);

	var div = this.cr('div');
	var pos = JSKitLib.findPos(this.target);
	JSKitLib.setStyle(div, 'width: ' + JSRC.INFOBOX_WINDOW_WIDTH + 'px; position: absolute; top: ' + (pos[3] + 3) + 'px; z-index:15500;');

	// If rating widget is too close to left side, show on the right side
	if (pos[0] > JSRC.INFOBOX_WINDOW_WIDTH || this.totalWidth >= JSRC.INFOBOX_WINDOW_WIDTH) {
		div.style.left = (pos[2] - JSRC.INFOBOX_WINDOW_WIDTH - 6) + 'px'; // 3px margin
	} else {
		div.style.left = pos[0] + 'px'; // 3px margin
	}
	JSKitLib.removeChildren(this.infoBoxWrapper);
	this.infoBoxWrapper.appendChild(div);
	var infoBox = new JSRTC(div, { count: 3 }, this, xOpts);

	this.infoBox = infoBox;

}

if(!window.$JRTA) {
  var $JRTA = [];
  var $JRTLT = { 
    vote: 'voto',
    votes: 'votos',
    msgNoHotItems: 'There are currently no Hot items on this site.',
    msgNoUserItems: 'Voc&ecirc; ainda n&atilde;o votou.',
    msgNoTopItems: 'There are currently no Top Rated items on this site.',
    adminMsgPermalinkHelp: 'This new "My" tab will allow your users to build their own personal list of their favorite content on your site.<br><br>All you need to do is add permalink and title attributes to your rateable content.<br><br>For further information, see the <a href="http://wiki.js-kit.com/Admin-Guide#JSKitpath/permalinkattributes">FAQ on JS-Kit path/permalink attributes</a>, or <a href="http://js-kit.com/support/">contact Support Team</a> for assistance.',
    adminMsgNoRatings: 'There are currently no items in your Top Rated view.  Listings will be displayed when enough votes have been collected.',
    adminMsgNoRatingsNoHot: 'There are currently no items in your Hot view.  Listings will be displayed when enough data has been collected.',
    adminMsgAlert: 'Testing',
    hotInProgress: 'JS-Kit is measuring raters\' activity to present the most popular items here. Please allow some time for meaningful data to be collected.'
  };
  var $JRTL = window.JSRTC_Translate || function(t) { return $JRTLT[t] || t; }
}

/* Constants */

JSRTC.DOMAIN = (window.location.protocol.substr(0, 4) != 'http' ? 'http:' : '')
              + '//js-kit.com';
JSRTC.IMG_DIR = JSRTC.DOMAIN + '/images/top';
JSRTC.SKIN_DIR = JSRTC.IMG_DIR + '/skins';

/* CSS Base Style */
// Note: This differs from JSRC.CSS in that the keys here are complete
JSRTC.CSS = {

	// User Generic
	'.js-ratingWrapper': 'position: relative; margin: 3px;',
	'.js-rTopFont': 'font-family: Arial; font-size: 11px; font-weight: bold;',
	'.js-rTopTitleFont': 'font-weight: bold;',
	'.js-rTopTabFont': 'font-weight: bold;',
	'.js-rTopDetailFont': 'font-family: Arial; font-size: 11px; font-weight: bold;',
	'.js-rTopRowColor1': '', 
	'.js-rTopRowColor2': '',
	'.js-starRatingDiv': 'float: left; margin: 0px 10px 0px 0px;',

	// General 
	'div.js-rTopFrame': 'background: #f8f8f8; border: solid 1px #e0e0e0; padding: 0; margin: 0.5em; -moz-user-select: none; -webkit-box-shadow: 0px 10px 50px #222; cursor: default; z-Index: 15000;', 
	'div.js-rTop': 'cursor: default; border: solid 1px #f8f8f8; padding:1px;', 
	'div.js-rTopBg': 'width: 100%;', // width needed for ie redraw
	'div.js-rTopView': 'margin: -2pt -2px 0px; padding: 0 0 1px 0; zoom: 1;',
	'div.js-rTopBody': 'margin: 0;',
	'div.js-rTopTop': 'margin: 0;',
	'div.js-rTopHot': 'margin: 0;',
	'.js-nsgecko': '-moz-user-select: none;',

	// New Extend skin .js-ratingsExtend

	'.js-Rating': 'border: 3px solid #ececec; font-family: Arial; font-weight: bold; font-size:11px; background-color: #FFFFFF;',
	'.js-RatingData': 'padding: 7px;',
	'.js-RatingData table': 'border: 0px; border-collapse: collapse;',
	'.js-RatingData table td': 'padding: 0px;',
	'.js-RatingText': 'margin-left: 5px; color: #a3a3a3',
	'.js-RatingNavAd': 'font-size: 9pt; margin-top: 5px; zoom: 1;',
	'.js-RatingNavView': 'margin-top: 13px;',
	'.js-ratingsExtend .js-ratingWrapper': 'position: relative; margin: 3px 3px 3px 0px;',
	'.js-ratingsExtend .js-rTopNav': 'border-bottom: 1px solid #ebebeb; font-size: 8pt; font-weight: normal;',
	'.js-ratingsExtend .js-rTopNavTabActive': 'background-color: #ebebeb; color: #767676;',
	'.js-ratingsExtend .js-rTopNavTab': 'padding: 2px 4px; height: auto; margin: 0px; border: none; background-image: none;',
	'.js-ratingsExtend .js-rTopNavTabWrap': 'float:none;',
	'.js-ratingsExtend .js-rTop': 'padding: 0px; border: none; font-size: 9pt',
	'.js-ratingsExtend .js-rTopView': 'background: none; margin: 0px; padding: 0px',
	'.js-ratingsExtend .js-rTopBody': 'border-bottom: 1px solid #ebebeb; padding: 5px 0px 7px 0px;',
	'.js-ratingsExtend .js-rTopFrame': 'background: transparent; border: none; padding: 0; margin: 0; -moz-user-select: none; -webkit-box-shadow: none; ',
	'.js-ratingsExtend .js-starRatingDiv': 'margin: 0px 0px 7px 0px;',


	// New Extend skin Top rated .js-ratingsExtend
	'.js-ratingsExtend .js-rTopItem': 'padding: 0px;',
	'.js-ratingsExtend .js-rTopItem table': 'table-layout: fixed; width: 100%;',
	'.js-ratingsExtend .js-rTopItemRating': 'color: #c2c2c2; margin-left: 5px;',
	'.js-ratingsExtend .js-rTopItemLink': 'white-space: nowrap; margin-right: 5px; color: #3366ff; font-size: 9pt; text-decoration: none',

	// New Extend skin Hot
	'.js-ratingsExtend .js-rTopHotItem': 'padding: 0px;',
	'.js-ratingsExtend .js-rTopHotItemInfo': 'color: #c2c2c2',
	'.js-ratingsExtend .js-rTopHotItemLink': 'white-space: nowrap; color: #3366ff; font-size: 9pt; text-decoration: none',

	// New Extend Top Score .js-ratingsExtend
	'.js-ratingsExtend .js-rTopScoreItem': 'color: #3d6883; padding: 0px;',
	'.js-ratingsExtend .js-rTopScoreItemInfo': 'font-size: 8pt;',
	'.js-ratingsExtend .js-rTopScoreItemStars': 'margin-right: 5px;',
	'.js-ratingsExtend .js-rTopScoreItemRate': 'width: 30px; margin-top: 3px',
	'.js-ratingsExtend .js-rTopScoreItemLink': 'white-space: nowrap; color: #3366ff; text-decoration: none',
	'.js-ratingsExtend .js-rTopItemScoreRating': 'margin-left: 5px; color: #c2c2c2',

	//New Extend skin Footter in navigator .js-ratingsExtend
	'.js-ratingsExtend .js-rTopFooter': 'display: none;',
	'.js-ratingsExtend .js-RatingPoweredBy': 'width: 100%; text-align: right; background-color: #fbfbfb; font-size:8pt; padding: 3px 0;',
	'.js-ratingsExtend .js-rTopPoweredByLink': 'color: #c7c7c7; font-family: Arial; padding-right: 5px; text-decoration: none',

	// Tab Navigation
	'div.js-rTopNav': 'margin: 0;',
	'div.js-rTopNavTabWrap': 'float: left;',
	'div.js-rTopNavTab': 'height: 1.6em; padding-top: 0.4em; text-align: center; cursor: pointer; margin-top: 1px; border-left: 1px solid #e0e0e0; border-bottom: 1px solid #e0e0e0;',
	'div.js-rTopNavTabActive': 'border-bottom: none; cursor: default;',
	'div.js-rTopNavTabLeft': 'border-left: none;',
	'div.js-rTopNavTabRight': 'border-right: none;',

	// Top Rated
	'div.js-rTopItems': 'margin: 0; text-align: left;',
	'div.js-rTopItem': 'padding: 0.3em 0.6em;',
	'div.js-rTopItem table': 'border: 0px; border-collapse: collapse;',
	'div.js-rTopItem table td': 'padding: 0px;',
	'span.js-rTopItemCounter': 'margin-right: .3em;',
	'a.js-rTopItemLink': 'zoom: 1;',
	'span.js-rTopItemRating': 'margin: 0; white-space: nowrap',

	// User Top Rated
	'div.js-rTopUserItems': 'margin: 0; text-align: left;',
	'div.js-rTopUserItem': 'padding: 0.3em 0.6em;',
	'a.js-rTopUserItemLink': 'zoom: 1;',

	'div.js-rTopUserThisItems': 'margin: 0; text-align: left;',
	'div.js-rTopUserThisItem': 'padding: 0.3em 0.6em;',
	'a.js-rTopUserThisItemLink': 'zoom: 1;',

	// Top Scored
	'div.js-rTopScoreItems': 'margin: 0; text-align: left;',
	'div.js-rTopScoreItem': 'padding: 0.3em 0.6em 0.3em 0.6em;',
	'span.js-rTopScoreItemCounter': 'margin-right: .3em;',
	'div.js-rTopScoreItemInfo': 'margin-top: 0.0em;',
	'a.js-rTopScoreItemLink': 'zoom: 1;',
	'span.js-rTopScoreItemRating': 'margin: 0; white-space: nowrap',

	// Hot
	'div.js-rTopHotItems': 'margin: 0; text-align: left;',
	'div.js-rTopHotItem': 'padding: 0.3em 0.6em;',
	//'span.js-rTopHotItemInfo': 'margin: 0.2em .4em .3em 0;',
	'a.js-rTopHotItemLink': 'zoom: 1;',

	// User Top Scored
	'div.js-rTopUserScoreItems': 'margin: 0; text-align: left;',
	'div.js-rTopUserScoreItem': 'padding: 0.3em 0.6em 0.3em 0.6em;',
	'div.js-rTopUserScoreItemInfo': 'margin: 0.2em 0;',
	'a.js-rTopUserScoreItemLink': 'zoom: 1;',

	'div.js-rTopUserThisScoreItems': 'margin: 0; text-align: left;',
	'div.js-rTopUserThisScoreItem': 'padding: 0.3em 0.6em 0.3em 0.6em;',
	'div.js-rTopUserThisScoreItemInfo': 'margin: 0.2em 0;',
	'a.js-rTopUserThisScoreItemLink': 'zoom: 1;',

	// Footer
	'div.js-rTopFooter': 'padding: 0; margin: 0; overflow: hidden; position: relative; zoom: 1;',
	'div.js-rTopPoweredBy': 'text-align:right; cursor: pointer; font-size:8pt; padding-bottom: 3px; padding-right:5px;',
	'div.js-rTopPoweredByLink': 'font-family: Arial; text-decoration: none;',
	'div.js-rTopBodyMsg': 'padding: 0.7em 0.5em 0.3em 0.5em;',
	'div.js-rTopBodyAdminMsg': 'padding: 0.7em 0.5em;',
	'div.js-rTopBodyAdminMsgHeader': 'padding-bottom: 0.3em; font-size:12pt; font-weight: bold;',
	'div.js-rTopBodyAdminMsgBody': '',

	'.js-ratingsExtend .js-rTopBodyAdminMsgHeader': 'font-size:9pt;',  
	'.js-ratingsExtend .js-rTopFont': 'font-size:9pt;' 

}

JSRTC.writeCSS = function() {

	var css = '';
	for (prop in JSRTC.CSS) {
		css += prop + ' {' + JSRTC.CSS[prop] + '}';
	}
	JSKitLib.addCss(css, "js-RatingsTopCssText");
}

JSRTC.writeCSS();

/* Object and Methods */

// TODO: how do we want to handle skins, etc?
JSRTC.writeSkinCSS = function() {

	var titleFont = '';
	var tabFont = '';
	var navTab = '';
	var detailFont = '';
	var msgBody = '';

	var skin = 'ice';

	if (skin != 'none') {
		var skinDir = JSRTC.SKIN_DIR + '/' + skin;
		var header = 'background: url(' + skinDir + '/navi-header-bg.gif) -20px top repeat; border: none;';
		var footer = 'background-color: #fff';
		var view = 'background: #ffffff url(' + JSRTC.IMG_DIR + '/navi-tab-front-bg.gif) top repeat-x;';
		var rowColor2 = "background: #f8f8f8;";
		var navTab = "background: url(" + JSRTC.IMG_DIR + "/navi-tab-back-bg.gif) 0 -1px repeat-x;";
		var adminNote = 'color: #009933';
		switch (skin) {
			case 'default':
				titleFont = ' color: #435362';
				tabFont = ' color: #0B5F79';
				detailFont = ' color: #435362';
				msgBody = ' color: #435362';
				break;
			case 'ice':
				titleFont = ' color: #3d6883';
				tabFont = ' color: #0B5F79';
				detailFont = ' color: #3d6883';
				msgBody = ' color: #3d6883';
				break;
			case 'silver':
				titleFont = ' color: #5d5954';
				tabFont = ' color: #0B5F79';
				detailFont = ' color: #5d5954';
				msgBody = ' color: #5d5954';
				break;
			case 'suede':
				titleFont = ' color: #603a13';
				tabFont = ' color: #9a6329';
				detailFont = ' color: #603a13';
				msgBody = ' color: #603a13';
				break;
			default:
				break;
		}
	} else {
		var skinDir = JSRTC.SKIN_DIR + '/none';
		var poweredBy = 'background: url(' + skinDir + '/navi-footer-buttons.gif) -20px -32px no-repeat;';
	}

	var css 
		= "div.js-rTopHeader {" + header + "}"
		+ ".js-rTopTitleFont {" + titleFont + "}"
		+ "div.js-rTopView {" + view + "}"
		+ ".js-rTopTabFont {" + tabFont + "}"
		+ "div.js-rTopNavTab {" + navTab + "}"
		+ ".js-rTopDetailFont {" + detailFont + "}"
		+ "div.js-rTopFooter {" + footer + "}"
		+ "div.js-rTopPoweredByLink {" + tabFont + "}"
		+ ".js-rTopRowColor2 {" + rowColor2 + "}"
		+ "div.js-rTopBodyMsgBody {" + msgBody + "}"
		+ "div.js-rTopBodyAdminMsgBody {" + msgBody + "}"
		+ "div.js-rTopNavTabActive { background: none; }"
		+ "a.js-rTopItemLink {" + tabFont + "}"
		+ "a.js-rTopScoreItemLink {" + tabFont + "}"
		+ "a.js-rTopHotItemLink {" + tabFont + "}"
		+ "a.js-rTopUserItemLink {" + tabFont + "}"
		+ "a.js-rTopUserScoreItemLink {" + tabFont + "}"
		+ "div.js-rTopBodyAdminMsgHeader {" + adminNote + "}"
		;
	JSKitLib.addCss(css, "js-RatingsTopSkinCss");
}

JSRTC.writeSkinCSS();

/* Class JSRTC */
function JSRTC(target, options, parentObj, xOpts) {
	this.jtaIndex = $JRTA.length;
	$JRTA.push(this);
	this.cr = function(tag) { return document.createElement(tag); }
	var wl = window.location;

	this.parentObj = parentObj;
	this.target = target;


	// Tab/Body data
	this.views = [];

	this.part = {}; // TR, HH, HD, HW parent object

	this.starWidth = 9;
	this.starHeight = 9;

	var self = this;

	/* Config */
	this.config = {};
	this.config.inline = {};
	this.config.server = {}; // config from server, or recently saved
	this.config.get = function(key) { return self.config.inline[key] || self.config.server[key] }; 
	this.config.getInline = function(key) { return self.config.inline[key] }; 
	this.config.getServer = function(key) { return self.config.server[key] }; 

	// TODO: change over to standard config function
	var iConfig = {};
	iConfig.skin = options["skin"] || 'default';
	iConfig.target = options["target"] || '';
	iConfig.category = options["category"] || '';
	if (options["count"]) 
		iConfig.count = options["count"];

	this.config.inline = iConfig;

	this.domain = target.getAttribute("site") || parentObj.config.domain;
	this.domain = this.domain.replace(/^[a-z]+:\/\//, '');
	this.domain = wl.protocol + "//" + this.domain;

	this.server = function(smod, ext, data) {
		if ($JSKitGlobal.bestofDataLoading) return;
		$JSKitGlobal.bestofDataLoading = true;
		var wl = window.location;
		var sc = self.cr("script");
		sc.setAttribute("charset", "utf-8");

		var categ =  self.config.get('category') ? "&category=" + self.config.get('category') : "";
		sc.src = JSRTC.DOMAIN + '/' + smod + ext
			+ "?ref="
			+ encodeURIComponent(JSKitLib.getRef(self.parentObj))
			+ "&" + data
			+ "&" + JSKitEPB.getURIEncodedSerialize()
			+ "&" + categ
		self.target.appendChild(sc);
		sc.onload = sc.onreadystatechange = function() { $JSKitGlobal.bestofDataLoading = false; };
		return false;
	}
	this.serverPut = function(ext, data) { return self.server("navapi.cgi/", ext, data); }

	// Process xOpts (additional values we may need passed in by callee)
	this.xOpts = (typeof xOpts == 'object') ? xOpts : {};

	self.server("bestof", "-data.js","app=mininav&jx="+self.jtaIndex+"&count="+self.config.get('count'));

}

JSRC.prototype.dtExtend
 = '<div class="js-Rating">'
     +'<div class="js-RatingData">'
       + '<table class="js-RatingStarsView"><tbody><tr>'
         + '<td><div class="js-RatingStars"></div></td>'
         + '<td><div class="js-RatingText"></div></td>'
       + '</tbody></tr></table>'	
       + '<div class="js-RatingNavView"></div>'
       + '<div class="js-RatingNavAd"></div>'
     +'</div>'
     + '<div class="js-RatingPoweredBy">'
       + '<a class="js-rTopPoweredByLink" target="_blank" href="http://www.serietotal.com/"><b><p style="font-family: Arial; color: #10a7c6;">S&Eacute;RIE TOTAL</p></b></a>'
     + '</div>'
'</div>';

// TODO: templates should all be dynamic
JSRTC.prototype.getMainTemplate = function(skin) {
	var html  
	= '<div style = "word-wrap:break-word" class="js-rTopFrame">'
	 + '<div class="js-rTop">' 
	  + '<div class="js-rTopBg">' 
	   + '<div class="js-rTopHeader"></div>'
	   // View is instance of a Tab/Body 
	   + '<div class="js-rTopView">'
	    + '<div class="js-rTopNav js-rTopTabFont"></div>'  // Tab Navigation
	    + '<div class="js-rTopBody"></div>' // Body 
	   + '</div>'
	   // Top Footer
	   + '<div class="js-rTopFooter">'
	    + '<div class="js-rTopPoweredBy">'
	     + '<a class="js-rTopPoweredByLink" target="_blank" href="http://www.serietotal.com/"><b><p style="font-family: Arial; color: #10a7c6;">S&Eacute;RIE TOTAL</p></b></a>'
	    + '</div>'
	   + '</div>'
	   + '<div style="clear:both;"></div>'
	  + '</div>'  // js-rTopBg
	 + '</div>'  // js-rTop
	+ '</div>' ;
	return html;
} 

JSRTC.prototype.dtBodyAdminMsg
 = '<div class="js-rTopBodyAdminMsg">'
  + '<div class="js-rTopBodyAdminMsgHeader">'
   + '<span>Hello admin:</span>'
  + '</div>'
  + '<div class="js-rTopBodyAdminMsgBody js-rTopFont"></div>'
 + '</div>'
;

JSRTC.prototype.dtBodyMsg
 = '<div class="js-rTopBodyMsg">'
  + '<div class="js-rTopBodyMsgBody js-rTopFont"></div>'
 + '</div>'
;
 
JSRTC.prototype.getdtBodyTop = function(){
	var html;
	if(this.xOpts.skin == "Extend")
		html
		 = '<div class="js-rTopTop">'
		  + '<div class="js-rTopItems">'
		   + '<div class="js-rTopItem">'
		     + '<table><tbody><tr>'
		      + '<td style="width: 50px"><div class="js-rTopItemStars"></div></td>'
		      + '<td><div style="overflow:hidden; width:100%; white-space:nowrap; '+(JSKitLib.isIE()?'height: 1.3em;':'')+'"><a class="js-rTopItemLink" href="{url}">{title}</a></div></td>'
		      + '<td style="width:75px;"><span class="js-rTopItemRating js-rTopDetailFont">{rating}&nbsp;({votes})</span></td>'
		     + '</tr></tbody></table>'
		   + '</div>'
		  + '</div>'
		 + '</div>';
	else
		html
		 = '<div class="js-rTopTop">'
		  + '<div class="js-rTopDetailFont" style="color: white; background-color:#10a7c6; margin: .5em .8em 0 .8em; padding: 2px 5px; text-align:center;">Postagens mais votadas</div>'
		  + '<div class="js-rTopItems">'
		   + '<div class="js-rTopItem">'
		    + '<a class="js-rTopItemLink js-rTopFont" href="{url}">{title}</a>'
		    + '<div class="js-rTopItemInfo">'
		     + '<table><tbody><tr><td valign="middle">'
		      + '<div class="js-rTopItemStars"></div>'
		     + '</td><td>'
		      + '<span class="js-rTopItemRating js-rTopDetailFont">{rating}&nbsp;({votes})</span>'
		     + '</td></tr></tbody></table>'
		    + '</div>'
		   + '</div>'
		  + '</div>'
		 + '</div>';
	return html;
}

JSRTC.prototype.getdtBodyTopScore = function(){
        var html;                                                                                                                             if(this.xOpts.skin == "Extend")
		html
		 = '<div class="js-rTopTopScore">'
		  + '<div class="js-rTopScoreItems">'
		   + '<div class="js-rTopScoreItem">'
		    + '<div class="js-rTopScoreItemInfo">'
		     + '<table cellspacing="0" cellpadding="0" border="0"><tbody><tr>'
		       + '<td valign="middle"><div class="js-rTopScoreItemStars"></div></td>'
		       + '<td><div class="js-rTopScoreItemRate"><b>{rating}</b></div></td>'
		       + '<td><a class="js-rTopScoreItemLink js-rTopFont" href="{url}">{title}</a></td>'
		      + '<td><span class="js-rTopItemScoreRating js-rTopDetailFont">({votes})</span></td>'
		     + '</td></tr></tbody></table>'
		    + '</div>'
		   + '</div>'
		  + '</div>'
		 + '</div>';
	else 
		html
		 = '<div class="js-rTopTopScore">'
		  + '<div class="js-rTopDetailFont" style="color: black; background-color:#ffa; margin: .5em .8em 0 .8em; padding: 2px 5px; text-align:center;">Sitewide top rated objects</div>'
		  + '<div class="js-rTopScoreItems">'
		   + '<div class="js-rTopScoreItem">'
		    + '<a class="js-rTopScoreItemLink js-rTopFont" href="{url}">{title}</a>'
		    + '<div class="js-rTopScoreItemInfo">'
		     + '<table cellspacing="0" cellpadding="0" border="0"><tbody><tr><td valign="middle">'
		      + '<div class="js-rTopScoreItemStars" style="padding-right:5px;"></div>'
		     + '</td><td>'
		      + '<span class="js-rTopItemScoreRating js-rTopDetailFont"><b>{rating}</b>&nbsp;({votes})</span>'
		     + '</td></tr></tbody></table>'
		    + '</div>'
		   + '</div>'
		  + '</div>'
		 + '</div>';
	return html;	
}

JSRTC.prototype.getdtBodyHot = function(){
        var html;
        if(this.xOpts.skin == "Extend")
		html
		 = '<div class="js-rTopHot">'
		   + '<div class="js-rTopHotItems">'
		    + '<div class="js-rTopHotItem">'
		     + '<a class="js-rTopHotItemLink js-rTopFont" href="{url}">{title}</a>'
		     + '<span class="js-rTopHotItemInfo js-rTopDetailFont"> ({votes})</span>'
		    + '</div>'
		   + '</div>'
		  + '</div>'
	else
		html
		 = '<div class="js-rTopHot">'
		  + '<div class="js-rTopDetailFont" style="color: white; background-color:#10a7c6; margin: .5em .8em 0 .8em; padding: 2px 5px; text-align:center;">&Uacute;ltimas postagens avaliadas</div>'
		   + '<div class="js-rTopHotItems">'
		    + '<div class="js-rTopHotItem">'
		     + '<a class="js-rTopHotItemLink js-rTopFont" href="{url}">{title}</a>'
		     + '<table cellspacing="0" cellpadding="0" border="0"><tbody><tr><td valign="middle">'
		      + '<span class="js-rTopHotItemInfo js-rTopDetailFont"> ({votes})</span>'
		     + '</td></tr></tbody></table>'
		    + '</div>'
		   + '</div>'
		  + '</div>';
	return html;
}

JSRTC.prototype.dtBodyUser
 = '<div class="js-rTopUser">'
  + '<div class="js-rTopUserThis" style="display: none">'
  + '<div class="js-rTopDetailFont" style="color: white; background-color:#10a7c6; margin: .5em .8em 0 .8em; padding: 2px 5px; text-align:center;">Meu voto nessa postagem</div>'
  + '<div class="js-rTopUserThisItems">'
   + '<div class="js-rTopUserThisItem">'
    + '<a class="js-rTopUserThisItemLink js-rTopFont" href="{url}">{title}</a>'
    + '<div class="js-rTopUserThisItemInfo">'
     + '<table cellspacing="0" cellpadding="0" border="0"><tbody><tr><td valign="middle">'
      + '<div class="js-rTopUserThisItemStars"></div>'
     + '</td><td>'
      + '<span class="js-rTopItemRating js-rTopDetailFont">&nbsp;</span>' // Needed for even spacing with dtBodyTop
     + '</td></tr></tbody></table>'
    + '</div>'
   + '</div>'
  + '</div>'
 + '</div>'
  + '<div class="js-rTopUserOther" style="display: none">'
  + '<div class="js-rTopDetailFont" style="color: white; background-color:#10a7c6; margin: .5em .8em 0 .8em; padding: 2px 5px; text-align:center;">Meus outros votos</div>'
  + '<div class="js-rTopUserItems">'
   + '<div class="js-rTopUserItem">'
    + '<a class="js-rTopUserItemLink js-rTopFont" href="{url}">{title}</a>'
    + '<div class="js-rTopUserItemInfo">'
     + '<table cellspacing="0" cellpadding="0" border="0"><tbody><tr><td valign="middle">'
      + '<div class="js-rTopUserItemStars"></div>'
     + '</td><td>'
      + '<span class="js-rTopItemRating js-rTopDetailFont">&nbsp;</span>' // Needed for even spacing with dtBodyTop
     + '</td></tr></tbody></table>'
    + '</div>'
   + '</div>'
  + '</div>'
 + '</div>'

 + '</div>'
;

JSRTC.prototype.dtBodyUserScore
 = '<div class="js-rTopUserScore">'
  + '<div class="js-rTopUserThisScore" style="display: none">'
  + '<div class="js-rTopDetailFont" style="color: black; background-color:#ffa; margin: .5em .8em 0 .8em; padding: 2px 5px; text-align:center;">My vote on this object</div>'
  + '<div class="js-rTopUserThisScoreItems">'
   + '<div class="js-rTopUserThisScoreItem">'
    + '<table cellspacing="0" cellpadding="0" border="0"><tbody><tr><td valign="top">'
     + '<div class="js-rTopUserThisScoreItemStars" style="padding-right: 5px; padding-top: .2em;"></div>'
    + '</td><td>'
     + '<div><a class="js-rTopUserThisScoreItemLink js-rTopFont" href="{url}">{title}</a></div>'
    + '</td></tr></tbody></table>'
   + '</div>'
  + '</div>'
  + '</div>'
  + '<div class="js-rTopUserOtherScore" style="display: none">'
  + '<div class="js-rTopDetailFont" style="color: black; background-color:#ffa; margin: .5em .8em 0 .8em; padding: 2px 5px; text-align:center;">My recent top ratings</div>'
  + '<div class="js-rTopUserScoreItems">'
   + '<div class="js-rTopUserScoreItem">'
    + '<table cellspacing="0" cellpadding="0" border="0"><tbody><tr><td valign="top">'
     + '<div class="js-rTopUserScoreItemStars" style="padding-right: 5px; padding-top: .2em;"></div>'
    + '</td><td>'
     + '<div><a class="js-rTopUserScoreItemLink js-rTopFont" href="{url}">{title}</a></div>'
    + '</td></tr></tbody></table>'
   + '</div>'
  + '</div>'
 + '</div>'
 + '</div>'
 + '</div>'
;

JSRTC.prototype.gtmpl = function(t) {
	var lowercase = function(a, m) { return String(m).toLowerCase(); }
	t = t.replace(/^[^<]*(<.*>)[^>]*$/m, "$1");
	t = t.replace(/(<[\/]?[A-Z]+)/g, lowercase);
	t = t.replace(/{Label:([^}]*)}/g,function(a,m){return $JRTL(m);});
	return t;
}

JSRTC.prototype.tmpl = function(t, obj) {
	var self = this;
	t = self.gtmpl(t);
	var purify = function(text) {
		var text = String(text).replace(/^[ \s]+|[ \s]+$/, '');
		text = text.replace(/([^&<>\s]{12})([^&<>\s]{12})/g, '$1<wbr></wbr>$2');
		text = text.replace(/[ \t\r\n]+/g, ' ');
		return text;
	}
	t = t.replace(/{([A-Za-z0-9]+)}/g,function(a,m){return obj.hasOwnProperty(m)?purify(obj[m]):'{'+m+'}';});
	return t;
}

JSRTC.prototype.getMiniStars = function(rating, scale) {

	rating = Math.round(rating);

	var fullStar = this.config.get('image1url') || JSRTC.DOMAIN + '/images/stars/blue-tiny.png';
	var emptyStar = this.config.get('image2url') || JSRTC.DOMAIN + '/images/stars/gray-tiny.png';

	var stars = JSKitLib.createMiniStarObject(rating, scale, { full: fullStar, empty: emptyStar, width: this.starWidth, height: this.starHeight });

	return stars;
}

JSRTC.prototype.getMiniThumb = function(score) {

	var thumbImage = JSRTC.DOMAIN + '/images/stars/small-thumb.png';

	var upDown = score >=0 ? 'up' : 'down';
	var miniThumb = JSKitLib.createThumbImage({ ud: upDown, actionable: true, imageURL: thumbImage, ignoreEmpty: true, thumbWidth: 10, thumbHeight: 12 });

	return miniThumb; 
}

/*
 * Extract all info from our config and place in our object
 */
JSRTC.prototype.processConfig = function(config) {

	// Note: Until BestOf is ensured of having permalinks, we will 
	//       base our tab selection on whether or not a particular
	//       rating div has a permalink or not
	var dataTypes = this.getServerDataTypes();

	var isScore = (this.parentObj.config.view.match(/score/));
	var myTab = { type:(isScore ? "US": "UR"), title:"Meu", active:((this.xOpts.skin=="Extend")?false:true) };

	this.views = [];
	if (this.parentObj.config.permalink) {
		this.views.push(myTab);
		if (dataTypes['TR'] || dataTypes['TS'] || this.isAdmin) {
			this.views.push({ type:(isScore ? "TS" : "TR"), title:"Top", active: true });
			this.views.push({ type:"HT", title:"Ult.", active: true });
		}
	} else if (dataTypes[myTab.type]) {
		this.views.push(myTab);
	}
	this.views.push({ type:"RI", title:"Info", active: true });
}

// Returns a hash of server provided data types
JSRTC.prototype.getServerDataTypes = function() {

	var data = this.serverData[0].data;
	var dataTypes = {};
	for (var i=0; i < data.length; i++) {
		dataTypes[data[i].type] = true;
	}

	return dataTypes;
}

JSRTC.prototype.toggleViews = function(id) {
	// Iterate through hide/unactivate as necessary
	var skin = this.xOpts.skin || "";
	var views = this.getActiveViews();
	if (!views.length) return;

	for (var i=0; i < views.length; i++) {
		if (i != id) {
			JSKitLib.removeClass(views[i].tab, "js-rTopNavTabActive");
			JSKitLib.hide(views[i].content);
		}
	}
	// Now display the proper view
	JSKitLib.addClass(views[id].tab, "js-rTopNavTabActive");
	JSKitLib.show(views[id].content);
}

JSRTC.prototype.table = function(tr) {
  var self = this;
  var a = function(n, w) {var o=self.cr(n);o.appendChild(w);return o;}
  var t = a('table', a('tbody', tr));
  var z = function(a) {t.setAttribute(a, '0')}
  z('cellSpacing');
  z('cellPadding');
  z('border');
  return t;
}

JSRTC.prototype.getViews = function() {
	return this.views;
}

JSRTC.prototype.getActiveViews = function() {
	var views = this.views;
	var aViews = [];
	for (var i=0; i < views.length; i++) {
		if (typeof views[i] == 'object' && views[i].active) {
			aViews.push(views[i]);
		}
	}
	return aViews;
}

JSRTC.prototype.isViewActive = function(type) {
	var views = this.getActiveViews();    
	for (var i=0; i < views.length; i++) {
		if (typeof views[i] == 'object' && (views[i].type == type) && views[i].active) {
			return true;
		}
	}
	return false;
}

JSRTC.prototype.createTabs = function() {
	var self = this;
	var views = this.getActiveViews();
	var skin = this.xOpts.skin || "";
	var numTabs = views.length;

	// TODO: Show no tab if only one

	// Calculate the width of each tab
	var width = Math.floor(100/numTabs);
	var adjWidth = (numTabs * width != 100) ? (100 - ((numTabs - 1) * width)) : width;


	var tr = this.cr('tr');

	for (var i=0; i < views.length; i++) {
		var td = this.cr('td');
		if(skin!="Extend") td.setAttribute('width', width + '%');

		var tabWrap = this.cr('div');
		tabWrap.className = "js-rTopNavTabWrap";
		if(skin!="Extend") tabWrap.style.width = '100%';

		var tabMain = this.cr('div');
		tabMain.className = "js-rTopNavTab";
		JSKitLib.preventSelect(tabMain); // preventSelect for tabs titles

		// Left, Right
		if (i==0) { 
			if(skin!="Extend") td.setAttribute('width', adjWidth + '%');
			JSKitLib.addClass(tabMain, "js-rTopNavTabLeft");
			JSKitLib.addClass(tabMain, "js-rTopNavTabActive"); 
		} else {
			if (i == (views.length - 1)) {
				JSKitLib.addClass(tabMain, "js-rTopNavTabRight");
			}
		}

		var divTitle = document.createElement("div");
		divTitle.style.display = "inline";
		divTitle.innerHTML = views[i].title;

		(function(i) {
			tabMain.onclick = function() { 
				self.toggleViews(i); 
				self.positionAffiliate();
			};
		})(i);
    
		tabMain.appendChild(divTitle);
		tabWrap.appendChild(tabMain);

		views[i].tab = tabMain; // Obj ref to tab node

		td.appendChild(tabWrap);
		tr.appendChild(td);
	}

	var table = this.table(tr);
	if(skin!="Extend") table.setAttribute('width', '100%');
    
	return table;

}

JSRTC.prototype.createBody = function(navData) {

	var self = this;
	var views = this.getActiveViews();
	var contentDiv = this.cr('div');

	for (var i=0; i < views.length; i++) {
		switch (views[i].type) {
			/* Rating Info */
			case "RI":
				var content = this.parentObj.createInfoBox();
				break;
			/* User Ratings */
			case "UR":
				var content = this.createBodyUser(navData);
				break;
			case "US":
				var content = this.createBodyUserScore(navData);
				break;
			case "AA":
				var content = this.createBodyAdminMsg($JRTL('adminMsgAlert'));
				break;
			case "TR":
				var content = this.createBodyTop(navData);
				JSKitLib.preventSelect(content);
				break;
			case "TS":
				var content = this.createBodyTopScore(navData);
				JSKitLib.preventSelect(content);
				break;
			case "HT":
				var content = this.createBodyHot(navData);
				JSKitLib.preventSelect(content);
				break;
			case "EP" :
				/* Not handling EP */            
				break;
			case "PL" :
				var content = this.cr("div");
				content.className = "js-kit-poll";

		}
		if (typeof content == 'object') {
			views[i].content = content;
			contentDiv.appendChild(content);
		}
	}

	return contentDiv;
}

JSRTC.prototype.createBodyTop = function(navData) {

	var self = this;
	var skin = this.xOpts.skin || "";
	var body = JSKitLib.html(this.getdtBodyTop());
	var ctls = JSKitLib.mapClass2Object({}, body); 
	/* Top TR */
	var tip = ctls['js-rTopItems'];
	var tTemplate = tip.innerHTML;
	tip.innerHTML = '';

	var topItem = function(items, idx) {
		var item = items[idx];
		var idiv = JSKitLib.html(self.tmpl(tTemplate, item));
		if (idx % 2 != 0 && skin != "Extend") JSKitLib.addClass(idiv, "js-rTopRowColor2");
		var ictls = JSKitLib.mapClass2Object({}, idiv);
		var link = ictls['js-rTopItemLink'];
		if (item.url.match(/^[a-z]+:\/\//)) {
			link.href = item.url;
		} else {
			link.href = self.domain + item.url;
		}
		if (self.config.get('target')) {
			link.target = self.config.get('target');
		}    
		var stars = ictls['js-rTopItemStars'];
		stars.appendChild(item.stars);
		return idiv;
	}

	if (navData.part.TR.items.length) {    
		JSKitLib.map(function(item, i, items) {
			JSKitLib.addChild(tip, topItem(items, i));
		}, navData.part.TR.items);
	} else {
		if (this.isAdmin) {        
			tip.appendChild(this.createBodyAdminMsg($JRTL('adminMsgNoRatings')));
		} else {
			tip.appendChild(this.createBodyMsg($JRTL('msgNoTopItems')));
		}
	}

	return body;

}

JSRTC.prototype.createBodyTopScore = function(navData) {

	var self = this;
	var skin = this.xOpts.skin || "";
	var body = JSKitLib.html(this.getdtBodyTopScore());
	var ctls = JSKitLib.mapClass2Object({}, body);

	/* Top TS */
	var tip = ctls['js-rTopScoreItems'];
	var tTemplate = tip.innerHTML;
	tip.innerHTML = '';

	var topItem = function(items, idx) {
		var item = items[idx];
		var idiv = JSKitLib.html(self.tmpl(tTemplate, item));
		if (skin!="Extend" && idx % 2 != 0) JSKitLib.addClass(idiv, "js-rTopRowColor2");
		var ictls = JSKitLib.mapClass2Object({}, idiv);
		var link = ictls['js-rTopScoreItemLink'];
		if (item.url.match(/^[a-z]+:\/\//)) {
			link.href = item.url;
		} else {
			link.href = self.domain + item.url;
		}
		if (self.config.get('target')) {
			link.target = self.config.get('target');
		}    
		var stars = ictls['js-rTopScoreItemStars'];
		stars.appendChild(item.stars);
		return idiv;
	}

	if (navData.part.TS.items.length) {    
		JSKitLib.map(function(item, i, items) {
			JSKitLib.addChild(tip, topItem(items, i));
		}, navData.part.TS.items);
	} else {
		if (this.isAdmin) {        
			tip.appendChild(this.createBodyAdminMsg($JRTL('adminMsgNoRatings')));
		} else {
			tip.appendChild(this.createBodyMsg($JRTL('msgNoTopItems')));
		}
	}

	return body;

}

JSRTC.prototype.createBodyUser = function(navData) {

	var self = this;

	var body = JSKitLib.html(this.dtBodyUser);
	var ctls = JSKitLib.mapClass2Object({}, body);

	/* Top UR */
	var tip = ctls['js-rTopUserItems'];
	var tipthis = ctls['js-rTopUserThisItems'];
	var tTemplate = tip.innerHTML;
	var tThisTemplate = tipthis.innerHTML;
	tip.innerHTML = '';
	tipthis.innerHTML = '';

	var existOther = 0;

	var isThis = function(item) {
		return (String(item.path || '').toLowerCase() == String(self.parentObj.config.path || '').toLowerCase());
	};

	var userThisItem = function(pObj) {
		var p = pObj.config.permalink || pObj.path;
		var item = {url: p,title: pObj.config.title || p};
		var idiv = JSKitLib.html(self.tmpl(tThisTemplate, item));
		var ictls = JSKitLib.mapClass2Object({}, idiv);
		var link = ictls['js-rTopUserThisItemLink'];
		if (item.url && item.url.match(/^[a-z]+:\/\//)) {
			link.href = item.url;
		} else {
			link.href = self.domain + (item.url ? item.url : '');
		}
		if (self.config.get('target')) {
			link.target = self.config.get('target');
		}    
		var stars = ictls['js-rTopUserThisItemStars'];
		var istars = self.getMiniStars(pObj.userRating, 10);
		stars.appendChild(istars);
		return idiv;
	}

	var userItem = function(items, idx) {
		var item = items[idx];
		if(isThis(item)) return undefined;
		existOther = 1;
		var idiv = JSKitLib.html(self.tmpl(tTemplate, item));
		if (idx % 2 != 0) JSKitLib.addClass(idiv, "js-rTopRowColor2");
		var ictls = JSKitLib.mapClass2Object({}, idiv);
		var link = ictls['js-rTopUserItemLink'];
		if (item.url.match(/^[a-z]+:\/\//)) {
			link.href = item.url;
		} else {
			link.href = self.domain + item.url;
		}
		if (self.config.get('target')) {
			link.target = self.config.get('target');
		}    
		var stars = ictls['js-rTopUserItemStars'];
		stars.appendChild(item.stars);
		return idiv;
	}

	if (navData.part.UR.items.length || self.parentObj.userRating) {    
		if(self.parentObj.userRating){
			var cd = userThisItem(self.parentObj);
			if(cd)
				JSKitLib.addChild(tipthis, cd);
			ctls['js-rTopUserThis'].style.display = 'block';
		} else {
			ctls['js-rTopUserThis'].style.display = 'none';
		}
		JSKitLib.map(function(item, i, items) {
			var cd = userItem(items, i);
			if(cd)
				JSKitLib.addChild(tip, cd);
		}, navData.part.UR.items);
		if(existOther){
			ctls['js-rTopUserOther'].style.display = 'block';
		} else {
			ctls['js-rTopUserOther'].style.display = 'none';
		}
	} else {
		if (this.isAdmin) {        
			if (this.parentObj.config.permalink) {
				ctls['js-rTopUserOther'].style.display = 'block';
				tip.appendChild(this.createBodyMsg($JRTL('msgNoUserItems')));
			} else {
				ctls['js-rTopUserOther'].style.display = 'block';
				tip.appendChild(this.createBodyAdminMsg($JRTL('adminMsgPermalinkHelp')));
			}
		} else {
			ctls['js-rTopUserOther'].style.display = 'block';
			tip.appendChild(this.createBodyMsg($JRTL('msgNoUserItems')));
		}
	}

	return body;

}

JSRTC.prototype.createBodyUserScore = function(navData) {

	var self = this;

	var body = JSKitLib.html(this.dtBodyUserScore);
	var ctls = JSKitLib.mapClass2Object({}, body);

	/* Top UR */
	var tip = ctls['js-rTopUserScoreItems'];
	var tipthis = ctls['js-rTopUserThisScoreItems'];
	var tTemplate = tip.innerHTML;
	var tThisTemplate = tipthis.innerHTML;
	tip.innerHTML = '';
	tipthis.innerHTML = '';

	var existOther = 0;

	var isThis = function(item) {
		return (String(item.path || '').toLowerCase() == String(self.parentObj.config.path || '').toLowerCase());
	};

	var userThisItem = function(pObj) {
		var p = pObj.config.permalink || pObj.path;
		var item = {url: p, title: pObj.config.title || p};
		var idiv = JSKitLib.html(self.tmpl(tThisTemplate, item));
		var ictls = JSKitLib.mapClass2Object({}, idiv);
		var link = ictls['js-rTopUserThisScoreItemLink'];
		if (item.url && item.url.match(/^[a-z]+:\/\//)) {
			link.href = item.url;
		} else {
			link.href = self.domain + (item.url ? item.url : '');
		}
		if (self.config.get('target')) {
			link.target = self.config.get('target');
		}    
		var stars = ictls['js-rTopUserThisScoreItemStars'];
		var istars = self.getMiniThumb(pObj.calcScore());
		stars.appendChild(istars);
		return idiv;
	}

	var userItem = function(items, idx) {
		var item = items[idx];
		if(isThis(item)) return undefined;
		existOther = 1;
		var idiv = JSKitLib.html(self.tmpl(tTemplate, item));
		if (idx % 2 != 0) JSKitLib.addClass(idiv, "js-rTopRowColor2");
		var ictls = JSKitLib.mapClass2Object({}, idiv);
		var link = ictls['js-rTopUserScoreItemLink'];
		if (item.url && item.url.match(/^[a-z]+:\/\//)) {
			link.href = item.url;
		} else {
			link.href = self.domain + (item.url ? item.url : '');
		}
		if (self.config.get('target')) {
			link.target = self.config.get('target');
		}    
		var stars = ictls['js-rTopUserScoreItemStars'];
		stars.appendChild(item.stars);
		return idiv;
	}

	if (navData.part.US.items.length || self.parentObj.userRating) {    
		if(self.parentObj.userRating){
			var cd = userThisItem(self.parentObj);
			if(cd)
				JSKitLib.addChild(tipthis, cd);
			ctls['js-rTopUserThisScore'].style.display = 'block';
		} else {
			ctls['js-rTopUserThisScore'].style.display = 'none';
		}
		JSKitLib.map(function(item, i, items) {
			var cd = userItem(items, i);
			if(cd)
				JSKitLib.addChild(tip, cd);
		}, navData.part.US.items);
		if(existOther){
			ctls['js-rTopUserOtherScore'].style.display = 'block';
		} else {
			ctls['js-rTopUserOtherScore'].style.display = 'none';
		}
	} else {
		if (this.isAdmin) {        
			if (this.parentObj.config.permalink) {
				ctls['js-rTopUserOtherScore'].style.display = 'block';
				tip.appendChild(this.createBodyMsg($JRTL('msgNoUserItems')));
			} else {
				ctls['js-rTopUserOtherScore'].style.display = 'block';
				tip.appendChild(this.createBodyAdminMsg($JRTL('adminMsgPermalinkHelp')));
			}
		} else {
			ctls['js-rTopUserOtherScore'].style.display = 'block';
			tip.appendChild(this.createBodyMsg($JRTL('msgNoUserItems')));
		}
	}

	return body;

}

JSRTC.prototype.createBodyAdminMsg = function(msg) {
	var body = JSKitLib.html(this.dtBodyAdminMsg);
	var ctls = JSKitLib.mapClass2Object({}, body);

	var msgBody = ctls["js-rTopBodyAdminMsgBody"];

	msgBody.innerHTML = msg; 

	return body;
}

JSRTC.prototype.createBodyMsg = function(msg) {
	var body = JSKitLib.html(this.dtBodyMsg);
	var ctls = JSKitLib.mapClass2Object({}, body);

	var msgBody = ctls["js-rTopBodyMsgBody"];

	msgBody.innerHTML = msg; 

	return body;
}

JSRTC.prototype.createBodyHot = function(navData) {

	var self = this;
	var skin = this.xOpts.skin || "";

	var body = JSKitLib.html(this.getdtBodyHot());
	var ctls = JSKitLib.mapClass2Object({}, body);

	/* Hot */  
	var hotp = ctls['js-rTopHotItems'];
	var hTemplate = hotp.innerHTML;
	hotp.innerHTML = '';

	var hotItem = function(items, idx) {
		var item = items[idx];
		var idiv = JSKitLib.html(self.tmpl(hTemplate, item));
		if (skin!="Extend" && idx % 2 != 0) JSKitLib.addClass(idiv, "js-rTopRowColor2");
		var ictls = JSKitLib.mapClass2Object({}, idiv);
		var link = ictls['js-rTopHotItemLink'];
		if (item.url.match(/^[a-z]+:\/\//)) {
			link.href = item.url;
		} else {
			link.href = self.domain + item.url;
		}
		if (self.config.get('target')) {
			link.target = self.config.get('target');
		}    
		return idiv;
	}

	if (navData.part.HT.items.length) {    
		JSKitLib.map(function(item, i, items) {
			JSKitLib.addChild(hotp, hotItem(items, i));
		}, navData.part.HT.items);
	} else {
		var dataTypes = this.getServerDataTypes();
		if (dataTypes.TR) {
			hotp.appendChild(this.createBodyMsg($JRTL('hotInProgress')));
		} else {
			if (this.isAdmin) {        
				hotp.appendChild(this.createBodyAdminMsg($JRTL('adminMsgNoRatingsNoHot')));
			} else {
				hotp.appendChild(this.createBodyMsg($JRTL('msgNoHotItems')));
			}
		}
	}

	return body;
}

JSRTC.prototype.displayTop = function(navData, opts) {
	var self = this;
	navData.Title = this.config.get('title');
	var skin = this.xOpts.skin || "";

	var template = this.getMainTemplate(skin);        

	var pdiv = JSKitLib.html(this.tmpl(template, navData));
	var ctls = JSKitLib.mapClass2Object({}, pdiv);
	this.ctls = ctls;

	/* Navigation Tabs */
	var topNav = ctls['js-rTopNav'];
	topNav.appendChild(this.createTabs());

	/* Main Content */
	var topBody = ctls['js-rTopBody'];
	topBody.appendChild(this.createBody(navData));

	if (opts.whitelabel && ctls["js-rTopPoweredBy"]) JSKitLib.hide(ctls["js-rTopPoweredBy"]);

	/* Activate the Main View */
	// TODO: handle for single view
	this.toggleViews(0);

	this.target.innerHTML = '';
	JSKitLib.addChild(this.target, pdiv);

	if (opts.ad) {
		//this.displayAd(opts.ad);
	}
}


JSRTC.prototype.displayAd = function(ad) {
	/* Ads */
	if (typeof ad == 'object' && ad.data) {
		if (ad.flags && ad.flags.match(/a/)) {
			try {
				eval("ad.data = " + ad.data);
				this.doAffiliateAbsolute(ad);
			} catch(e) {};
		} else {
			if (ad.data.match(/<script/i)) {

				var div = this.cr('div');
				div.style.margin = '9px 0';
				var banner = this.cr('div');
				banner.style.margin = '0 auto';
				banner.style.width = ad.width + 'px';

				var iframe = document.createElement('iframe');
				iframe.frameBorder = 0;
				iframe.scrolling = "no";
				iframe.marginWidth = 0;
				iframe.marginHeight = 0;
				iframe.width = ad.width;
				iframe.height = ad.height;
				iframe.src = 'http://js-kit.com/reflector?html=' + encodeURIComponent('<html><body>' + ad.data + '</body></html>');

				div.appendChild(banner);
				banner.appendChild(iframe);
				this.target.appendChild(div);

			} else {    
				var div = this.cr('div');
				div.style.margin = '9px 0';
				var banner = this.cr('div');
				banner.style.margin = '0 auto';
				div.appendChild(banner);
				banner.innerHTML = ad.data;
				this.target.appendChild(div);
			}
		}

	}

}

JSRTC.prototype.getTextForTotalVotes = function(votes) {
  var text;
  switch(parseInt(votes)) {
    case  1: text = votes + ' ' + $JRTL('voto');  break;
    default: text = votes + ' ' + $JRTL('votos'); break;
  }
  return text;
}

JSRTC.prototype.getTextForTotalScoreVotes = function(votes) {
	return $JRTL('by') + ' ' + this.getTextForTotalVotes(votes);
}

JSRTC.prototype.prepHotItems = function(items) {

	if (!items.length) return;

	// Filter proper number of results
	if (this.config.get('count') < items.length)
		items.length = this.config.get('count');

	// Prepare vote counts
	for (var i=0; i < items.length; i++) {
		items[i].votes = this.getTextForTotalVotes(items[i].val2); 
	}    

	return items;
}

JSRTC.prototype.prepTopItems = function(items) {

	if(!items.length) return;

	// Filter proper number of results
	if (this.config.get('count') < items.length)
		items.length = this.config.get('count');

	// Prepare our stars 
	for (var i=0; i < items.length; i++) {
		items[i].stars = this.getMiniStars(items[i].val1, 10);
		items[i].rating = JSKitLib.zeroPad(JSKitLib.round(items[i].val1 / 2, 2), 2);
		items[i].votes = this.getTextForTotalVotes(items[i].val2); 
		items[i].counter = i + 1;
	}    

	return items;
}

JSRTC.prototype.prepUserItems = function(items) {

	if(!items.length) return;

	// Filter proper number of results
	if (this.config.get('count') < items.length)
		items.length = this.config.get('count');

	// Prepare our stars 
	for (var i=0; i < items.length; i++) {
		items[i].stars = this.getMiniStars(items[i].rating, 10);
		items[i].rating = JSKitLib.zeroPad(JSKitLib.round(items[i].rating / 2, 2), 2);
		items[i].counter = i + 1;
	}    

	return items;
}

JSRTC.prototype.prepTopScoreItems = function(items) {

	if(!items.length) return;

	// Filter proper number of results
	if (this.config.get('count') < items.length)
		items.length = this.config.get('count');

	// Prepare our score icons
	for (var i=0; i < items.length; i++) {
		items[i].rating = JSKitLib.round(items[i].val1>0 ? '+'+items[i].val1 : items[i].val1);
		items[i].votes = this.getTextForTotalScoreVotes(items[i].val2); 
		var upDown = items[i].rating <= 0 ? 'down' : 'up';
		//items[i].stars = this.parentObj.createThumbImage(upDown, 1, this.parentObj.Thumb[this.parentObj.config.thumbsize],1);
		items[i].stars = this.getMiniThumb(items[i].rating);
	}    

	return items;
}
JSRTC.prototype.prepUserScoreItems = function(items) {

	if(!items.length) return;

	// Filter proper number of results
	if (this.config.get('count') < items.length)
		items.length = this.config.get('count');

	// Prepare our score icons
	for (var i=0; i < items.length; i++) {

		var upDown = items[i].rating == this.parentObj.raterInc ? -1 : 1;
		items[i].stars = this.getMiniThumb(upDown);
	}    

	return items;
}

/*  
 * Affiliate Code
 */

JSRTC.prototype.getAffiliateAbsoluteContainer = function(ad) {

	var ad_width = ad.width;
	var ad_height = ad.height;

	var d1 = this.cr('div');
	var d2 = this.cr('div');

	JSKitLib.setStyle(d1, "margin-top: 9px; cursor: pointer; height:" + ad_height + "px;");
	JSKitLib.setStyle(d2, "width:" + ad_width + "px; margin:0 auto;");

	d1.appendChild(d2);

	return d1;

}

JSRTC.prototype.processAffiliateAbsolute = function(ad) {
	// Only allowing one absolute ad per Top 
	if (this.jtaIndex != 0) return;

	// Create the container for our affiliate
	this.affContainer = this.getAffiliateAbsoluteContainer(ad);
	this.target.appendChild(this.affContainer);

	// IE allows flash to overflow a container, but we need special
	// handling for non IE browsers
	if (JSKitLib.isIE()) {        
		this.affContainer.firstChild.appendChild(ad.data());
	} else {

		this.affDiv = this.cr('div');
		this.affDiv.style.position = 'absolute';

		this.positionAffiliate();
		this.affDiv.style.zIndex = 1000;
		this.affDiv.appendChild(ad.data());
		JSKitLib.getJSKitBodyElement().appendChild(this.affDiv);

		// Handling repositioning of ad
		var self = this;
		JSKitLib.addEventHandler(window, ['load', 'resize'], function() { self.positionAffiliate(); });
	}
}

JSRTC.prototype.positionAffiliate = function() {
	if ( ! JSKitLib.isIE() && this.affContainer) {        
		var pos = JSKitLib.findPos(this.affContainer.firstChild);
		this.affDiv.style.left = pos[0]  + 'px';
		this.affDiv.style.top = pos[1] + 'px';
	}
}

// Handles absolutely positioned affiliates
JSRTC.prototype.doAffiliateAbsolute = function(ad) {
	// Run once only
	if ( ! this.didAffiliateAbsolute) {
		if (ad) {
			this.processAffiliateAbsolute(ad);
		}
		this.didAffiliateAbsolute = true;
	}
}


/*
 * Navigator Data Processing 
 */

JSRTC.prototype.processDataTop = function(navData) {

	var TR = JSKitLib.filter(
		function(o) { return (o.type === "TR" && o.title.length); },
			navData.data);

	navData.part.TR.items = this.prepTopItems(TR) || [];
}

JSRTC.prototype.processDataTopScore = function(navData) {

	var TS = JSKitLib.filter(
		function(o) { return (o.type === "TS" && o.title.length); },
			navData.data);

	navData.part.TS.items = this.prepTopScoreItems(TS) || [];
}

JSRTC.prototype.processDataUser = function(navData) {

	var UR = JSKitLib.filter(
		function(o) { return (o.type === "UR"); },
			navData.data);

	navData.part.UR.items = this.prepUserItems(UR) || [];
}

JSRTC.prototype.processDataUserScore = function(navData) {

	var US = JSKitLib.filter(
		function(o) { return (o.type === "US"); },
			navData.data);

	navData.part.US.items = this.prepUserScoreItems(US) || [];
}

JSRTC.prototype.processDataHot = function(navData) {

	// Hot by Hour
	var HH = JSKitLib.filter(
		function(o) { return (o.type === "HH" && o.title.length); },
			navData.data);

	// Hot by Day
	var HD = JSKitLib.filter(
		function(o) { return (o.type === "HD" && o.title.length); },
			navData.data);

	// Hot by Week
	var HW = JSKitLib.filter(
		function(o) { return (o.type === "HW" && o.title.length); },
			navData.data);

	// For Hot, use HD, and if less than 2 results use HW
	navData.part.HT.items = this.prepHotItems(HD) || [];
	if (navData.part.HT.items.length < 2) {
		navData.part.HT.items = this.prepHotItems(HW) || [];
	}

}

JSRTC.prototype.newAd = function(data) {
	this.displayAd(data);
}

// This must be the last function.
JSRTC.prototype.newData = function(data, opts) {
	opts = opts || {};

	this.serverData = [ data, opts ]; // Saving what was returned by server.  
	this.config.server = data.config || {};
	this.serverTime = opts.serverTime;
	this.isAdmin = opts.admin || false;
	this.isNewSite = opts.newSite || false;

	var navData = {};
	navData.data = data.data;

	// Process Config
	this.processConfig(this.config.server);

	navData.part = { 
		TR: {},
		TS: {},
		HH: {},
		HD: {},
		HW: {},
		HT: {},  // Composite of HH, HD, HW
		UR: {},
		US: {}
	};

	this.processDataTop(navData);
	this.processDataTopScore(navData);
	this.processDataHot(navData);
	this.processDataUser(navData);
	this.processDataUserScore(navData);

	// Now parse template and attach node
	this.displayTop(navData, opts);

}
