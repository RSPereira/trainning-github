import React, {Component} from 'react';
import PropTypes from "prop-types";
import Octicon from "react-octicon";

import "./RepositoryDetails.css";

class RepositoryDetails extends Component {
  static propTypes = {
    repository: PropTypes.object.isRequired,
    commits: PropTypes.array.isRequired
  };

  render() {
    return <div className="repository-details">
        <div className="repository-details-header">
          <p>
            <Octicon name="repo" mega /> Globocom / {this.props.repository.name}
          </p>
          <p className="details-end">
            <Octicon name="star" mega /> {this.props.repository.stargazers_count}
          </p>
          <p className="details-end">
            <Octicon name="repo-forked" mega /> {this.props.repository.forks}
          </p>
        </div>
        <h2>Commits:</h2>
        <ul className="commits">
          {this.props.commits.map(commitMap => {
            return <li key={commitMap.sha}>
                <p className="commit-message">{commitMap.commit.message}</p>
                <p className="commit-author">Author: {commitMap.commit.author.name}</p>
              </li>;
          })}
        </ul>
      </div>;
  }
}

export default RepositoryDetails;