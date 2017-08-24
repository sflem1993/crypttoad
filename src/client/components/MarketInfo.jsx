import React from 'react';
import {LineChart, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Line} from 'recharts';

export default class MarketInfo extends React.PureComponent {
	getSelectedMarkets() {
		return this.props.selectedMarkets || [];
	}
	getData() {
		return this.props.data || [];
	}
	render() {
		return <div className="marketInfo">
				{this.getSelectedMarkets().map(market =>
					<div class="market">
						<h1 key={market}>{market}</h1>
				    	<LineChart width={800} height={400} data={this.getData()}
				            margin={{top: 5, right: 30, left: 20, bottom: 5}}>
					       <XAxis dataKey="name"/>
					       <YAxis/>
					       <CartesianGrid strokeDasharray="3 3"/>
					       <Tooltip/>
					       <Legend />
					       <Line type="monotone" dataKey="pv" stroke="#8884d8" activeDot={{r: 8}}/>
					       <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
				      </LineChart>
					</div>
				)}
		</div>
	}
}