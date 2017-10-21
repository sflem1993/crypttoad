import React from 'react';
import MarketSelect from './MarketSelect';
import MainPage from './MainPage';
import AutoSelect from './AutoSelect';

import {ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Area} from 'recharts';



import logo from './../img/rotaty.gif';

export default class Crypttoad extends React.PureComponent {
	getData() {
		return this.props.data || [];
	}
	render() {
		return <div className="crypttoad">
			<div className="leftSide">
				<div className="logo"><img src={logo}/></div>
				<MarketSelect {...this.props}/>
			</div>
			<div className="mainPageInfo">
				<div className="currencySelect"><AutoSelect/></div>
				<div className="markets">
					<div className="market">
						<div className="marketGraph">
							<ResponsiveContainer height="100%" width="100%">
						    		<LineChart data={this.getData()}>
									  	<XAxis dataKey="name"/>
								        <YAxis />
								        <CartesianGrid strokeDashArray="3 3" vertical={false}/>
								        <Line strokeWidth={5} type="monotone" dataKey="uv" stroke="#82ca9d" />
							      	</LineChart>
							</ResponsiveContainer>
						</div>

						<div className="marketStats">
							STATS
						</div>
					</div>
				</div>
				<div className="footer">

				</div>
			</div>
			<div className="rightSidebar">
				SS
			</div>
			{/*
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
		*/}
		</div>
	}
}