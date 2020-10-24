import React, { Component } from 'react';

export class FetchData extends Component {
  displayName = FetchData.name

  constructor(props) {

    //fetch('api/SampleData/WeatherForecasts')
    //  .then(response => response.json())
    //    .then(data => {
    //        console.log(data, 'data');
    //    this.setState({ forecasts: data, loading: false });
    //      });

      fetch('api/CardData/ShuffleCards')
        .then(response => response.json())
        .then(data => {
            console.log(data, 'data');
            //this.setState({ forecasts: data, loading: false });
        });
  }

  render() {
    const state = {};
    return (
      <div>
        <h1>Shuffle Cards</h1>
      </div>
    );
  }
}
