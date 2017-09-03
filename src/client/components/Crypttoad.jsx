import React from 'react';
import MarketSelect from './MarketSelect';
import MainPage from './MainPage';

import logo from './../img/frog1.png';

export default class Crypttoad extends React.PureComponent {
	render() {
		return <div className="crypttoad">
			<MarketSelect {...this.props} />
			<div className="page">
				<div className="logo"><img src={logo}/></div>
				<MainPage {...this.props} />
				<div className="footer">footer</div>
			</div>
			<div className="sidebar">A sidebar</div>
		</div>
	}
}