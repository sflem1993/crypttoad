import React from 'react';
import {List} from 'immutable';
import {connect} from 'react-redux';

import close from './../img/newclose2.png';


export const MarketSelect = class MarketSelect extends React.PureComponent {
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

function mapStateToProps(state) {
  return {
    selectedMarkets: state.get('selectedMarkets')
  };
}

export const MarketSelectContainer = connect(mapStateToProps)(MarketSelect);