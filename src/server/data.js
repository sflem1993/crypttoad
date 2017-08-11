import Bittrex from 'bittrex-wrapper';
import {List, Map} from 'immutable';

export const DATA_POINTS = 'price_list';
export const NULL_DATA_POINT = -1;
export const INITIAL_STATE = Map();
export const MAX_SIZE = 5766; //storing data every 15 seconds for 24 hour period

const bittrex = new Bittrex();

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