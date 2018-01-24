import makeStore from './store';
import {List, fromJS} from 'immutable';
import express from 'express';
import http from 'http';
import io from 'socket.io';
import schedule from 'node-schedule';
import {updateMarketList, getMarketData} from './data';
import https from 'https';
import path from 'path';
import fs from 'fs';

const privateKey = fs.readFileSync('/etc/letsencrypt/live/crypttoad.com/privkey.pem');
const certificate = fs.readFileSync('/etc/letsencrypt/live/crypttoad.com/fullchain.pem');

const credential = {key: privateKey, cert: certificate};

export const store = makeStore();
const app = express();
const server = https.createServer(credential, app);
const socketServer = io(server);

server.listen(8090);

app.get('/', (req, res) => {
 	res.sendFile(path.resolve(__dirname + '/../../dist/index.html'));
});

app.use('/dist', express.static(path.resolve(__dirname + '/../../dist')));

const server2 = app.listen(9000, () => {
	let port = server2.address().port;
});
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
	if (market) {
		stats.map(stat => validateDataPoint(stat, market, formattedStats));
	}
	return formattedStats;
}

function processMarkets(currencies) {
	if (currencies) {
		let autoselectCurrencies = [];
		for (let i = 0; i < currencies.length; i++) {
			let currency = currencies[i];
			if (currency && currency.MarketCurrencyLong && (currency.BaseCurrency === 'BTC' || currency.MarketName === 'USDT-BTC')) {
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

function processData(markets) {
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
						currencyData.PriceList = [];
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

function getBittrexAPI(apiEndpoint, processFunction) {
	https.get('https://bittrex.com/api/v1.1/' + apiEndpoint, (resp) => {
		let data = '';
		resp.on('data', (chunk) => {
			data += chunk;
		});
		resp.on('end', () => {
			try {
		 		const markets = JSON.parse(data).result;
		 		return processFunction(markets);
		 	} catch(e) {
		 		console.log("Error: " + data);
		 		return null;
		 	}
		});
	}).on("error", (err) => {
  		console.log("Error: " + err.message);
  		return null;
	});
}


function updateMarkets() {
	getBittrexAPI('public/getmarkets', processMarkets)
}

function updateMarketData() {
	getBittrexAPI('public/getmarketsummaries', processData);
}

function updateMarketGraph() {
	store.dispatch({
		type: 'UPDATE_MARKET_GRAPH',
	});
}

updateMarkets();
updateMarketData();
var marketsJob = schedule.scheduleJob('30 */4 * * * ', updateMarkets);
var marketStatsJob = schedule.scheduleJob('*/15 * * * * *', updateMarketData);
var marketGraphJob = schedule.scheduleJob('10 */15 * * * *', updateMarketGraph);

socketServer.on('connection', (socket) => {
	socket.emit('state', store.getState().toJS())
});

store.subscribe(
    () => socketServer.emit('state', store.getState().toJS())
);