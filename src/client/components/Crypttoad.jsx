import React from 'react';
import MarketGraph from './MarketGraph';
import MarketStats from './MarketStats';
import {MarketSelectContainer} from './MarketSelect';
import {AutoSelectContainer} from './AutoSelect';

import logo from './../img/logo.gif';

export default class Crypttoad extends React.PureComponent {

	render() {
		return <div className="crypttoad">
		<div className="main">
				<div className="leftSide">
					<div className="logo"><img src={logo}/></div>
					<MarketSelectContainer {...this.props}/>
				</div>
				<div className="mainPageInfo">
					<div className="top">
						<div className="currencySelect"><AutoSelectContainer {...this.props}/></div>
					</div>
					<div className="markets">
						<div className="market">
							<MarketGraph {...this.props}/>
							<MarketStats {...this.props}/>
						</div>
					</div>
				</div>
				<div className="rightSidebar">

				</div>
			</div>
			<div className="footer">
			</div>
		</div>
	}
}