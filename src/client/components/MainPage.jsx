import React from 'react';
import {ResponsiveContainer, LineChart, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Line} from 'recharts';

export default class MainPage extends React.PureComponent {
	getSelectedMarkets() {
		if (!this.props.marketInfo) return [];
		return this.props.marketInfo.keySeq().toList();
	}
	getData() {
		return this.props.data || [];
	}
	render() {
		return <div className="mainPage">
				{this.getSelectedMarkets().map(market =>
					<div key={market} className="market">
						<div className="marketName">
							<h1 key={market}>{market}</h1>
						</div>
						<div className="marketInfo">
							<div className="marketGraph">GRAPH</div>
							<div className="marketStats">stats</div>
						</div>
						{/*
				    	<LineChart data={this.getData()}
				            margin={{top: 5, right: 30, left: 20, bottom: 5}}>
					       <XAxis dataKey="name"/>
					       <YAxis/>
					       <CartesianGrid strokeDasharray="3 3"/> co
					       <Tooltip/>
					       <Legend />
					       <Line type="monotone" dataKey="pv" stroke="#8884d8" activeDot={{r: 8}}/>
					       <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
				      </LineChart>
				      */}
					</div>
				)}
		</div>
	}
}