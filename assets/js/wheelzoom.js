/*!
	Wheelzoom 4.0.0
	license: MIT
	http://www.jacklmoore.com/wheelzoom
*/
window.wheelzoom = (function(){
	var defaults = {
		zoom: 0.10,
		maxZoom: false,
		initialZoom: 1,
	};

	var main = function(img, options){
		if (!img || !img.nodeName || img.nodeName !== 'IMG') { return; }

		var settings = {};
		var width;
		var height;
		var bgWidth;
		var bgHeight;
		var bgPosX;
		var bgPosY;
		var previousEvent;
		var cachedDataUrl;

		function setSrcToBackground(img) {
			img.style.backgroundRepeat = 'no-repeat';
			img.style.backgroundImage = 'url("'+img.src+'")';
			cachedDataUrl = 'data:image/svg+xml;base64,'+window.btoa('<svg xmlns="http://www.w3.org/2000/svg" width="'+img.naturalWidth+'" height="'+img.naturalHeight+'"></svg>');
			img.src = cachedDataUrl;
		}

		function updateBgStyle() {
			if (bgPosX > 0) {
				bgPosX = 0;
			} else if (bgPosX < width - bgWidth) {
				bgPosX = width - bgWidth;
			}

			if (bgPosY > 0) {
				bgPosY = 0;
			} else if (bgPosY < height - bgHeight) {
				bgPosY = height - bgHeight;
			}

			img.style.backgroundSize = bgWidth+'px '+bgHeight+'px';
			img.style.backgroundPosition = bgPosX+'px '+bgPosY+'px';
		}

		function reset() {
			bgWidth = width;
			bgHeight = height;
			bgPosX = bgPosY = 0;
			updateBgStyle();
		}

		// Custom method for focusing on a certain region of the map.
		function setFocus(setWidth, setHeight, x, y){
			console.log("Set!");
			bgWidth = setWidth;
			bgHeight = setHeight;
			bgPosX = x;
			bgPosY = y;
			updateBgStyle();
		}

		// Custom method for accepting the location to focus on
		function focus(event){
			switch(event.detail){
				case "Howling Cliffs":
					setFocus(4458.497693689421, 2621.864153751001, -835, -237);
					break;
				case "Forgotten Crossroads":
					setFocus(3932.796230626501, 2383.5128670463646, -1409, -450);
					break;
				case "Resting Grounds":
					setFocus(3575.269300569546, 2383.5128670463646, -2057, -481);
					break;
				case "Greenpath":
					setFocus(2606.3713201151986, 1737.5808800767998, -110, -240);
					break;
				case "Crystal Peak":
					setFocus(2867.0084521267186, 1911.3389680844798, -1327, -48);
					break;
				case "City of Tears":
					setFocus(2554.504530844906, 1703.0030205632713, -1158, -626);
					break;
				case "Royal Waterways":
					setFocus(2528.959485536457, 1685.9729903576385, -1060, -800);
					break;
				case "Fungal Wastes":
					setFocus(3029.440567724122, 2019.6270451494152, -777, -737);
					break;
				case "Fog Canyon":
					setFocus(4391.049895852839, 2927.366597235226, -847, -981);
					break;
				case "Queen's Gardens":
					setFocus(3815.988249780663, 2543.992166520443, -256, -924);
					break;
				case "Deepnest":
					setFocus(2186.377552132176, 1457.585034754785, -37, -682);
					break;
				case "Ancient Basin":
					setFocus(2580.3076069140466, 1720.2050712760315, -963, -1016);
					break;
				case "The Abyss":
					setFocus(2580.3076069140466, 1720.2050712760315, -1227, 1120);
					break;
				case "Kingdom's Edge":
					setFocus(2838.3383676054514, 1892.2255784036347, -1878, -801);
					break;
				case "The Hive":
					setFocus(6480, 4320, -4929, -2736);
					break;
				default:
			}
		}

		// Custom method to get the current position and zoom of the image
		function getFocus(){
			console.log("Width: " + bgWidth + "\nHeight: " + bgHeight + "\nxPos: " + bgPosX + "\nyPos: " + bgPosY);
		}

		function onwheel(e) {
			var deltaY = 0;

			e.preventDefault();

			if (e.deltaY) { // FireFox 17+ (IE9+, Chrome 31+?)
				deltaY = e.deltaY;
			} else if (e.wheelDelta) {
				deltaY = -e.wheelDelta;
			}

			// As far as I know, there is no good cross-browser way to get the cursor position relative to the event target.
			// We have to calculate the target element's position relative to the document, and subtrack that from the
			// cursor's position relative to the document.
			var rect = img.getBoundingClientRect();
			var offsetX = e.pageX - rect.left - window.pageXOffset;
			var offsetY = e.pageY - rect.top - window.pageYOffset;

			// Record the offset between the bg edge and cursor:
			var bgCursorX = offsetX - bgPosX;
			var bgCursorY = offsetY - bgPosY;

			// Use the previous offset to get the percent offset between the bg edge and cursor:
			var bgRatioX = bgCursorX/bgWidth;
			var bgRatioY = bgCursorY/bgHeight;

			// Update the bg size:
			if (deltaY < 0) {
				bgWidth += bgWidth*settings.zoom;
				bgHeight += bgHeight*settings.zoom;
			} else {
				bgWidth -= bgWidth*settings.zoom;
				bgHeight -= bgHeight*settings.zoom;
			}

			if (settings.maxZoom) {
				bgWidth = Math.min(width*settings.maxZoom, bgWidth);
				bgHeight = Math.min(height*settings.maxZoom, bgHeight);
			}

			// Take the percent offset and apply it to the new size:
			bgPosX = offsetX - (bgWidth * bgRatioX);
			bgPosY = offsetY - (bgHeight * bgRatioY);

			// Prevent zooming out beyond the starting size
			if (bgWidth <= width || bgHeight <= height) {
				reset();
			} else {
				updateBgStyle();
			}
		}

		function drag(e) {
			e.preventDefault();
			bgPosX += (e.pageX - previousEvent.pageX);
			bgPosY += (e.pageY - previousEvent.pageY);
			previousEvent = e;
			updateBgStyle();
		}

		function removeDrag() {
			document.removeEventListener('mouseup', removeDrag);
			document.removeEventListener('mousemove', drag);
		}

		// Make the background draggable
		function draggable(e) {
			e.preventDefault();
			previousEvent = e;
			document.addEventListener('mousemove', drag);
			document.addEventListener('mouseup', removeDrag);
		}

		function load() {
			var initial = Math.max(settings.initialZoom, 1);

			if (img.src === cachedDataUrl) return;

			var computedStyle = window.getComputedStyle(img, null);

			width = parseInt(computedStyle.width, 10);
			height = parseInt(computedStyle.height, 10);
			bgWidth = width * initial;
			bgHeight = height * initial;
			bgPosX = -(bgWidth - width)/2;
			bgPosY = -(bgHeight - height)/2;;

			setSrcToBackground(img);

			img.style.backgroundSize = bgWidth+'px '+bgHeight+'px';
			img.style.backgroundPosition = bgPosX+'px '+bgPosY+'px';
			img.addEventListener('wheelzoom.reset', reset);

			// Added new event listeners to accept an area of the map to focus on.
			img.addEventListener('focus', focus);
			img.addEventListener('getFocus', getFocus);
			// End new listeners

			img.addEventListener('wheel', onwheel);
			img.addEventListener('mousedown', draggable);
		}

		var destroy = function (originalProperties) {
			img.removeEventListener('wheelzoom.destroy', destroy);
			img.removeEventListener('wheelzoom.reset', reset);
			img.removeEventListener('load', load);
			img.removeEventListener('mouseup', removeDrag);
			img.removeEventListener('mousemove', drag);
			img.removeEventListener('mousedown', draggable);
			img.removeEventListener('wheel', onwheel);

			// Added these removes to match existing ones.
			img.removeEventListener('focus', focus);
			img.removeEventListener('getFocus', getFocus);
			// End new removes

			img.style.backgroundImage = originalProperties.backgroundImage;
			img.style.backgroundRepeat = originalProperties.backgroundRepeat;
			img.src = originalProperties.src;
		}.bind(null, {
			backgroundImage: img.style.backgroundImage,
			backgroundRepeat: img.style.backgroundRepeat,
			src: img.src
		});

		img.addEventListener('wheelzoom.destroy', destroy);

		options = options || {};

		Object.keys(defaults).forEach(function(key){
			settings[key] = options[key] !== undefined ? options[key] : defaults[key];
		});

		if (img.complete) {
			load();
		}

		img.addEventListener('load', load);
	};

	// Do nothing in IE9 or below
	if (typeof window.btoa !== 'function') {
		return function(elements) {
			return elements;
		};
	} else {
		return function(elements, options) {
			if (elements && elements.length) {
				Array.prototype.forEach.call(elements, main, options);
			} else if (elements && elements.nodeName) {
				main(elements, options);
			}
			return elements;
		};
	}
}());
