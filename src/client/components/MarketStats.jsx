import React from 'react';
import {connect} from 'react-redux';
import * as actionCreators from '../action_creators';

export default class MarketStats extends React.PureComponent {
	getLast() {
		if (this.props.marketData && this.props.marketData.has(this.props.selectedMarket)) {
			return this.props.marketData.get(this.props.selectedMarket).get('Last');
		}

		return []
	}
	getBid() {
		if (this.props.marketData && this.props.marketData.has(this.props.selectedMarket)) {
			return this.props.marketData.get(this.props.selectedMarket).get('Bid');
		}

		return []
	}
	getAsk() {
		if (this.props.marketData && this.props.marketData.has(this.props.selectedMarket)) {
			return this.props.marketData.get(this.props.selectedMarket).get('Ask');
		}

		return []
	}
	getHigh() {
		if (this.props.marketData && this.props.marketData.has(this.props.selectedMarket)) {
			return this.props.marketData.get(this.props.selectedMarket).get('High');
		}

		return []
	}
	getLow() {
		if (this.props.marketData && this.props.marketData.has(this.props.selectedMarket)) {
			return this.props.marketData.get(this.props.selectedMarket).get('Low');
		}

		return []
	}
	getPrevDay() {
		if (this.props.marketData && this.props.marketData.has(this.props.selectedMarket)) {
			return this.props.marketData.get(this.props.selectedMarket).get('PrevDay');
		}

		return []
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
	{/*	 <div className="marketStats">
			<div className="marketStatsRow">
				<div className="marketStatsRowLabel">Last</div>
				<div className="marketStatsRowValue">{this.getLast()}</div>
			</div>
			<div className="marketStatsRow">
				<div className="marketStatsRowLabel">Current Bid</div>
				<div className="marketStatsRowValue">{this.getBid()}</div>
			</div>
			<div className="marketStatsRow">
				<div className="marketStatsRowLabel">Current Ask</div>
				<div className="marketStatsRowValue">{this.getAsk()}</div>
			</div>
			<div className="marketStatsRow">
				<div className="marketStatsRowLabel">24 Hour High</div>
				<div className="marketStatsRowValue">{this.getHigh()}</div>
			</div>
			<div className="marketStatsRow">
				<div className="marketStatsRowLabel">24 Hour Low</div>
				<div className="marketStatsRowValue">{this.getLow()}</div>
			</div>
			<div className="marketStatsRow">
				<div className="marketStatsRowLabel">24 Hours Ago</div>
				<div className="marketStatsRowValue">{this.getPrevDay()}</div>
			</div>
		</div>
	*/}
	}
}

function mapStateToProps(state) {
  return {
    marketData: state.get('marketData')
  };
}

export const MarketStatsContainer = connect(mapStateToProps, actionCreators)(MarketStats);