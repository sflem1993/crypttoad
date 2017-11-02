import React from 'react';
import AutoSelect from './AutoSelect';

import close from './../img/newclose2.png';


export default class MarketSelect extends React.PureComponent {
	getMarkets() {
		return this.props.markets || [];
	}

	getSelectedMarkets() {
		if (!this.props.marketInfo) return [];
		return this.props.marketInfo.keySeq().toList();
	}

	render() {
		return <div className="selectedMarkets">
			{this.getSelectedMarkets().map(selectedMarket =>
				<div key={selectedMarket} className="selectedMarket">
					<div className="selectedMarketName">{selectedMarket}</div>
					<img  className="selectedMarketButton" src={close}/>
				</div>
			)}
		</div>
	}
}