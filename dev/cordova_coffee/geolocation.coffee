cordova.extend 'geolocation' , do ->
    return {
        watch : (success, error)->
            navigator.geolocation.watchPosition(success, error)
        clear : (id)->
            navigator.geolocation.clearWatch(id)
        current:(success, error)->
            navigator.geolocation.getCurrentPosition(success, error)
        }        