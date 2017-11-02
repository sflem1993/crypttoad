import io from 'socket.io-client';
import React from 'react';
import ReactDOM from  'react-dom';
import {List, fromJS} from 'immutable';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import reducer from './reducer';
import {setState} from './action_creators';
import Crypttoad from './components/Crypttoad';

require('./style.css');
require('./react-select.css')

const store = createStore(reducer);


const socket = io(`${location.protocol}//${location.hostname}:8090`);

console.log("TEST!!");
socket.on('state', state =>
      store.dispatch(setState(state))
);




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
const selectedMarkets = List.of('ETH', 'NEO');
const data = [
      {uv: 0.00000904},
      {uv: 0.00000899},
      {uv: 0.00000903},
      {uv: 0.00000906},
      {uv: 0.00000909},
      {uv: 0.00000915},
      {uv: 0.00000945},
      {uv: 0.00000914},
      {uv: 0.00000919},
      {uv: 0.00000957},
      {uv: 0.00000910},
      {uv: 0.00000918},
      {uv: 0.00000919},
      {uv: 0.00000919},
      {uv: 0.00000919},
      {uv: 0.00000919},
      {uv: 0.00000919},
      {uv: 0.00000919},
      {uv: 0.00000919},
      {uv: 0.00000919},
      {uv: 0.00000919},
      {uv: 0.00000919},
      {uv: 0.00000832},
      {uv: 0.00000919},
      {uv: 0.00000919},

];

ReactDOM.render(
      <Provider store={store}>
	     <Crypttoad marketInfo={marketInfo} selectedMarkets={selectedMarkets} data={data}/>
      </Provider>
	,
	document.getElementById('app')
);
