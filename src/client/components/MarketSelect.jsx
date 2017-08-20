import React from 'react';

export default class MarketSelect extends React.PureComponent {
	getMarkets() {
		return this.props.markets || [];
	}
	render() {
		return <div className="marketSelect">
			<select>
				<option></option>
				{this.getMarkets().map(market =>
					<option>{market}</option>
				)}
			</select>
		</div>
	}
}