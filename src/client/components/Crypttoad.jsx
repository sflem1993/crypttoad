import React from 'react';
import {MarketSelectContainer} from './MarketSelect';
import {MainInfoContainer} from './MainInfo';

import logo from './../img/logo.gif';

export default class Crypttoad extends React.PureComponent {

	render() {
		return <div className="crypttoad">
		<div className="main">
				<div className="leftSide">
					<div className="logo"><img src={logo}/></div>
					<MarketSelectContainer {...this.props}/>
				</div>
				<MainInfoContainer {...this.props}/>
				<div className="rightSidebar">

				</div>
			</div>
			<div className="footer">
			</div>
		</div>
	}
}