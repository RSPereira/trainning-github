import axios from "axios";

export default class HttpRequest {
    constructor() {
        this.owner = 'globocom';
        this.request = axios.create({
          baseURL: "https://api.github.com"
        });
    }

    get() {
        return this.request
          .get(this.url)
          .then(resp => resp)
          .catch(function(e) {
              throw new Error(e.message)
          });
    }
}