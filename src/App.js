import React, { Component } from 'react';
import './App.css';
import Graph from './components/Graph';

import { Provider } from 'react-redux';
import store from './store';
import { connect } from 'react-redux';
import { getListofCompanies, trackedStocks } from './actions';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchedText: '',
    };

  }

  //Function can not live inside the constrctor or it will be out of scope to the return

  searchBar(event) {

    this.setState({ searchedText: event.target.value },
    () => {
      this.props.returnedData(this.state.searchedText);
    });

  };

  render() {
    const stocks = this.props.company.map(company => <li onClick={() => this.props.clickedStocks(company)} key={company.ticker}>{company.name}{company.ticker}</li>);

    return (
      <div className="App">
      <h1>Stock Ticker</h1>

      <input type="text" placeholder="Enter company name"
         onChange={(event) => this.searchBar(event)} value={this.state.searchedText}/>
        <ul>
          {stocks}
        </ul>

        <h2>Tracked Stocks</h2>
         <Graph/>
      </div>
    );
  }
}

export function mapStateToProps(state) {
  return {
    company: state.company,
    trackedStocks: state.trackedStocks,
  };
};

export function mapDispatchStatetoProps(dispatch) {

  return {

    clickedStocks: function (name) {
      fetch('https://young-plains-68972.herokuapp.com/api/companies/' + name.ticker)
      .then(resp => resp.json())
      .then(response => {
        const action = trackedStocks(response);
        console.log(response);
        dispatch(action);
      });
    },

    returnedData: function (name) {
      fetch('https://young-plains-68972.herokuapp.com/api/autocomplete?q=' + name)
      .then(resp => resp.json())
      .then(response => {
        const action = getListofCompanies(response);
        dispatch(action);
      });
    },
  };
};

export default connect(mapStateToProps, mapDispatchStatetoProps)(App);
