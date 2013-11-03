(function() {
  var _cordova;
  _cordova = {};
  window.cordova = function(load, callback) {
    var i, _callObj, _i, _len;
    if (typeof load === 'undefined' && typeof callback === 'undefined') {
      return [];
    }
    if (typeof load === 'function' && typeof callback === 'undefined') {
      document.addEventListener("deviceready", function() {
        var cordova;
        cordova = function() {};
        cordova.prototype = _cordova;
        return load.call(this, new cordova());
      }, false);
    }
    if (typeof load === 'string' && typeof callback !== 'function') {
      return _cordova[load];
    }
    if (typeof load === 'string' && typeof callback === 'function') {
      document.addEventListener("deviceready", function() {
        return callback.call(this, _cordova[load]);
      }, false);
    }
    if (typeof load === 'object' && typeof callback === 'function') {
      _callObj = [];
      for (_i = 0, _len = load.length; _i < _len; _i++) {
        i = load[_i];
        _callObj.push(_cordova[i]);
      }
      return document.addEventListener("deviceready", function() {
        return callback.apply(this, _callObj);
      }, false);
    }
  };
  window.cordova.extend = function(name, func) {
    var _err;
    _err = false;
    if (typeof func !== 'function') {
      _err = true;
      if (typeof func === 'object') {
        _err = false;
      }
    }
    if (typeof name !== 'string') {
      _err = true;
    }
    if (_err) {
      throw new Error('ERROR:' + name + ': cordova.extend($1, $2) - required , $1:string, $2:function|object');
    }
    if (typeof _cordova[name] === 'undefined') {
      _cordova[name] = func;
      return null;
    }
  };
  return null;
})();

cordova.extend('device', (function() {
  return window.device;
})());

cordova.extend('events', function(evt, callb) {
  return document.addEventListener(evt, function() {
    return callb();
  }, false);
});

cordova.extend('example', function() {
  var _exp;
  _exp = function() {};
  _exp.prototype.run = function() {};
  return new _exp();
});

cordova.extend('geolocation', (function() {
  return {
    watch: function(success, error) {
      return navigator.geolocation.watchPosition(success, error);
    },
    clear: function(id) {
      return navigator.geolocation.clearWatch(id);
    },
    current: function(success, error) {
      return navigator.geolocation.getCurrentPosition(success, error);
    }
  };
})());
