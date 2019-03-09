import HttpService from './HttpService.js';


let getCityURL = (data) => `https://api.openweathermap.org/data/2.5/weather?q=${data}&units=metric&APPID=149d813cabaeb3cfcd6486884584277f`;

let DataService = {
    
    async getCurrentWeather(cityName) {
        let requiredCityURL = getCityURL(cityName);
        console.log(requiredCityURL);
        

    try {
            let data = await HttpService.sendRequest(requiredCityURL);
            console.log('data', data);
            if (data.cod == '404') {
                throw new Error;
            }
            return data;
        }
    catch (error) {
        console.dir('!!!!!!!!!!', error);
        return {
            error: 'need to render alert'
        }
    }
}
};


export default DataService;