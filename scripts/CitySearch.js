export default class CitySearch {
    constructor({element}) {
        this._el = element;
        this._render();

        this._el.addEventListener('input', debounce(e => {
            if (!e.target.closest('#city-input')) return;

            let cityName = e.target.value.toLowerCase();
            console.log(cityName);

            let cityInputEvent = new CustomEvent('cityInput', {detail: cityName});
            this._el.dispatchEvent(cityInputEvent);

        }, 1000))
        
    }

    on(eventType, callback) {
        this._el.addEventListener(eventType, callback);
    }


    _render() {

        this._el.innerHTML = `
        <div class="col-sm-4 input-container">
            <div class="input-group mb-3">
                <input type="text" id="city-input" class="form-control" placeholder="Search any city..." aria-label="Type in the city" aria-describedby="basic-addon1">
            </div>
        </div>
        `
    }

}

function debounce(f, delay) {
    let timerId;
    return function wrapper(...args) {
      clearTimeout(timerId);
      timerId = setTimeout(() => { 
        f.apply(this, args); 
      }, delay);
    }
  }