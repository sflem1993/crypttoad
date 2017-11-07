import io from 'socket.io-client';
import React from 'react';
import ReactDOM from  'react-dom';
import {List, fromJS} from 'immutable';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import reducer from './reducer';
import {setState, setSelectedMarkets} from './action_creators';
import Crypttoad from './components/Crypttoad';

require('./style.css');
require('./react-select.css')

const store = createStore(reducer);


const socket = io(`${location.protocol}//${location.hostname}:8090`);

socket.on('state', state => {
      console.log(state);
      store.dispatch(setState(state));
});
const selectedMarkets = List(['BTC']);

store.dispatch(setSelectedMarkets(selectedMarkets));
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
	     <Crypttoad data={data}/>
      </Provider>
	,
	document.getElementById('app')
);
