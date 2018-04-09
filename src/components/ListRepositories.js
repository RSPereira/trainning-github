import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import './ListRepositories.css';

class ListRepositories extends Component {
  
  static propTypes = {
    repositories: PropTypes.object.isRequired,
    pagination: PropTypes.object.isRequired
  };

  render() {
    return (
      <div className="list-repositories">
        <h1>Globo.com</h1>
        <nav>
            <ul>
            { this.props.repositories.items.map(repository => {
                return <li key={repository.id} className="repository-item">
                  <Link to={repository.name}>{repository.name} ({repository.stargazers_count})</Link>
                </li>
            })}
            </ul>
        </nav>
      </div>
    );
  }
}

export default ListRepositories;
