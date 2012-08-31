(function() {

	var osname = Ti.Platform.osname,
		version = Ti.Platform.version,
		height = Ti.Platform.displayCaps.platformHeight,
		width = Ti.Platform.displayCaps.platformWidth;
	

	Window = require('ui/handheld/ios/ApplicationWindow');

	new Window().open();

})();
