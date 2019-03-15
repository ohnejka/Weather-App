import HttpService from "./HttpService.js";

let getGeoURL = coordinates =>
  `https://api.openweathermap.org/data/2.5/weather?lat=${coordinates[0]}&lon=${
    coordinates[1]
  }&units=metric&APPID=149d813cabaeb3cfcd6486884584277f`;

let GeoService = {
  async getGeoWeather(position) {
    let requiredGeoURL = getGeoURL(position);

    try {
      let data = await HttpService.sendRequest(requiredGeoURL);
      if (data.cod == "404") {
        throw new Error();
      }
      return data;
    } catch (error) {
      console.log("geo data error", error);
    }
  }
};

export default GeoService;
