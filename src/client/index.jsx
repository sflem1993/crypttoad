import io from 'socket.io-client';
import React from 'react';
import ReactDOM from  'react-dom';
import {List, fromJS} from 'immutable';
import {Provider} from 'react-redux';
import {compose, applyMiddleware, createStore} from 'redux';
import reducer from './reducer';
import {setState, setSelectedMarkets} from './action_creators';
import Crypttoad from './components/Crypttoad';

require('./style.css');

const store = createStore(reducer);

const socket = io(`https://${location.hostname}:8090`);

socket.on('state', state => {
	store.dispatch(setState(state));
});

const selectedMarkets = List(['BTC']);

store.dispatch(setSelectedMarkets(selectedMarkets));

ReactDOM.render(
      <Provider store={store}>
	     <Crypttoad/>
      </Provider>
	,
	document.getElementById('app')
);