export default {

    sendRequest(url) {
        return fetch(url)
            .then( response => {
            return response.json();
        });
    }
}