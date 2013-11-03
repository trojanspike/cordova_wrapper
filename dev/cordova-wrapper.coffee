do ->
    _cordova = {}
    
    window.cordova = (load, callback)->
        # nothing passed : cordova() - return array
        if typeof load is 'undefined' and typeof callback is 'undefined'
            return [];
        
        # is just a callback passed : cordova(function(cordova){}) - pass full cordova in callback
        if typeof load is 'function' and typeof callback is 'undefined'
            document.addEventListener "deviceready", ->
                cordova = ->
                cordova.prototype = _cordova
                load.call new cordova()
            , false
        
        # load - string, no callback cordova('device') - return device object
        if typeof load is 'string' and typeof callback isnt 'function'
            return _cordova[load]
        
        # load - string, callback passed cordova('device', function(device){}) - return device object
        if typeof load is 'string' and typeof callback is 'function'
            document.addEventListener "deviceready", ->
                callback.call _cordova[load]
            , false
            
            
        # load - array, callback passed cordova('device', function(device){}) - return device object
        if typeof load is 'object' and typeof callback is 'function'
            _callObj = []
            for i in load
                _callObj.push _cordova[i]
            document.addEventListener "deviceready", ->
                callback.apply null, _callObj
            , false
            
        
    window.cordova.extend = (name, func) ->
        # cordova.extend('name' , function(){});
        _err = false
        if typeof func isnt 'function'
            _err = true
            if typeof func is 'object'
                _err = false
            
        if typeof name isnt 'string'
            _err = true
            
        if _err
            throw new Error 'ERROR:'+name+': cordova.extend($1, $2) - required , $1:string, $2:function|object'
       
        if typeof _cordova[name] is 'undefined'
            _cordova[name] = func
            return null
    return null

cordova.extend 'device' , do ->
   return window.device
    

    
    