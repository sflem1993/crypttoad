import io from 'socket.io-client';
import React from 'react';
import ReactDOM from  'react-dom';
import {Map} from 'immutable';
import Crypttoad from './components/Crypttoad';

require('./style.css');

const socket = io(`${location.protocol}//${location.hostname}:8090`);

const marketInfo = [{name: 'BTC-ETH', data_points: [1,2,3,9,5]}, {name: 'BTC-NEO', data_points: [1,2,3,4,5]}];
const markets = ['BTC-ETH', 'BTC-NEO', 'BTC-SCM'];
const selectedMarkets = ['BTC-ETH', 'BTC-NEO'];
const data = [
      {name: 'Page A', uv: 4000, pv: 2400, amt: 2400},
      {name: 'Page B', uv: 3000, pv: 1398, amt: 2210},
      {name: 'Page C', uv: 2000, pv: 9800, amt: 2290},
      {name: 'Page D', uv: 2780, pv: 3908, amt: 2000},
      {name: 'Page E', uv: 1890, pv: 4800, amt: 2181},
      {name: 'Page F', uv: 2390, pv: 3800, amt: 2500},
      {name: 'Page G', uv: 3490, pv: 4300, amt: 2100},
];
ReactDOM.render(
	<Crypttoad marketInfo={marketInfo} markets={markets} selectedMarkets={selectedMarkets} data={data}/>,
	document.getElementById('app')
);