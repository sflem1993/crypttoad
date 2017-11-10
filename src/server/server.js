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
			if (currency.BaseCurrency === 'BTC' || currency.MarketName === 'USDT-BTC') {
				//FORMAT DECIMALS ON STATS
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
			var formattedMarketName = market.MarketName.substr(market.MarketName.indexOf("-") + 1);
			var formattedBaseCurrency = market.MarketName.substr(0, market.MarketName.indexOf("-"));
			if (formattedBaseCurrency === 'BTC' || market.MarketName === 'USDT-BTC') {
				var currencyData = {};
				var formattedStats = {};
				formattedStats.Last = market.Last;
				formattedStats.PrevDay = market.PrevDay;
				formattedStats.Bid = market.Bid;
				formattedStats.Ask = market.Ask;
				formattedStats.High = market.High;
				formattedStats.Low = market.Low;
				currencyData.PriceList = [];
				currencyData.stats = formattedStats;
				newData[formattedMarketName] = currencyData;
			}
		}
		newData = fromJS(newData);
		store.dispatch({
			type: 'UPDATE_MARKET_DATA',
			marketData: newData
		});
	});
}

updateMarkets();
setInterval(updateMarkets, 86400000);

updateMarketData();
setInterval(updateMarketData, 10000); //120000


socketServer.on('connection', (socket) => {
	socket.emit('state', store.getState().toJS())
});

store.subscribe(
    () => socketServer.emit('state', store.getState().toJS())
);