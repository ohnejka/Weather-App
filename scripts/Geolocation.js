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
        this._getAddress();
        
    } else {
        console.log('geolocation not supported');
    }
}

// как заставить функцию ниже не отправлять событие до того, как придут координаты?

_getCoordinates() {

    return new Promise( (resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
    })

}

async _getAddress () {
   
    const position = await this._getCoordinates();
    let latitude = position.coords.latitude.toFixed();
    let longitude = position.coords.longitude.toFixed();

    let gotCoordinatesEvent = new CustomEvent('userCoordsReceived', {
        detail: [latitude,longitude],
        bubbles: true}
    );
    
    this._el.dispatchEvent(gotCoordinatesEvent);
    
}

renderGeolocationWeather(data) {
    this._el.innerHTML = `
        <div class="custom-container">
                <h3 class="geo-title">You are in <span class="highlight">${data.name}</span>.
                Outside:</h3>
            <table class="table borderless">
                <thead>
                </thead>
                <tbody>
                <tr>
                    
                    <td>${data.weather[0].description}</td>
                    </tr>

                    <tr>
                    
                    <td>${data.main.temp.toFixed()}°C</td>
                    </tr>

                    <tr>
                    
                    <td>${data.wind.speed} m/s</td>
                    </tr>

                    <tr>
                    
                    <td>${(data.main.pressure/1.33).toFixed()} mmHg</td>
                    </tr>

                </tbody>
            </table>
    `;

}

}




