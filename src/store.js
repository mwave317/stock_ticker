import { createStore } from 'redux';

function reducer(state, action) {

  if (action.type === 'COMPANY LIST') {

    return {
      company: state.company.concat(action.payload),
      trackedStocks: state.trackedStocks,
    };
  }

  if (action.type === 'TRACKED STOCKS') {

    return {
      company: state.company,
      trackedStocks: state.trackedStocks.concat(action.payload),
    };
  }

  return state;
}

export const store = createStore(reducer, {
  company: [],
  trackedStocks: [],
});
