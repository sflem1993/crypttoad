import React from 'react';
import {List} from 'immutable';
import {connect} from 'react-redux';
import * as actionCreators from '../action_creators';

import close from './../resources/close.png';


export const MarketSelect = class MarketSelect extends React.PureComponent {
	getMarkets() {
		return this.props.selectedMarkets || [];
	}

	render() {
		return <div className="selectedMarkets">
			{this.getMarkets().map(selectedMarket =>
				<div key={selectedMarket} className="selectedMarket">
					<div className="selectedMarketName">{selectedMarket.toUpperCase()}</div>
					<img
						className="selectedMarketButton"
						onClick={() => this.props.deleteSelectedMarket(selectedMarket)}
						src={close}/>
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

export const MarketSelectContainer = connect(mapStateToProps, actionCreators)(MarketSelect);