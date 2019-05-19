import React, { Component } from "react";

// bootstrap
import Form from "react-bootstrap/Form";
import ListGroup from "react-bootstrap/ListGroup";

class FilmSearch extends Component {
  constructor(props) {
    super(props);

    this.state = {
      term: "",
      filteredFilms: []
    };
  }

  render() {
    return (
      <Form className="film-search">
        <Form.Control
          size="lg"
          type="text"
          placeholder="Search"
          value={this.state.value}
          onChange={this.handleChange}
        />
        <ul className="selected-films">
          {this.state.filteredFilms.map(film => {
            return (
              <li
                key={film.title}
                onClick={() => this.props.onChangeFilm(film)}
              >
                {film.title}
              </li>
            );
          })}
        </ul>
      </Form>
    );
  }

  handleChange = event => {
    this.setState({ term: event.target.value });

    const filteredFilms = this.props.films.filter(film => {
      return film.title
        .toLowerCase()
        .includes(event.target.value.toLowerCase());
    });

    this.setState({ filteredFilms });
  };
}

export default FilmSearch;
