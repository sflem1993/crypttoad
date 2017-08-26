import React from 'react';
import MarketSelect from './MarketSelect';
import MarketInfo from './MarketInfo';

import logo from './../img/frog1.png';

export default class Crypttoad extends React.PureComponent {
	render() {
		return <div className="crypttoad">
			<MarketSelect {...this.props} />
			<div className="page">
				<div className="logo">fdsa</div>
				<MarketInfo {...this.props} />
			</div>
		</div>
	}
}