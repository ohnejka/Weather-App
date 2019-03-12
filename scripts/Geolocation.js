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

// как заставить функцию ниже не отправлять событие до того, как придут координаты?

 async _getCoordinates() {
   
    let userPosition = [];
    await navigator.geolocation.getCurrentPosition(provideCoordinates);
    

    function provideCoordinates(position) {
    
        userPosition[0] = position.coords.latitude.toFixed()
        userPosition[1] = position.coords.longitude.toFixed();
        console.log(userPosition);
    };

    let gotCoordinatesEvent = new CustomEvent('userCoordsReceived', {
        detail: userPosition,
        bubbles: true}
    );
    await this._el.dispatchEvent(gotCoordinatesEvent);
}

}




