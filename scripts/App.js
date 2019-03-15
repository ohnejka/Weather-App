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

        this._el.addEventListener('userCoordsReceived', e => {
            
            this._requestGeoLocation(e.detail);
            console.log(e.detail);
        })

        this._initGeolocation ();

    }


_initGeolocation () {
    this._geolocation = new Geolocation ({
        element: this._el.querySelector('[data-element="geolocation-weather"]')
    });  
}

async _requestGeoLocation (coordinates) {
    let geoResponse = await GeoService.getGeoWeather(coordinates);
    console.log('geoservice response', geoResponse);
    this._geolocation.renderGeolocationWeather(geoResponse);
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
        <div class="col-md-7">
            <h1 class="display-3">What's the weather like today?</h1>
        </div>
    </div>

    <div class="row" data-element="city-search"> </div>

    <div class="row current-weather col-md-6" data-element="current-table"> </div>
    
    <div class="row geolocation-weather col-md-6" data-element="geolocation-weather">
    </div>
    
    `
}
}
