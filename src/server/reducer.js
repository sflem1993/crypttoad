import {List, Map, fromJS} from 'immutable';

import moment from 'moment';
import 'moment-timezone';


function updateMarkets(state, marketData) {
	if (!state.has('marketData'))	{
		return state.set("marketData", fromJS(marketData));
	}
	var newState = state;
	var data = state.get('marketData');
	var counter = state.get('counter');
	var setPriceList = false;
	if (!counter) {
		newState = state.set('counter', 1);
		setPriceList = true;
	} else {
		counter++;
		if (counter == 2) {
			newState = state.set('counter', 1);
			setPriceList = true;
		} else {
			newState = state.set('counter', counter);
		}
	}
	var finalMarketData = data.mapEntries(([finalMarket, finalMarketData]) => {
		newState = newState.updateIn(['marketData', finalMarket, 'stats'], stats => marketData.get(finalMarket).get('stats'));
		if (setPriceList) {
			const size = finalMarketData.get('PriceList').size;
			let time = moment().tz("EST").format("MMM D YYYY, h:mm A") + '  EST';
			let decimals = 8;
			if (finalMarket === 'BTC') {
				decimals = 2;
			}
			let newDataPoint = marketData.get(finalMarket).get('stats').get('Last').toFixed(decimals);
			if (size < 96) { //720
				newState = newState.updateIn(['marketData', finalMarket, 'PriceList'], oldMarketData => oldMarketData.push({name: time, Price: newDataPoint}));
			} else {
				newState = newState.updateIn(['marketData', finalMarket, 'PriceList'], oldMarketData => oldMarketData.shift().push({name: time, Price: newDataPoint}));
			}
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