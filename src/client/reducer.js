
//VOTING-CLIENT
import {List, Map} from 'immutable';

function setState(state = Map(), newState) {
	return state.merge(newState);
}

function addSelectedMarket(state, selectedMarket) {
	const selectedMarkets = state.get('selectedMarkets');
	const indexOf = selectedMarkets.indexOf(selectedMarket);
	if (indexOf == -1) {
		return state.set('selectedMarkets', selectedMarkets.push(selectedMarket));
	 } else {
	 	return state;
	}
}

function deleteSelectedMarket(state, selectedMarket) {
	const selectedMarkets = state.get('selectedMarkets');
	const indexOf = selectedMarkets.indexOf(selectedMarket);
	console.log(selectedMarkets);
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
		//case 'SELECT_MARKET':
			//return selectMarket(state, action.market);
	}

	// if cant process action return state unchanged
	return state;
}