import Bittrex from 'bittrex-wrapper';
import {List, Map, fromJS} from 'immutable';

export const DATA_POINTS = 'price_list';
export const MARKET_STATS = "market_stats";
export const MARKETS = "markets";
export const NULL_DATA_POINT = -1;
export const INITIAL_STATE = Map();
export const MAX_SIZE = 10; //storing data every 15 seconds for 24 hour period

const bittrex = new Bittrex();

//returns promise
export function getBTC() {
	return bittrex.publicGetTicker('BTC-LTC');
}

export function getBTCTest() {
	return bittrex.publicGetTicker('BTC-LTC');
}

//returns promise
export function getMarketSummaries() {
	return bittrex.publicGetMarketSummaries();
}

//returns promise
export function saveMarketSummaries() {
	bittrex.publicGetMarketSummaries().then((response) => {
		const currencies = response.result;

		for (let i = 0; i < currencies.length; i++) {
			let currency = currencies[i];
			//state update marketname -> last
			console.log(currency.MarketName + " " + currency.Last);
		}
	});
}

//returns promise
export function updateMarketList(data) {
	bittrex.publicGetMarkets().then((response) => {
		const currencies = response.result;

		var autoselectCurrencies = [];
		for (let i = 0; i < currencies.length; i++) {
			let currency = currencies[i];
			if (currency) {
				if (currency.BaseCurrency && currency.MarketCurrency) {
					autoselectCurrencies.push({currency: currency.MarketName});
				}
			}
		}

		return data.set()
	});
}

//currencyData - current list of data points for a specific currency
//newDataPoint - the new point of info being added to this currency
export function addPriceData(data = INITIAL_STATE, marketName, newDataPoint = NULL_DATA_POINT) {
	if (!data.get(marketName)) {
		return data.set(marketName, Map([[DATA_POINTS, List.of(newDataPoint)]]));
	}

	if (!data.get(marketName).get(DATA_POINTS)) {
		return data.updateIn([marketName, DATA_POINTS], List(), marketData => marketData.push(newDataPoint))
	}

	const size = data.get(marketName).get(DATA_POINTS).size;
	if (size < MAX_SIZE) {
		return data.updateIn([marketName, DATA_POINTS], marketData => marketData.push(newDataPoint));
	} else if (size === MAX_SIZE) {
		return data.updateIn([marketName, DATA_POINTS], marketData => marketData.shift().push(newDataPoint));
	} else {
		return addPriceData(data.updateIn([marketName, DATA_POINTS], marketData => marketData.shift()), marketName, newDataPoint);
	}
}

export function updateMin(data, marketName, newDataPoint) {
	if (!data.get(marketName)) {
		return data.set(marketName, Map([['min', newDataPoint]]));
	}
	if (!data.get(marketName).get('min')) {
		return data.setIn([marketName, 'min'], newDataPoint)
	}

	const min = data.get(marketName).get('min');

	if (newDataPoint < min) {
		return data.setIn([marketName, 'min'], newDataPoint)
	} else {
		return data;
	}
}

export function updateMax(data, marketName, newDataPoint) {
	if (!data.get(marketName)) {
		return data.set(marketName, Map([['max', newDataPoint]]));
	}
	if (!data.get(marketName).get('max')) {
		return data.setIn([marketName, 'max'], newDataPoint)
	}

	const max = data.get(marketName).get('max');

	if (newDataPoint > max) {
		return data.setIn([marketName, 'max'], newDataPoint)
	} else {
		return data;
	}
}

export function updateCurrencyInfo(data, marketName, rawNewInfo) {
	if (!data.get(marketName)) {
		return data.set(marketName, Map([[MARKET_STATS, rawNewInfo]]));
	}

	return data.setIn([marketName, MARKET_STATS], Map(rawNewInfo));
}

export function updateCurrencies(data = INITIAL_STATE, newCurrencyData = INITIAL_STATE) {
	var updatedState = data;
	for (const key of Object.keys(newCurrencyData)) {
		updatedState = addPriceData(updatedState, key, newCurrencyData[key]);
	}

	return updatedState;
}

export function getBittrexInfo() {
	bittrex.publicGetMarketSummaries().then((response) => {
		var newData = {};
		const markets = response.result;
		for (let i = 0; i < markets.length; i++) {
			let market = markets[i];
			newData[market.MarketName] = market.Last;
		}
		return newData;
	});
}

export function makeGraph(data, marketName) {
	const market = data.get(marketName);
	var graphData = List();
	for (let i=0; i<3; i++) {
		graphData = graphData.push(fromJS({
			'name': i,
			[marketName]: data.getIn([marketName, DATA_POINTS]).get(i),
		}));
	}
	return graphData;
}


export function getMarkets(data) {
	return data.keySeq().toList();
}