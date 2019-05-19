import React, { Component } from "react";
import Starships from "./starships";

// bootstrap
import Card from "react-bootstrap/Card";

class Person extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      starships: []
    };
  }

  componentDidMount() {
    this.fetchStarships(this.props.starships);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.starships !== this.props.starships) {
      this.setState({ loading: true });
      this.fetchStarships(this.props.starships);
    }
  }

  fetchStarships(endpoints) {
    let requestArray = endpoints.map(item => {
      return fetch(item).then(function(response) {
        return response.json();
      });
    });

    Promise.all(requestArray).then(starships => {
      this.setState({ starships, loading: false });
    });
  }

  render() {
    return (
      <div className="col-xs-12 col-sm-6 col-md-4 margin-bottom-md">
        <Card className="ter-card height-100">
          <Card.Body>
            <Card.Title>{this.props.name}</Card.Title>
            <Starships starships={this.state.starships} />
          </Card.Body>
        </Card>
      </div>
    );
  }
}

export default Person;
