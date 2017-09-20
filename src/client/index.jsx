import io from 'socket.io-client';
import React from 'react';
import ReactDOM from  'react-dom';
import {List, fromJS} from 'immutable';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import reducer from './reducer';
import Crypttoad from './components/Crypttoad';

require('./style.css');

const socket = io(`${location.protocol}//${location.hostname}:8090`);

const marketInfo = fromJS({
      'ETH' : {
            data_points: [1,2,3,9,5],
            market_stats: {
                  Bid: .00000354,
                  Ask: .00000377,
                  Last: .00000358,
                  High: .00000456,
                  Low: .00000299,
                  PrevDay: .00000323
            }
      },
      'NEO' : {
            data_points: [1,2,3,4,5],
            market_stats: {
                  Bid: .00003432,
                  Ask: .00003667,
                  Last: .00003434,
                  High: .00004998,
                  Low: .00003229,
                  PrevDay: .00004888
            }
      }
});
const markets = List.of('ETH', 'NEO', 'SCM');
const selectedMarkets = List.of('ETH', 'NEO');
const data = [
      {name: 'Page A', uv: 4000, pv: 2400, amt: 2400},
      {name: 'Page B', uv: 3000, pv: 1398, amt: 2210},
      {name: 'Page C', uv: 2000, pv: 9800, amt: 2290},
      {name: 'Page D', uv: 2780, pv: 3908, amt: 2000},
      {name: 'Page E', uv: 1890, pv: 4800, amt: 2181},
      {name: 'Page F', uv: 2390, pv: 3800, amt: 2500},
      { uv: 3490, pv: 4300, amt: 2100},
];

ReactDOM.render(
	<Crypttoad marketInfo={marketInfo} markets={markets} selectedMarkets={selectedMarkets} data={data}/>
	,
	document.getElementById('app')
);