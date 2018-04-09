import React, { Component } from 'react';
import PropTypes from "prop-types";
import _ from 'lodash';

import './Pagination.css';

class Pagination extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isActive: true
    };
  }

  static propTypes = {
    getCommitsData: PropTypes.func.isRequired,
    repository: PropTypes.object.isRequired,
    pagination: PropTypes.object.isRequired
  };

  componentWillReceiveProps(nextProps) {
    if (this.props.repository.name !== nextProps.repository.name) {
        this.setState({ isActive: true });
    }
  }

  getNextPage() {
    if (
      !_.isEmpty(this.props.pagination) &&
      !_.isEmpty(this.props.pagination.next)
    ) {
      return this.props.pagination.next.page;
    }
    return 1;
  }

  checkLastPage() {
    if (
      !_.isEmpty(this.props.pagination) &&
      !_.isEmpty(this.props.pagination.last) &&
      this.props.pagination.last.page === this.props.pagination.next.page
    ) {
      this.setState({ isActive: false });
    }
    return false;
  }

  handleOnClick = () => {
    this.props.getCommitsData(null, this.getNextPage());
    this.checkLastPage();
  };

  render() {
    return (
      <div className="pagination">
        {this.state.isActive ? (
          <button onClick={this.handleOnClick}>Carregar mais commits</button>
        ) : (
          <p>Todos os commits já foram carregados.</p>
        )}
      </div>
    );
  }
}

export default Pagination;