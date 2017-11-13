import {List, Map} from 'immutable';

const MAX_SELECTED_MARKETS = 4;

function setState(state = Map(), newState) {
	return state.merge(newState);
}

function addSelectedMarket(state, selectedMarket) {
	const selectedMarkets = state.get('selectedMarkets');
	const markets = state.get('marketData');
	const indexOf = selectedMarkets.indexOf(selectedMarket);
	if (indexOf == -1 && markets.has(selectedMarket.toUpperCase()) && selectedMarkets.size < MAX_SELECTED_MARKETS) {
		return state.set('selectedMarkets', selectedMarkets.push(selectedMarket));
	 } else {
	 	return state;
	}
}

function deleteSelectedMarket(state, selectedMarket) {
	const selectedMarkets = state.get('selectedMarkets');
	const indexOf = selectedMarkets.indexOf(selectedMarket);
	return state.set('selectedMarkets', selectedMarkets.delete(indexOf));
}

export default function(state = Map(), action) {
	switch(action.type) {
		case 'SET_STATE':
    		return setState(state, action.state);
    	case 'SET_SELECTED_MARKETS':
			return state.set('selectedMarkets', action.selectedMarkets);
		case 'ADD_SELECTED_MARKET':
			return addSelectedMarket(state, action.selectedMarket);
		case 'DELETE_SELECTED_MARKET':
			return deleteSelectedMarket(state, action.selectedMarket);
	}
	return state;
}