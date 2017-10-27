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
				<div className="main">
				<div className="leftSide">
					<div className="logo"><img src={logo}/></div>
					<MarketSelect {...this.props}/>
				</div>
				<div className="mainPageInfo">
					<div className="top">
						<div className="currencySelect"><AutoSelect/></div>
					</div>
					<div className="markets">
						<div className="market">
							<div className="marketGraph">
								<ResponsiveContainer height="100%" width="100%">
							    		<LineChart data={this.getData()}>
										  	<XAxis strokeWidth={2} dataKey="name"/>
									        <YAxis strokeWidth={2} />
									        <CartesianGrid  strokeDashArray="3 3" vertical={false}/>
									        <Line strokeWidth={5} type="monotone" dataKey="uv" stroke="#e3e3e3" />
								      	</LineChart>
								</ResponsiveContainer>
							</div>

							<div className="marketStats">
								<div className="marketStatsRow">
									<div className="marketStatsRowLabel">Current Price:</div>
									<div className="marketStatsRowValue">0.00000904</div>
								</div>
								<div className="marketStatsRow">
									<div className="marketStatsRowLabel">Current Bid:</div>
									<div className="marketStatsRowValue">0.00000890</div>
								</div>
								<div className="marketStatsRow">
									<div className="marketStatsRowLabel">Current Ask:</div>
									<div className="marketStatsRowValue">0.00000900</div>
								</div>
								<div className="marketStatsRow">
									<div className="marketStatsRowLabel">24 Hour High:</div>
									<div className="marketStatsRowValue">0.00000919</div>
								</div>
								<div className="marketStatsRow">
									<div className="marketStatsRowLabel">24 Hour Low:</div>
									<div className="marketStatsRowValue">0.00000819</div>
								</div>
								<div className="marketStatsRow">
									<div className="marketStatsRowLabel">24 Hours Ago:</div>
									<div className="marketStatsRowValue">0.00000900</div>
								</div>
							</div>
						</div>
							<div className="market">
							<div className="marketGraph">
								<ResponsiveContainer height="100%" width="100%">
							    		<LineChart data={this.getData()}>
										  	<XAxis strokeWidth={2} dataKey="name"/>
									        <YAxis strokeWidth={2} />
									        <CartesianGrid  strokeDashArray="3 3" vertical={false}/>
									        <Line strokeWidth={5} type="monotone" dataKey="uv" stroke="#e3e3e3" />
								      	</LineChart>
								</ResponsiveContainer>
							</div>

							<div className="marketStats">
								<div className="marketStatsRow">
									<div className="marketStatsRowLabel">Current Price:</div>
									<div className="marketStatsRowValue">0.00000904</div>
								</div>
								<div className="marketStatsRow">
									<div className="marketStatsRowLabel">Current Bid:</div>
									<div className="marketStatsRowValue">0.00000890</div>
								</div>
								<div className="marketStatsRow">
									<div className="marketStatsRowLabel">Current Ask:</div>
									<div className="marketStatsRowValue">0.00000900</div>
								</div>
								<div className="marketStatsRow">
									<div className="marketStatsRowLabel">24 Hour High:</div>
									<div className="marketStatsRowValue">0.00000919</div>
								</div>
								<div className="marketStatsRow">
									<div className="marketStatsRowLabel">24 Hour Low:</div>
									<div className="marketStatsRowValue">0.00000819</div>
								</div>
								<div className="marketStatsRow">
									<div className="marketStatsRowLabel">24 Hours Ago:</div>
									<div className="marketStatsRowValue">0.00000900</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className="rightSidebar">
					SS
				</div>
			</div>
			<div className="footer">
			</div>
		</div>
	}
}