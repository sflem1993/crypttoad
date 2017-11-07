import makeStore from './store';
import {fromJS} from 'immutable';
import express from 'express';
import http from 'http';
import io from 'socket.io';
import {updateMarketList, updateMarketListPromise, getMarketData} from './data';

export const store = makeStore();
const app = express();
const server = http.createServer(app);
const socketServer = io(server);
var path = require('path');

server.listen(8090);

app.get('/', (req, res) => {
	//res.send("react apps");
 	res.sendFile(path.resolve(__dirname + '/../../dist/index.html'));
});

app.use('/dist', express.static(path.resolve(__dirname + '/../../dist')));

const server2 = app.listen(9000, () => {
  let port = server2.address().port;
  console.log(`Server running at http://localhost:${port}`);
});

console.log("MEOW");
console.log("A");
console.log("B");
var newmarkets = updateMarketList();
console.log("*****");
console.log(newmarkets);
console.log("*****");
store.dispatch({
	type: 'UPDATE_MARKET_LISTz',
	markets: newmarkets
});

// store.dispatch({
// 	type: 'UPDATE_SELECTED_MARKETS',
// 	markets: {'USDT-BTC': {a: 1}}
// });

setInterval(() => {
	updateMarketListPromise().then((response) => {
		const currencies = response.result;
		var autoselectCurrencies = [];

		for (let i = 0; i < currencies.length; i++) {
			let currency = currencies[i];
			if (currency && currency.BaseCurrency && currency.MarketCurrency && (currency.BaseCurrency === 'BTC' || currency.MarketCurrency === 'BTC' && currency.BaseCurrency === 'USDT')) {
				autoselectCurrencies.push({
					marketCurrency: currency.MarketCurrency,
					marketCurrencyLong: currency.MarketCurrencyLong,
					baseCurrency: currency.BaseCurrency,
					baseCurrencyLong: currency.BaseCurrencyLong,
					marketName: currency.MarketName
				});
			}
		}

		autoselectCurrencies.sort(function(a,b) {
    		var x = a.marketCurrencyLong.toLowerCase();
   			 var y = b.marketCurrencyLong.toLowerCase();
    		return x < y ? -1 : x > y ? 1 : 0;
		});
		store.dispatch({
			type: 'UPDATE_MARKET_LISTz',
			markets: autoselectCurrencies
		});

	});
}, 5000);
socketServer.on('connection', (socket) => {
	socket.emit('state', store.getState().toJS())
});

// setInterval(() => {
// 	store.dispatch({
// 		type: 'UPDATE_MARKET_DATA',
// 		marketData: getMarketData()
// 	});
// }, 20000);

store.subscribe(
    () => socketServer.emit('state', store.getState().toJS())
);

//socketServer.emit('state', store.getState().toJS());