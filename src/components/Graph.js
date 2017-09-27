import React, { Component } from 'react';
import { trackedStocks } from '../actions';
import { Provider } from 'react-redux';
import store from 'react-redux';
import { connect } from 'react-redux';

class Graph extends Component {

  render () {
    const storedStocks = this.props.trackedStocks.map(company =>
    <li key={company.name}>
      <h1>{company.name}'s Rise or Downfall</h1>
      <p>{company.ticker}</p>
      <p>{company.prices}</p>
    </li>);

    return (
      <div>
        {storedStocks}
    </div>
    );
  };
};

export function mapStateToProps(state) {
  return {
    trackedStocks: state.trackedStocks,
  };
};

export function mapDispatchStatetoProps(dispatch) {

  return {

    clickedStocks: function (name) {
      fetch('https://young-plains-68972.herokuapp.com/api/companies/' + name)
      .then(resp => resp.json())
      .then(response => {
        const action = trackedStocks(response);
        console.log(response);
        dispatch(action);
      });
    },
  };
};

export default connect(mapStateToProps, mapDispatchStatetoProps)(Graph);
