import React from 'react';
import {List} from 'immutable';
import {ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Area} from 'recharts';

//import {connect} from 'react-redux';

//import * as actionCreators from '../action_creators';


export default class MarketGraph extends React.PureComponent {
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
	getMarkets() {
		if (this.props.selectedMarkets) {
			return List(this.props.selectedMarkets);
		} else {
			return [];
		}
	}

	render() {
		return <div className="marketGraph">
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

	}
}

// function mapStateToProps(state) {
//   return {
//     selectedMarkets: state.get('selectedMarkets')
//   };
// }

//export const MarketSelectContainer = connect(mapStateToProps, actionCreators)(MarketSelect);