export function getListofCompanies(result) {
  return {
    type: 'COMPANY LIST',
    payload: result,
  };
};

export function trackedStocks(result) {
  return {
    type: 'TRACKED STOCKS',
    payload: result,
  };
};
