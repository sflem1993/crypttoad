import {List, Map} from 'immutable';

export const NULL_DATA_POINT = -1;
export const INITIAL_STATE = Map();
export const INITIAL_CURRENCY_STATE = List();
export const MAX_SIZE = 5766; //storing data every 15 seconds for 24 hour period

//currencyData - current list of data points for a specific currency
//newCurrencyDataPoint - the new point of info being added to this currency
export function addPriceData(currencyData = INITIAL_CURRENCY_STATE, newCurrencyDataPoint = NULL_DATA_POINT) {
	if (currencyData.size < MAX_SIZE) {
		return currencyData.push(newCurrencyDataPoint);
	} else if (currencyData.size === MAX_SIZE) {
		return currencyData.shift().push(newCurrencyDataPoint);
	} else {
		return addPriceData(currencyData.shift(), newCurrencyDataPoint);
	}
}

//data - current data, aka map of all currencies to info
//newCurrencyData - map of all currencies to new data
export function updateCurrencies(data = INITIAL_STATE, newCurrencyData = INITIAL_STATE) {
	return data.map((currencyData, currency) => addPriceData(currencyData, newCurrencyData.get(currency)));
}