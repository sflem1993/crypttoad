import {List, Map, fromJS} from 'immutable';

function updateMarkets(state, marketData) {
	if (!state.has('marketData'))	{
		return state.set("marketData", fromJS(marketData));
	}
	var newState = state;
	var data = state.get('marketData');
	var finalMarketData = data.mapEntries(([finalMarket, finalMarketData]) => {
		const size = finalMarketData.get('PriceList').size;
		console.log(newState.getIn(['marketData', finalMarket]));
		if (size < 8) { //720
			newState = newState.updateIn(['marketData', finalMarket, 'PriceList'], marketData => marketData.push({price: finalMarketData.get('Last')}));
		} else {
			newState = newState.updateIn(['marketData', finalMarket, 'PriceList'], marketData => marketData.shift().push({price:finalMarketData.get('Last')}));
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