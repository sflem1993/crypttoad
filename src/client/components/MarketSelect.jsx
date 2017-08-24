import React from 'react';

export default class MarketSelect extends React.PureComponent {
	getMarkets() {
		return this.props.markets || [];
	}

	getSelectedMarkets() {
		return this.props.selectedMarkets || [];
	}

	selectMarket() {

	}
	// get marketsel=ect?

	render() {
		return <div className="marketSelect">
			<div>
				<select onChange={this.selectMarket}>
					<option></option>
					{this.getMarkets().map(market =>
						<option key={market}>{market}</option>
					)}
				</select>
			</div>
			<div>
				SELECTED MARKETS:

				{this.getSelectedMarkets().map(selectedMarket =>
					{selectedMarket}
				)}
			</div>
		</div>
	}
}