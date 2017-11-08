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
		return <div className="marketStatsContainer">
				<div className="marketStats">
				<div className="marketStatsRow">
					<div className="marketStatsRowLabel">LAST SOLD:</div>
					<div className="marketStatsRowValue">0.00000904</div>
				</div>
				<div className="marketStatsRow">
					<div className="marketStatsRowLabel">LAST BID:</div>
					<div className="marketStatsRowValue">0.00000890</div>
				</div>
				<div className="marketStatsRow">
					<div className="marketStatsRowLabel">LAST ASK:</div>
					<div className="marketStatsRowValue">0.00000900</div>
				</div>
				<div className="marketStatsRow">
					<div className="marketStatsRowLabel">24 HOUR HIGH:</div>
					<div className="marketStatsRowValue">0.00000919</div>
				</div>
				<div className="marketStatsRow">
					<div className="marketStatsRowLabel">24 HOUR LOW:</div>
					<div className="marketStatsRowValue">0.00000819</div>
				</div>
				<div className="marketStatsRow">
					<div className="marketStatsRowLabel">24 HOURS AGO:</div>
					<div className="marketStatsRowValue">0.00000900</div>
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