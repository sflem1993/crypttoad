import React from 'react';
import MarketSelect from './MarketSelect';
import MarketInfo from './MarketInfo';

export default class Crypttoad extends React.PureComponent {
	render() {
		return <div className="crypttoad">
			<div className="marketSelect"><MarketSelect {...this.props} /></div>
			<div className="page">
				<div className="logo">CRYPTTOAD BOX</div>
				<MarketInfo {...this.props} />
			</div>
		</div>
	}
}