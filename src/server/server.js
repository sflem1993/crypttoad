import makeStore from './store';
import {fromJS} from 'immutable';
import express from 'express';
import http from 'http';
import io from 'socket.io';
import {updateMarketList, getMarketData} from './data';

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

function updateMarkets() {
	updateMarketList().then((response) => {
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
			type: 'UPDATE_MARKET_LIST',
			markets: autoselectCurrencies
		});

	});
}

function updateMarketData() {
	getMarketData().then((response) => {
		const markets = response.result;
		var newData = {};
		for (let i = 0; i < markets.length; i++) {
			let market = markets[i];
			//state update marketname -> last
			var currencyData = {};
			currencyData.Last = market.Last;
			currencyData.PrevDay = market.PrevDay;
			currencyData.Bid = market.Bid;
			currencyData.Ask = market.Ask;
			currencyData.High = market.High;
			currencyData.Low = market.Low;

			var formattedMarketName = market.MarketName.substr(market.MarketName.indexOf("-") + 1);
			newData[formattedMarketName] = currencyData;
		}
		console.log("dataz");
		store.dispatch({
			type: 'UPDATE_MARKET_DATA',
			marketData: newData
		});
	});
}


// setInterval(() => {
// 	store.dispatch({
// 		type: 'UPDATE_MARKET_DATA',
// 		marketData: getMarketData()
// 	});
// }, 20000);


updateMarkets();
setInterval(updateMarkets, 86400000);
socketServer.on('connection', (socket) => {
	socket.emit('state', store.getState().toJS())
});

updateMarketData();

store.subscribe(
    () => socketServer.emit('state', store.getState().toJS())
);



socketServer.emit('state', store.getState().toJS());