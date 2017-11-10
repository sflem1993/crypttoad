import React from 'react';
import {List} from 'immutable';
import {connect} from 'react-redux';
import {AutoSelectContainer} from './AutoSelect';
import {MarketGraphContainer} from './MarketGraph';
import {MarketStatsContainer} from './MarketStats';
import * as actionCreators from '../action_creators';

export default class MainInfo extends React.PureComponent {
	getMarkets() {
		return this.props.selectedMarkets || [];
	}

	render() {
		return <div className="mainPageInfo">
			<div className="top">
				<div className="currencySelect"><AutoSelectContainer {...this.props}/></div>
			</div>
			<div className="markets">
				{this.getMarkets().map(selectedMarket =>
					<div key={selectedMarket} className="market">
						<MarketGraphContainer selectedMarket={selectedMarket} {...this.props}/>
						<MarketStatsContainer selectedMarket={selectedMarket} {...this.props}/>
					</div>
				)}
			</div>
		</div>
	}
}

function mapStateToProps(state) {
  return {
    selectedMarkets: state.get('selectedMarkets')
  };
}

export const MainInfoContainer = connect(mapStateToProps, actionCreators)(MainInfo);