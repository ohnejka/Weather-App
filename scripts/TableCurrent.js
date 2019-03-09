
export default class TableCurrent {
    constructor({element, data}) {
        this._el = element;
        this._weatherData = data

        this._render(this._weatherData);
    }

    _render(data) {
        this._el.innerHTML = ``
        if (data.error) {
            
            this._el.innerHTML = `
            <div class="alert alert-warning" role="alert">
            Sorry, we cannot find such city. Please check the input.
            </div>
            `
        } else {

        this._el.innerHTML = ``
        this._el.innerHTML = `
        <div class="custom-container">
            <h3>currently in ${data.name}, ${data.sys.country}:</h3>
        <table class="table">
            <thead>
            </thead>
            <tbody>
            <tr>
                <th scope="row">Weather</th>
                <td>${data.weather[0].description}</td>
                </tr>

                <tr>
                <th scope="row">Temperature</th>
                <td>${data.main.temp.toFixed()}°C</td>
                </tr>

                <tr>
                <th scope="row">Wind</th>
                <td>${data.wind.speed} m/s</td>
                </tr>

                <tr>
                <th scope="row">Pressure</th>
                <td>${(data.main.pressure/1.33).toFixed()} mmHg</td>
                </tr>

                

            </tbody>
        </table>
        `
        }
    }

}