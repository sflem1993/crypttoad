import {List, Map} from 'immutable';

export const DATA_POINTS = 'price_list';
export const NULL_DATA_POINT = -1;
export const INITIAL_STATE = Map();
export const MAX_SIZE = 5766; //storing data every 15 seconds for 24 hour period

//currencyData - current list of data points for a specific currency
//newDataPoint - the new point of info being added to this currency
export function addPriceData(currencyData = INITIAL_STATE, newDataPoint = NULL_DATA_POINT) {
	if (currencyData.get(DATA_POINTS).size < MAX_SIZE) {
		return currencyData.update(DATA_POINTS, data_points => data_points.push(newDataPoint));
	} else if (currencyData.get(DATA_POINTS).size === MAX_SIZE) {
		return currencyData.update(DATA_POINTS, data_points => data_points.shift().push(newDataPoint));
	} else {
		return addPriceData(currencyData.update(DATA_POINTS, data_points => data_points.shift()), newDataPoint);
	}
}

//data - current data, aka map of all currencies to info
//newCurrencyData - map of all currencies to new data
export function updateCurrencies(data = INITIAL_STATE, newCurrencyData = INITIAL_STATE) {
	return data.map((currencyData, currency) => addPriceData(currencyData, newCurrencyData.get(currency)));
}