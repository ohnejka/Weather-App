
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
            <div class="alert alert-light rounded-0 text-danger" role="alert">
            Sorry, no such city. Please check the input.
            </div>
            `
        } else {

        this._el.innerHTML = ``
        this._el.innerHTML = `
        <div class="custom-container">
            <h3 class="searched">Currently in ${data.name}, ${data.sys.country}:</h3>
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
        `
        }
    }

}