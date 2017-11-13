import React from 'react';
import TheToad from './TheToad';
import {connect} from 'react-redux';
import {MarketGraphContainer} from './MarketGraph';
import {MarketStatsContainer} from './MarketStats';
import * as actionCreators from '../action_creators';
import logo from './../resources/logo.gif';

export const Markets = class Markets extends React.PureComponent {
	getMarkets() {
		return this.props.selectedMarkets || [];
	}
	render() {
		return this.props.selectedMarkets.size == 0 ?
			<TheToad/> :
			<div className="markets">
				{this.getMarkets().map(selectedMarket =>
					<div key={selectedMarket} className="market">
						<MarketGraphContainer selectedMarket={selectedMarket} {...this.props}/>
						<MarketStatsContainer selectedMarket={selectedMarket} {...this.props}/>
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

export const MarketsContainer = connect(mapStateToProps, actionCreators)(Markets);