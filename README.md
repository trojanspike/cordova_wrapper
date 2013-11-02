## cordova-wrapper
### JS wrapper for ease of use with the cordova API - quirk work around
### developer contribution  welcome 
----------

JS wrapper for ease of use with the cordova API - quirk work around

#### init useage
```javascript
    cordova() // return empty array []
    cordova('device'); // return device object
    cordova('devive' , function(device){
        // device object within callback & device event: deviceready
    });
    cordova(['devive', 'events', 'geolocation'] , function(device, events, geo){
        // device, events, geolocation objects within callback & device event: deviceready
    });