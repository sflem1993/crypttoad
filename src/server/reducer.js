import {List, Map, fromJS} from 'immutable';
import moment from 'moment';
import 'moment-timezone';

const MAX_DATA_POINTS= 97;
const BTC_BASE_CURRENCY_DECIMALS = 8;
const USDT_BASE_CURRENCY_DECIMALS = 2;

function updateMarkets(state, marketData) {
	if (!state.has('marketData'))	{
		return state.set("marketData", fromJS(marketData));
	}
	var newState = state;
	var data = state.get('marketData');
	marketData.mapEntries(([finalMarket, finalMarketData]) => {
		if (data.get(finalMarket)) {
			newState = newState.updateIn(['marketData', finalMarket, 'stats'], stats => marketData.get(finalMarket).get('stats'));
		} else {
			newState = newState.setIn(['marketData', finalMarket], fromJS(finalMarketData));
		}
	});
	return newState;
}

function updateMarketTickers(state, marketData) {
    console.log("updating tickers")
	if (!state.has('marketTickerData'))	{
		return state.set("marketTickerData", fromJS(marketData));
	}
	var newState = state;
	var data = state.get('marketTickerData');
	marketData.mapEntries(([finalMarket, finalMarketData]) => {
		newState = newState.setIn(['marketTickerData', finalMarket], fromJS(finalMarketData));
	});
	return newState;
}

function updateMarketGraph(state) {
	var newState = state;
	var data = state.get('marketData');
	var tickerData = state.get('marketTickerData')
	let time =  moment().tz('America/New_York').format("MMM D YYYY, h:mm A") + '  EST';

	data.mapEntries(([market, marketData]) => {
		const size = marketData.get('PriceList').size;
		let decimals = BTC_BASE_CURRENCY_DECIMALS;
		if (market === 'BTC') {
			decimals = USDT_BASE_CURRENCY_DECIMALS;
		}
		let newDataPoint = parseFloat(tickerData.get(market).get('lastTradeRate'));
		let newGraphMin = parseFloat(marketData.get('stats').get('low'));
		let newGraphMax = parseFloat(marketData.get('stats').get('high'));
		if (newDataPoint > 0.0 && newGraphMin >= 0.0 && newGraphMax > 0.0) {
			let formattedDataPoint = parseFloat(newDataPoint).toFixed(decimals);
			let graphDomain = {Low: newGraphMin, High: newGraphMax};
			data = data.setIn([market, 'graphDomain'], graphDomain);
			if (size < MAX_DATA_POINTS) {
				data = data.updateIn([market, 'PriceList'], oldMarketData =>
					oldMarketData.push({name: time, Price: formattedDataPoint}));
			} else {
				data = data.updateIn([market, 'PriceList'], oldMarketData =>
					oldMarketData.shift().push({name: time, Price: formattedDataPoint}));
			}
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
		case 'UPDATE_MARKET_TICKER_DATA':
        	return updateMarketTickers(state, action.marketData);
		case 'UPDATE_MARKET_GRAPH':
			return updateMarketGraph(state, action.marketData);
		default:
			return state;
	}
}