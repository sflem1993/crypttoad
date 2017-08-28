import React from 'react';

export default class MarketStats extends React.PureComponent {
	getLast() {
		return this.props.stats.get('Last') || -99;
	}
	getBid() {
		return this.props.stats.get('Bid') || -99;
	}
	getAsk() {
		return this.props.stats.get('Ask') || -99;
	}
	getHigh() {
		return this.props.stats.get('High') || -99;
	}
	getLow() {
		return this.props.stats.get('Low') || -99;
	}
	getPrevDay() {
		return this.props.stats.get('PrevDay') || -99;
	}
	render() {
		return <div className="marketStats">
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
	}
}