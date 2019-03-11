export default class Geolocation {
    constructor ({element}) {
        this._el = element;
        this._checkGeolocation();


    }

on(eventType, callback) {
        this._el.addEventListener(eventType, callback);
    }
    

_checkGeolocation () {
    if (navigator.geolocation) {
        console.log('Geo SUPPORTED!');
        this._getCoordinates();
        
    } else {
        console.log('geolocation not supported');
    }
}

 _getCoordinates() {

    let userPosition = {};
    navigator.geolocation.getCurrentPosition(showCoordinates);
    console.log('user geolocation', userPosition);

    let gotCoordinatesEvent = new CustomEvent('userCoordsReceived', {detail: userPosition});
    this._el.dispatchEvent(gotCoordinatesEvent);
    console.log(gotCoordinatesEvent);
    

   
    function showCoordinates(position) {
    
        userPosition.lat = position.coords.latitude.toFixed()
        userPosition.long = position.coords.longitude.toFixed();
    };
}


}




