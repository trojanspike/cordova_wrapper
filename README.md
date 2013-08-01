cordova_js_class
================

Little cordova javascript class for easy use in cordova apps

USAGE :

	cordova(function(PG){
		// device is ready , callback param can be anything.

		// some basic method of cordova have only been added so far -> developers are welcome to fork and 
		// contribute

		cordova events :
		PG.evt('menubutton', function(evt){
			// see cordova docs on other events
		});

		geo api :
		:: .geo(String , Function)
		PG.geo(function(position){
			if callback is first param passed the method will run getCurrentPosition
		});

		// watch geo
		var _myGeoWatchID = PG.geo('watch', function(position){
			// see cordova docs on the .geo watch 
		});

		// clear geo watch
		PG.geo('clear', _myGeoWatchID);

		// chaining
		PG.evt('pause', function(){
				console.log('device put into pause state');
			}).evt('backbutton', function(){
				console.log('backbutton event fired');
			}).geo(function(position){
				console.log(position.coords);
		});
	});