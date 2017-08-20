import io from 'socket.io-client';
import React from 'react';
import ReactDOM from  'react-dom';
import {Map} from 'immutable';
import Crypttoad from './components/Crypttoad';

require('./style.css');

const socket = io(`${location.protocol}//${location.hostname}:8090`);

const marketInfo = [{name: 'BTC-ETH', data_points: [1,2,3,9,5]}, {name: 'BTC-NEO', data_points: [1,2,3,4,5]}, {name: 'BTC-SCM', data_points: [1,2,3,4,5]}, {name: 'BTC-MKK', data_points: [1,2,3,4,5]}, {name: 'BTC-ZZL', data_points: [1,2,3,4,5]}];
const markets = ['BTC-ETH', 'BTC-NEO', 'BTC-SCM'];
ReactDOM.render(
	<Crypttoad marketInfo={marketInfo} markets={markets}/>,
	document.getElementById('app')
);