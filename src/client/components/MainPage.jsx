import React from 'react';
import {ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Area} from 'recharts';
import MarketStats from './MarketStats';

export default class MainPage extends React.PureComponent {
	getSelectedMarkets() {
		if (!this.props.marketInfo) return [];
		return this.props.marketInfo.keySeq().toList();
	}

	getMarketInfo() {
		if (!this.props.marketInfo) return [];
		return this.props.marketInfo || [];
	}
	getData() {
		return this.props.data || [];
	}
	render() {
		return <div className="mainStuff">
				{this.getMarketInfo().entrySeq().map( ([marketName, marketInfo]) =>
					<div key={marketName} className="market">
							<div className="marketGraph">
								<ResponsiveContainer height="100%" width="100%">
						    		<LineChart data={this.getData()}>
									  	<XAxis dataKey="name"/>
								        <YAxis />
								        <CartesianGrid strokeDashArray="3 3" vertical={false}/>
								        <Tooltip/>
								        <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
							      	</LineChart>
					      		</ResponsiveContainer>
							</div>
							<MarketStats marketName={marketName} stats={marketInfo.get('market_stats')}/>
					</div>
				)}
		</div>
	}
}