import HttpService from './HttpService.js';


let getGeoURL = (lat, long) => `https://api.openweathermap.org/data/2.5/weather?q=lat=${lat}&lon=${long}&units=metric&APPID=149d813cabaeb3cfcd6486884584277f`;

let GeoService = {
    
async getGeoWeather(position) {
        let requiredGeoURL = getGeoURL(position);
        console.log(requiredGeoURL);
        

    try {
            let data = await HttpService.sendRequest(requiredGeoURL);
            console.log('Geo data', data);
            if (data.cod == '404') {
                throw new Error;
            }
            console.log('success geo request');
            return data;
        }
    catch (error) {
        console.dir('geo data error', error);
    }
}


};




export default GeoService;