import React, { Component } from "react";

class Starships extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    if (!this.props.starships) {
      return <div />;
    }

    return (
      <div className="starships">
        <b>Starships:</b>
        <ul className="starships__list list-unstyled">
          {this.props.starships.map(starship => {
            return (
              <li key={starship.name} className="starships__list-item">
                {starship.name}
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}

export default Starships;
