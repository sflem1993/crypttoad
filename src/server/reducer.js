import {List, Map, fromJS} from 'immutable';

function updateMarkets(state, marketData) {
	if (!state.has('marketData'))	{
		return state.set("marketData", fromJS(marketData));
	}
	var newState = state;
	var data = state.get('marketData');
	var finalMarketData = data.mapEntries(([finalMarket, finalMarketData]) => {
		console.log("11");
		const size = finalMarketData.get('PriceList').size;
		console.log(newState.getIn(['marketData', finalMarket]));
		if (size < 4) {
			newState = newState.updateIn(['marketData', finalMarket, 'PriceList'], marketData => marketData.push(finalMarketData.get('Last')));
		} else if (size === 4) {
			newState = newState.updateIn(['marketData', finalMarket, 'PriceList'], marketData => marketData.shift().push(finalMarketData.get('Last')));
		}
	});
	return newState;
}


export default function reducer(state = Map(), action) {
	switch(action.type) {
		case 'UPDATE_MARKET_LIST':
			return state.set('markets', action.markets);
		case 'UPDATE_MARKET_DATA':
			return updateMarkets(state, action.marketData);
		default:
			return state;
	}
}