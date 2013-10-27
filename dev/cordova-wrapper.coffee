do (window, document)->
    class _cordova
        construstor:->
            _this = @
        
            @:: =
                evt : ()->
                
            @    
            
            
    window.cordova = (callback)->
        if typeof callback isnt 'function' then throw new Error 'cordova(param) required and must be function'
        document.addEventListener "deviceready", callback(new _cordova()), false