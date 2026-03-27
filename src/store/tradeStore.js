export const addNewTrade = (prevTrades, trade) => {
  return [trade, ...prevTrades];
};

export const getTradeCount = (trades) => trades.length;
