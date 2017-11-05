
//VOTING-CLIENT
import {List, Map} from 'immutable';

function setState(state = Map(), newState) {
	return state.merge(newState);
}


export default function(state = Map(), action) {
	switch(action.type) {
		case 'SET_STATE':
    		return setState(state, action.state);
    	case 'UPDATED_SELECTED_MARKETS':
			return state.set('selectedMarkets', action.selectedMarkets);
		//case 'SELECT_MARKET':
			//return selectMarket(state, action.market);
	}

	// if cant process action return state unchanged
	return state;
}