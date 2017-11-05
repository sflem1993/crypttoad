import React from 'react';
import MarketSelect from './MarketSelect';
import {AutoSelectContainer} from './AutoSelect';

import {ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Area} from 'recharts';



import logo from './../img/rotaty.gif';

export default class Crypttoad extends React.PureComponent {
	getData() {
		return this.props.data || [];
	}
	getDomain() {
		var min = 0.00000827;
		var max = 0.00000962;
		return [min, max];
	}
	getTicks() {
		var min = 0.00000827;
		var max = 0.00000962;
		var interval = (max - min) / 4;
		return [min, (min + interval).toFixed(8), (min + (2*interval)).toFixed(8), (min + (3*interval)).toFixed(8), max];
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
						<div className="currencySelect"><AutoSelectContainer {...this.props}/></div>
					</div>
					<div className="markets">
						<div className="market">
							<div className="marketGraph">
								<ResponsiveContainer height="100%" width="100%">
							    		<LineChart data={this.getData()}>
										  	<XAxis tickSize={10} strokeWidth={3} label="30 second interval" dataKey="name"/>
									        <YAxis
									        	type="number"
									        	ticks={this.getTicks()}
									        	domain={this.getDomain()}
									        	strokeWidth={3}
          										interval={0}
									        />
									        <CartesianGrid vertical={false}/>
									        <Tooltip/>
									        <Line strokeWidth={3} type="monotone" dataKey="uv" stroke="#e3e3e3" />
								      	</LineChart>
								</ResponsiveContainer>
							</div>

							<div className="marketStats">
								<div className="marketStatsRow">
									<div className="marketStatsRowLabel">Last Sold:</div>
									<div className="marketStatsRowValue">0.00000904</div>
								</div>
								<div className="marketStatsRow">
									<div className="marketStatsRowLabel">Bid:</div>
									<div className="marketStatsRowValue">0.00000890</div>
								</div>
								<div className="marketStatsRow">
									<div className="marketStatsRowLabel">Ask:</div>
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

				</div>
			</div>
			<div className="footer">
			</div>
		</div>
	}
}