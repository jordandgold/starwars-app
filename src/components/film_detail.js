import React, { Component } from "react";
import Person from "./person";

// bootsrap
import Spinner from "react-bootstrap/Spinner";

class FilmDetail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      people: []
    };
  }

  componentDidMount() {
    this.fetchPeople(this.props.film.characters);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.film !== this.props.film) {
      this.setState({ loading: true });
      this.fetchPeople(this.props.film.characters);
    }
  }

  fetchPeople(endpoints) {
    let requestArray = endpoints.map(item => {
      return fetch(item).then(function(response) {
        return response.json();
      });
    });

    Promise.all(requestArray)
      .then(people => {
        this.setState({ people, loading: false });
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    if (this.state.loading || !this.props.film) {
      return (
        <div className="film-detail pad-v-xxl">
          <Spinner animation="border" variant="secondary" /> Loading Film
          Details...
        </div>
      );
    }

    return (
      <div className="film-detail pad-v-xxl">
        <h3>Film: {this.props.film.title}</h3>
        <h4>Characters:</h4>
        <div className="people-list row">
          {this.state.people.map(person => {
            return (
              <Person
                key={person.name}
                name={person.name}
                starships={person.starships}
              />
            );
          })}
        </div>
      </div>
    );
  }
}

export default FilmDetail;
