import makeStore from './store';
import {List, fromJS} from 'immutable';
import express from 'express';
import http from 'http';
import io from 'socket.io';
import schedule from 'node-schedule';
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
});

function updateMarkets() {
	updateMarketList().then((response) => {
		if (response) {
			const currencies = response.result;
			if (currencies) {
				let autoselectCurrencies = [];
				for (let i = 0; i < currencies.length; i++) {
					let currency = currencies[i];
					if (currency && currency.BaseCurrency === 'BTC' || currency.MarketName === 'USDT-BTC') {
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
			}
		}
	}).catch((error) => {
  		// market list won't change much, so just skip this update on error
	});
}

function validateDataPoint(stat, market, formattedStats) {
	let dataPoint = market[stat];
	if (dataPoint && dataPoint > 0) {
		formattedStats[stat] = dataPoint;
	} else {
		return formattedStats;
	}

	formattedStats.validData = true;
	return formattedStats;
}

const stats = List.of('Last', 'PrevDay', 'Bid', 'Ask', 'High', 'Low');

function validateAndFormatData(market) {
	let formattedStats = {};
	formattedStats.validData = false;
	formattedStats.PriceList=[{}];

	if (market) {
		stats.map(stat => validateDataPoint(stat, market, formattedStats));
	}
	return formattedStats;
}

function updateMarketData() {
	getMarketData().then((response) => {
		if (response) {
			const markets = response.result;
			if (markets) {
				var newData = {};
				for (let i = 0; i < markets.length; i++) {
					let market = markets[i];
					if (market && market.MarketName) {
						let formattedMarketName = market.MarketName.substr(market.MarketName.indexOf("-") + 1);
						let formattedBaseCurrency = market.MarketName.substr(0, market.MarketName.indexOf("-"));
						if (formattedBaseCurrency === 'BTC' || market.MarketName === 'USDT-BTC') {
							let formattedStats = validateAndFormatData(market);
							if (formattedStats.validData) {
								let currencyData = {};
								let graphDomain = {};
								graphDomain.Low = market.Low;
								graphDomain.High = market.High;
								currencyData.PriceList = [{}];
								currencyData.stats = formattedStats;
								currencyData.graphDomain = graphDomain;
								newData[formattedMarketName] = currencyData;
							}
						}
					}
				}
				newData = fromJS(newData);
				store.dispatch({
					type: 'UPDATE_MARKET_DATA',
					marketData: newData
				});
			}
		}
	}).catch((error) => {
  		//this updates every 15 seconds, just skip on error
	});
}

function updateMarketGraph() {
	// getMarketData().then((response) => {
	// 	const markets = response.result;
	// 	var newData = {};
	// 	for (let i = 0; i < markets.length; i++) {
	// 		let market = markets[i];
	// 		var formattedMarketName = market.MarketName.substr(market.MarketName.indexOf("-") + 1);
	// 		var formattedBaseCurrency = market.MarketName.substr(0, market.MarketName.indexOf("-"));
	// 		if (formattedBaseCurrency === 'BTC' || market.MarketName === 'USDT-BTC') {
	// 			var currencyData = {};
	// 			var formattedStats = {};
	// 			currencyData.Last = market.Last;
	// 			formattedStats.Low = market.Low;
	// 			formattedStats.High = market.High;
	// 			currencyData.graphDomain = formattedStats;
	// 			newData[formattedMarketName] = currencyData;
	// 		}
	// 	}
	// 	newData = fromJS(newData);
	store.dispatch({
		type: 'UPDATE_MARKET_GRAPH',
	});
}

updateMarkets();
updateMarketData();
var marketsJob = schedule.scheduleJob('0 0 * * * ', updateMarkets);
var marketStatsJob = schedule.scheduleJob('*/3 * * * * *', updateMarketData);
var marketGraphJob = schedule.scheduleJob('*/4 * * * * *', updateMarketGraph);

socketServer.on('connection', (socket) => {
	socket.emit('state', store.getState().toJS())
});

store.subscribe(
    () => socketServer.emit('state', store.getState().toJS())
);