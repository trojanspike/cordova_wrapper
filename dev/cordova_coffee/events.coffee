cordova.extend 'events', (evt, callb)->
    return document.addEventListener evt, ->
        callb()
    , false