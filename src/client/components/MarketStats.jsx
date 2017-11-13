import React from 'react';
import {connect} from 'react-redux';
import * as actionCreators from '../action_creators';

export const MarketStats = class MarketStats extends React.PureComponent {
	getDecimals() {
		var decimals = 2;
		if (this.props.selectedMarket !== 'BTC')
		{
			decimals = 8;
		}
		return decimals;
	}

	getStat(statName){
		if (this.props.marketData && this.props.marketData.has(this.props.selectedMarket)) {
			var rawData = this.props.marketData.get(this.props.selectedMarket).get('stats').get(statName).toFixed(this.getDecimals());
			var priceBTC = this.props.marketData.get('BTC').get('stats').get('Last');
			var format = '';
			if (this.props.selectedMarket !== 'BTC') {
				format =  ' BTC';
				var priceMarketInBTC = priceBTC * rawData;
				if (priceMarketInBTC > .01) {
					format = format + ' ($' + priceMarketInBTC.toFixed(2) + ')';
				}
			} else {
				return '$' + rawData;
			}
			return rawData + format
		}

		return [];
	}

	getLast() {
		return this.getStat('Last');
	}

	getBid() {
		return this.getStat('Bid');
	}

	getAsk() {
		return this.getStat('Ask');
	}

	getHigh() {
		return this.getStat('High');
	}

	getLow() {
		return this.getStat('Low');
	}

	getPrevDay() {
		return this.getStat('PrevDay');
	}
	render() {
		return <div className="marketStatsContainer">
			<div className="marketStats">
					<div className="marketStatsRow">
						<div className="marketStatsRowLabel">LAST SOLD:</div>
						<div className="marketStatsRowValue">{this.getLast()}</div>
					</div>
					<div className="marketStatsRow">
						<div className="marketStatsRowLabel">LAST BID:</div>
						<div className="marketStatsRowValue">{this.getBid()}</div>
					</div>
					<div className="marketStatsRow">
						<div className="marketStatsRowLabel">LAST ASK:</div>
						<div className="marketStatsRowValue">{this.getAsk()}</div>
					</div>
					<div className="marketStatsRow">
						<div className="marketStatsRowLabel">24 HOUR HIGH:</div>
						<div className="marketStatsRowValue">{this.getHigh()}</div>
					</div>
					<div className="marketStatsRow">
						<div className="marketStatsRowLabel">24 HOUR LOW:</div>
						<div className="marketStatsRowValue">{this.getLow()}</div>
					</div>
					<div className="marketStatsRow">
						<div className="marketStatsRowLabel">24 HOURS AGO:</div>
						<div className="marketStatsRowValue">{this.getPrevDay()}</div>
					</div>
			</div>
		</div>
	}
}

function mapStateToProps(state) {
  return {
    marketData: state.get('marketData')
  };
}

export const MarketStatsContainer = connect(mapStateToProps, actionCreators)(MarketStats);