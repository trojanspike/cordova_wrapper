(function(window, document, navigator, undefined){
var _cordova;

	_cordova = function(){
		// set variable available in cordova
		this.device = (typeof window.device !== 'undefined')?window.device:null;
	};


	/* start prototype functions */
	/*
	Cordova events object
	@event String
	@callback Function
	@return self : chaining
	 */
	_cordova.prototype.evt = function(evt, callback){
		if(typeof evt !== 'string' || typeof callback !== 'function'){
			throw new Error('Function .on( String , Function )');
			return;
		}
		document.addEventListener(evt, callback, false);
		return this;
	};

	/*
	Geolocation api
	@type String | function 
	@callback function
	@return self : chaining 
	 */
	_cordova.prototype.geo = function(type, callback){
		this.err = function(err){
			alert(err.message);
		};
		// : current , watch , clear
		switch(type){
			case 'watch':
				return navigator.geolocation.watchPosition(callback, this.err)
			break;
			case 'clear':
				return navigator.geolocation.clearWatch(callback)
			break;
				default:
				return navigator.geolocation.getCurrentPosition(type, this.err)
		}
	};

	/* start private functions */


	/* attach to window */
window.cordova = function(callback){
	if(typeof callback === 'function'){
		document.addEventListener("deviceready", callback(new _cordova()), false);
	} else {
		throw new Error('cordova( PARAM must be function )');
	}
};
})(window, document, navigator);