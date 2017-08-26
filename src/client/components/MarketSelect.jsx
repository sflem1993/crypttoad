import React from 'react';

export default class MarketSelect extends React.PureComponent {
	getMarkets() {
		return this.props.markets || [];
	}

	getSelectedMarkets() {
		return this.props.selectedMarkets || [];
	}

	render() {
		return <div className="sidebar">
			<div className="marketOptions">
				<select onChange={this.selectMarket}>
					<option></option>
					{this.getMarkets().map(market =>
						<option key={market}>{market}</option>
					)}
				</select>
			</div>
			<div className="selectedMarkets">

				{this.getSelectedMarkets().map(selectedMarket =>
					<div key={selectedMarket} className="selectedMarket">
						<div>{selectedMarket}</div>
						<div>XXX</div>
					</div>
				)}
			</div>
		</div>
	}
}