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
			var rawData = this.props.marketData.get(this.props.selectedMarket).get('stats').get(statName);
			if (!rawData) {
			    return 'N/A'
			}
			return parseFloat(rawData).toFixed(this.getDecimals()) //+ format
		}

		return 'N/A';
	}

	getTickerStat(statName){
    		if (this.props.marketTickerData && this.props.marketTickerData.has(this.props.selectedMarket)) {
    			var rawData = this.props.marketTickerData.get(this.props.selectedMarket).get(statName);
    			if (!rawData) {
    			    return 'N/A'
    			}
    			return parseFloat(rawData).toFixed(this.getDecimals()) //+ format
    		}

    		return 'N/A';
    	}

    getLast() {
        return this.getTickerStat('lastTradeRate');
    }

    getBid() {
        return this.getTickerStat('bidRate');
    }

    getAsk() {
        return this.getTickerStat('askRate');
    }

	getHigh() {
        return this.getStat('high');
    }

    getLow() {
        return this.getStat('low');
    }

    getPercentChange() {
    	return this.getStat('percentChange');
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
						<div className="marketStatsRowLabel">LAST 24 HRS:</div>
						<div className="marketStatsRowValue">{this.getPercentChange()}</div>
					</div>
			</div>
		</div>
	}
}

function mapStateToProps(state) {
  return {
    marketData: state.get('marketData'),
    marketTickerData: state.get('marketTickerData')
  };
}

export const MarketStatsContainer = connect(mapStateToProps, actionCreators)(MarketStats);