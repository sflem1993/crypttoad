import React from 'react';
import {List, Map} from 'immutable';
import {ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Area, Label} from 'recharts';

import {connect} from 'react-redux';
import * as actionCreators from '../action_creators';


export const MarketGraph = class MarketGraph extends React.PureComponent {
	getData() {
		if (this.props.marketData && this.props.marketData.has(this.props.selectedMarket)) {
			return this.props.marketData.get(this.props.selectedMarket).get('PriceList').toJS();
		}
		return [];
	}
	getFakeData() {
		return [
      {price: 0.00000904},
      {price: 0.00000899},
      {price: 0.00000903},
      {price: 0.00000906},
      {price: 0.00000909},
      {price: 0.00000915},
      {price: 0.00000945},
      {price: 0.00000914},
      {price: 0.00000919},
      {price: 0.00000957},
      {price: 0.00000910},
      {price: 0.00000918},
      {price: 0.00000919},
      {price: 0.00000919},
      {price: 0.00000919},
      {price: 0.00000919},
      {price: 0.00000919},
      {price: 0.00000919},
      {price: 0.00000919},
      {price: 0.00000919},
      {price: 0.00000919},
      {price: 0.00000919},
      {price: 0.00000832},
      {price: 0.00000919},
      {price: 0.00000919},

];
	}
	getDomain() {
		if (this.props.marketData && this.props.marketData.has(this.props.selectedMarket)) {
			var min = this.props.marketData.get(this.props.selectedMarket).get('stats').get('Low');
			var max = this.props.marketData.get(this.props.selectedMarket).get('stats').get('High');
			return [min, max];
		}
		return [0, 1];
	}
	getTicks() {
		if (this.props.marketData && this.props.marketData.has(this.props.selectedMarket)) {

			var min = this.props.marketData.get(this.props.selectedMarket).get('stats').get('Low');
			var max = this.props.marketData.get(this.props.selectedMarket).get('stats').get('High');

			var interval = (max - min) / 4;
			var tick1 = (min + interval)
			var tick2 = (min + (2*interval));
			var tick3 =(min + (3*interval));
			var decimals = 0;
			if (this.props.selectedMarket !== 'BTC')
			{
				decimals = 8;
			}
			return [min.toFixed(decimals), tick1.toFixed(decimals), tick2.toFixed(decimals), tick3.toFixed(decimals), max.toFixed(decimals)];
		}
		return [0, 1];
	}
	getSelectedMarket() {
		return this.props.selectedMarket || [];
	}
	getMarketInfo() {
		return this.props.marketData || [];
	}

	getMarketInfoZ() {
		if (this.props.marketData && this.props.marketData.has(this.props.selectedMarket)) {
			return this.props.marketData.get(this.props.selectedMarket);
		}

		return []
	}

	getYAxisLabel() {
		if (this.props.selectedMarket === 'BTC') {
			return '(USD)';
		} else {
			return '(BTC)';
		}
	}

	render() {
		return <div className="marketGraph">
			<ResponsiveContainer height="100%" width="100%">
    		<LineChart data={this.getData()}>
			  	<XAxis tickSize={10} interval={3}  domain={this.getDomain()} strokeWidth={3} label="LAST 24 HOURS (15 MINUTE INTERVALS)" dataKey="name"/>
		        <YAxis
		        	type="number"
		        	ticks={this.getTicks()}
		        	domain={this.getDomain()}
		        	strokeWidth={3}
					interval={0}
		        >
		        	<Label value={this.getYAxisLabel()} position="bottom" angle={-15} offset={15}/>
		        </YAxis>
		        <CartesianGrid vertical={false}/>
		        <Tooltip/>
		        <Line strokeWidth={3} type="monotone" dataKey="price" stroke="#e3e3e3" dot={false}/>
	      	</LineChart>
			</ResponsiveContainer>
		</div>


	}
}

function mapStateToProps(state) {
  return {
    marketData: state.get('marketData')
  };
}

export const MarketGraphContainer = connect(mapStateToProps, actionCreators)(MarketGraph);