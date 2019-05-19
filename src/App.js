import React, { Component } from "react";

// components
import FilmSearch from "./components/film_search";
import FilmDetail from "./components/film_detail";

// bootstrap
import Jumbotron from "react-bootstrap/Jumbotron";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Spinner from "react-bootstrap/Spinner";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      films: [],
      selectedFilm: null
    };
  }

  componentDidMount() {
    fetch("https://swapi.co/api/films/")
      .then(function(response) {
        return response.json();
      })
      .then(body => {
        const films = body.results;
        this.setState({
          films,
          selectedFilm: films[0]
        });
      });
  }

  onChangeFilm = film => {
    this.setState({ selectedFilm: film });
    console.log(film);
  };

  onSelectedFilmChange = filmName => {
    const newFilm = this.state.films.filter(film => {
      return film.title == filmName;
    });
    this.setState({ selectedFilm: newFilm[0] });
  };

  render() {
    return (
      <div>
        <Navbar bg="dark" variant="dark">
          <Navbar.Brand href="#home">Starwars API</Navbar.Brand>
        </Navbar>
        <div className="bg-light py-4">
          <Container>
            <FilmSearch
              films={this.state.films}
              onChangeFilm={this.onChangeFilm}
            />
          </Container>
        </div>
        <Container className="py-4">
          {!this.state.films.length && (
            <Spinner animation="border" variant="secondary" />
          )}
          {this.state.films.length > 0 && (
            <>
              <FilmDetail film={this.state.selectedFilm} />
            </>
          )}
        </Container>
      </div>
    );
  }
}

export default App;
