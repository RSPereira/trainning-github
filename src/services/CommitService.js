import HttpRequest from "./HttpRequest";

class CommitService extends HttpRequest {
  constructor(repository) {
    super();

    this.url = `/repos/${this.owner}/${repository}/commits`;
  }

  getByPage(page) {
    return this.request
      .get(this.url, {
        params: {
          per_page: 20,
          page: page
        }
      })
      .then(resp => resp)
      .catch(function(e) {
        console.log(e);
      });
  }
}

export default CommitService;