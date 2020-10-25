import React, { Component } from 'react';
import { Route } from 'react-router';
import { Home } from './components/Home';

export default class App extends Component {
  displayName = App.name

  render() {
      return (
        <Home />
      //<Layout>
      //  <Route exact path='/' component={Home} />
      //  <Route path='/counter' component={Counter} />
      //  <Route path='/fetchdata' component={FetchData} />
      //</Layout>
    );
  }
}
