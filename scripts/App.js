import TableCurrent from './TableCurrent.js';
import Table_3days from './Table3Days.js';
import CitySearch from './CitySearch.js';
import DataService from './services/DataService.js';

export default class App {

    constructor({element}) {
        this._el = element;
        this._render();
        
        this._initCitySearch();

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
    `
}
}