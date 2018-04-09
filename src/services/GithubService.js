import HttpRequest from "./HttpRequest";

class GithubService extends HttpRequest {
    constructor() {
        super();

        this.url = '/search/repositories';
    }

    getWithParams() {
        return this.request
          .get(this.url, {
            params: {
              q: `user:${this.owner}`,
              sort: "stars",
              order: "desc"
            }
          })
          .then(resp => resp)
          .catch(function(e) {
            console.log(e);
          });
    }
}

export default GithubService;