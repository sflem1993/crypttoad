import React from 'react';
import MarketSelect from './MarketSelect';

export default class Crypttoad extends React.PureComponent {
	getMarketInfo() {
		return this.props.marketInfo || [];
	}
	render() {
		return <div className="crypttoad">
			<MarketSelect {...this.props} />
			<div className="rest">
				{this.getMarketInfo().map(market =>
					<h1 key={market.name}>{market.name}</h1>
				)}
			</div>
		</div>
	}
}