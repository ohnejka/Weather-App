import TableCurrent from './TableCurrent.js';
import CitySearch from './CitySearch.js';
import DataService from './services/DataService.js';
import Geolocation from './Geolocation.js';
import GeoService from './services/GeoService.js';

export default class App {

    constructor({element}) {
        this._el = element;
        this._render();
        
        this._initCitySearch();
        this._initGeolocation ();

        

    }


_initGeolocation () {
    this._geolocation = new Geolocation ({
        element: this._el.querySelector('[data-element="geolocation-weather"]')
    })

    this._requestGeoLocation();
}

_requestGeoLocation () {
    console.log('here1') //сюда доходит
    this._geolocation.on('userCoordsReceived', async e => {
       console.log('here2'); //а сюда нет, хотя событие задиспатчено было.
        let geoResponse = await GeoService.getGeoWeather(e.detail);
        console.log('geoservice response', geoResponse);
    })

}

async _initCitySearch() {
  
    this._citySearch = new CitySearch ({
        element: this._el.querySelector('[data-element="city-search"]')
        
    })
    
    this._citySearch.on('cityInput', async e => {
        let weatherResponse = await DataService.getCurrentWeather(e.detail);
        
        this._initTableCurrent(weatherResponse);
    })
}


 _initTableCurrent (weatherResponse) {
    console.log('weather', weatherResponse)
    this._currentTable = new TableCurrent({
        element: this._el.querySelector('[data-element="current-table"]'),
        data: weatherResponse,
    })
}



_render() {
    
    this._el.innerHTML = `
    
    <div class="row">
        <div class="col-9">
            <h1 class="display-4">What's the weather in your city?</h1>
        </div>
    </div>

    <div class="row" data-element="city-search"></div>

    <div class="row current-weather col-4" data-element="current-table">
    </div>
    
    <div class="row geolocation-weather col-4" data-element="geolocation-weather">
    </div>
    
    `
}
}
