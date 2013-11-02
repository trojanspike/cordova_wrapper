cordova.extend 'events' , do ->
    return {
        on : (evt, callback)->
            document.addEventListener evt, ->
                callback()
            , false
    }    