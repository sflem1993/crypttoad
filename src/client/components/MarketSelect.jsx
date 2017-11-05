import React from 'react';
import {List} from 'immutable';
import AutoSelect from './AutoSelect';

import close from './../img/newclose2.png';


export default class MarketSelect extends React.PureComponent {
	getMarkets() {
		if (this.props.selectedMarkets) {
			return List(this.props.selectedMarkets);
		} else {
			return [];
		}
	}

	render() {
		return <div className="selectedMarkets">
			{this.getMarkets().map(selectedMarket =>
				<div key={selectedMarket} className="selectedMarket">
					<div className="selectedMarketName">{selectedMarket}</div>
					<img  className="selectedMarketButton" src={close}/>
				</div>
			)}
		</div>
	}
}