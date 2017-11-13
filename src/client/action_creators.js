export function setState(state) {
	return {
		type: 'SET_STATE',
		state
	};
}

export function setSelectedMarkets(selectedMarkets) {
	return {
		type: 'SET_SELECTED_MARKETS',
		selectedMarkets
	};
}

export function addSelectedMarket(selectedMarket) {
	return {
		type: 'ADD_SELECTED_MARKET',
		selectedMarket: selectedMarket.toUpperCase()
	};
}

export function deleteSelectedMarket(selectedMarket) {
	return {
		type: 'DELETE_SELECTED_MARKET',
		selectedMarket: selectedMarket.toUpperCase()
	};
}