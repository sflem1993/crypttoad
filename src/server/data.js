import {List, Map} from 'immutable';

export const INITIAL_DATA = List();
export const MAX_SIZE = 5760; //storing data every 15 seconds for 24 hour period

export function addPriceData(data, newData) {
	if (data.size < MAX_SIZE) {
		return data.push(newData);
	} else if (data.size === MAX_SIZE) {
		return data.delete(MAX_SIZE - 1).insert(0, newData);
	} else {
		return addPriceData(data.delete(data.size - 1), newData);
	}
}