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