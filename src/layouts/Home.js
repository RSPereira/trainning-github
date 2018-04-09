import React, { Component } from "react";
import parseLinkHeader from "parse-link-header";
import { Route } from "react-router-dom";
import Octicon from "react-octicon";
import _ from 'lodash';

import Welcome from "../container/Welcome";
import Repository from "../container/Repository";
import ListRepositories from "../components/ListRepositories";
import GithubService from "../services/GithubService";
import './Home.css';

class Home extends Component {
  constructor() {
    super();

    this.state = {
      repositories: {},
      pagination: {}
    };
  }

  componentDidMount() {
    this.GithubService = new GithubService();
    this.GithubService.getWithParams().then(response => {
      this.setState({
        repositories: response.data,
        pagination: parseLinkHeader(response.headers.link)
      });
    });
  }

  render() {
    return <div className="app">
        {_.isEmpty(this.state.repositories) ? <p className="loading">
            <Octicon name="sync" mega spin />
          </p> : <div className="app-container">
            <ListRepositories repositories={this.state.repositories} pagination={this.state.pagination} />
            <Route path="/" exact component={Welcome} />
            <Route path="/:repository" exact render={props => <Repository {...props} repositories={this.state.repositories} />} />
          </div>}
      </div>;
  }
}

export default Home;
