import React from 'react';
import MarketSelect from './MarketSelect';
import MainPage from './MainPage';
import AutoSelect from './AutoSelect';


import logo from './../img/rotaty.gif';

export default class Crypttoad extends React.PureComponent {
	render() {
		return <div className="crypttoad">
			<div className="leftSide">
				<div className="logo"><img src={logo}/></div>
				<MarketSelect {...this.props}/>
			</div>
			<div className="theStuff">
				<div className="topStuff">
					<div className="theSelect"><AutoSelect/></div>
					<div className="topRight">RIGHT TOP</div>
				</div>
				<MainPage {...this.props}/>
				<div className="footer">
					<div>A FOOT</div>
					<div>B FOOT</div>
					<div>C FOOT</div>
				</div>
			</div>
		</div>
	}
}