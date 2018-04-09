import React, { Component } from 'react';
import PropTypes from "prop-types";
import parseLinkHeader from "parse-link-header";
import ReactRouterPropTypes from "react-router-prop-types";

import CommitService from '../services/CommitService';
import RepositoriesDetails from '../components/RepositoryDetails';
import Pagination from '../components/Pagination';
import './Repository.css';

class Repository extends Component {
  constructor(props) {
    super(props);

    this.state = {
      commits: [],
      repository: {},
      pagination: {}
    };
  }

  static propTypes = {
    repositories: PropTypes.object.isRequired,
    match: ReactRouterPropTypes.match.isRequired
  };

  componentDidMount() {
    this.getCommitsData();
    this.setState({ repository: this.getRepository() });
  }

  componentWillReceiveProps(nextProps) {
    this.getCommitsData(nextProps);
    this.setState({ repository: this.getRepository(nextProps) });
  }

  getCommitsData = (nextProps = null, page = 1) => {
    let props = nextProps ? nextProps : this.props;
    this.CommitService = new CommitService(props.match.params.repository);
    this.CommitService.getByPage(page).then(response => {
      let commit = nextProps ? response.data : [...this.state.commits, ...response.data];
      this.setState({
        commits: commit,
        pagination: parseLinkHeader(response.headers.link)
      });
    });
  }

  getRepository(nextProps = null) {
    let props = nextProps ? nextProps : this.props;
    return this.props.repositories.items.find(item => {
      return item.name === props.match.params.repository;
    });
  }

  render() {
    return <div className="repository-container">
        <RepositoriesDetails commits={this.state.commits} repository={this.state.repository} />
        <Pagination getCommitsData={this.getCommitsData} repository={this.state.repository} pagination={this.state.pagination} />
      </div>;
  }
}

export default Repository;