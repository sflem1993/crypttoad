import React from 'react';
import MarketSelect from './MarketSelect';
import MarketInfo from './MarketInfo';

export default class Crypttoad extends React.PureComponent {
	render() {
		return <div className="crypttoad">
			<div className="logo">
				CRYPTTOAD
			</div>
			<div className="main">
				<MarketSelect {...this.props} />
				<MarketInfo {...this.props} />
			</div>
		</div>
	}
}