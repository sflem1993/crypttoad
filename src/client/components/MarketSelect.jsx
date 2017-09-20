import React from 'react';

export default class MarketSelect extends React.PureComponent {
	getMarkets() {
		return this.props.markets || [];
	}

	getSelectedMarkets() {
		if (!this.props.marketInfo) return [];
		return this.props.marketInfo.keySeq().toList();
	}

	render() {
		return <div className="sidebar">
			<div className="marketOptions">
				<select>
					<option></option>
					{this.getMarkets().map(market =>
						<option key={market}>{market}</option>
					)}
				</select>
			</div>
			<div className="selectedMarkets">
				{this.getSelectedMarkets().map(selectedMarket =>
					<div key={selectedMarket} className="selectedMarket">
						<div className="selectedMarketName">{selectedMarket}</div>
						<div className="selectedMarketButton">XXX</div>
					</div>
				)}
			</div>
		</div>
	}
}