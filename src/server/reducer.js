import {List, Map, fromJS} from 'immutable';
import moment from 'moment';
import 'moment-timezone';

function updateMarkets(state, marketData) {
	if (!state.has('marketData'))	{
		return state.set("marketData", fromJS(marketData));
	}
	var newState = state;
	var data = state.get('marketData');
	var finalMarketData = data.mapEntries(([finalMarket, finalMarketData]) => {
		newState = newState.updateIn(['marketData', finalMarket, 'stats'], stats => marketData.get(finalMarket).get('stats'));
	});
	return newState;
}

function updateMarketGraph(state) {
	var newState = state;
	var data = state.get('marketData');
	data.mapEntries(([market, marketData]) => {
		const size = marketData.get('PriceList').size;
		let time = moment().tz("EST").format("MMM D YYYY, h:mm A") + '  EST';
		let decimals = 8;
		if (market === 'BTC') {
			decimals = 2;
		}
		let newDataPoint = marketData.get('stats').get('Last').toFixed(decimals);
		if (size < 96) {
			data = data.updateIn([market, 'PriceList'], oldMarketData => oldMarketData.push({name: time, Price: newDataPoint}));
		} else {
			data = data.updateIn([market, 'PriceList'], oldMarketData => oldMarketData.shift().push({name: time, Price: newDataPoint}));
		}
	});
	newState = newState.set('marketData', data);
	return newState;
}


export default function reducer(state = Map(), action) {
	switch(action.type) {
		case 'UPDATE_MARKET_LIST':
			return state.set('markets', action.markets);
		case 'UPDATE_MARKET_DATA':
			return updateMarkets(state, action.marketData);
		case 'UPDATE_MARKET_GRAPH':
			return updateMarketGraph(state, action.marketData);
		default:
			return state;
	}
}