import React from 'react';
import Select from 'react-select';

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
				<Select
					name="market-select"
					options={this.getMarkets()}
				/>
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