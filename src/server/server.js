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
	if (dataPoint) {
		formattedStats[stat] = dataPoint;
		formattedStats.validData = true;
	}
	return formattedStats;
}

const stats = List.of('high', 'low', 'percentChange')
const newStats = List.of('high', 'low', 'percentChange')

function validateAndFormatData(market) {
	let formattedStats = {};
	formattedStats.validData = false;
	if (market) {
		stats.map(stat => validateDataPoint(stat, market, formattedStats));
	}
	return formattedStats;
}

function processMarkets(currencies) {
	console.log('processing markets');
	if (currencies) {
		let autoselectCurrencies = [];
		for (let i = 0; i < currencies.length; i++) {
			let currency = currencies[i];
			if (currency && (currency.quoteCurrencySymbol === 'BTC' || currency.symbol === 'BTC-USDT')) {
				autoselectCurrencies.push({
					marketCurrency: currency.baseCurrencySymbol,
					baseCurrency: currency.quoteCurrencySymbol,
					marketCurrencyLong: currency.baseCurrencySymbol,
					baseCurrencyLong: currency.quoteCurrencySymbol,
					marketName: currency.symbol
				});
			}
		}
		autoselectCurrencies.sort(function(a,b) {
    		var x = a.marketCurrency.toLowerCase();
   			 var y = b.marketCurrency.toLowerCase();
    		return x < y ? -1 : x > y ? 1 : 0;
		});
		store.dispatch({
			type: 'UPDATE_MARKET_LIST',
			markets: autoselectCurrencies
		});
	} else {
		console.log("currencies not found");
	}
	console.log('processed markets');
}

function processData(markets) {
	if (markets) {
		var newData = {};
		for (let i = 0; i < markets.length; i++) {
			let market = markets[i];
			if (market && market.symbol) {
				let formattedBaseCurrency = market.symbol.substr(market.symbol.indexOf("-") + 1);
				let formattedMarketName = market.symbol.substr(0, market.symbol.indexOf("-"));
				if (formattedBaseCurrency === 'BTC' || market.symbol === 'BTC-USDT') {
					let formattedStats = validateAndFormatData(market);
					if (formattedStats.validData) {
						let currencyData = {};
						let graphDomain = {};
						graphDomain.Low = market.low;
						graphDomain.High = market.high;
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

function processTickerData(tickers) {
    console.log("processing ticker data")
    if (tickers) {
        var newData = {};
        for (let i = 0; i < tickers.length; i++) {
            let ticker = tickers[i];
            let formattedBaseCurrency = ticker.symbol.substr(ticker.symbol.indexOf("-") + 1);
            let formattedMarketName = ticker.symbol.substr(0, ticker.symbol.indexOf("-"));
            if (formattedBaseCurrency === 'BTC' || ticker.symbol === 'BTC-USDT') {
                let tickerData = {}
                tickerData.bidRate = ticker.bidRate
                tickerData.askRate = ticker.askRate
                tickerData.lastTradeRate = ticker.lastTradeRate
                newData[formattedMarketName] = tickerData;
            }
        }
        newData = fromJS(newData);
        store.dispatch({
            type: 'UPDATE_MARKET_TICKER_DATA',
            marketData: newData
        });
        console.log("processed ticker data")
    }
}

function getBittrexAPI(apiEndpoint, processFunction) {
	https.get('https://api.bittrex.com/v3/' + apiEndpoint, (resp) => {
		let data = '';
		resp.on('data', (chunk) => {
			data += chunk;
		});
		resp.on('end', () => {
			try {
		 		const info = JSON.parse(data);
		 		return processFunction(info);
		 	} catch(e) {
		 		return null;
		 	}
		});
	}).on("error", (err) => {
  		console.log("Error: " + err.message);
  		return null;
	});
}


function updateMarkets() {
	getBittrexAPI('markets', processMarkets)
}

function updateMarketData() {
	getBittrexAPI('markets/summaries', processData);
}
function updateMarketTickerData() {
	getBittrexAPI('markets/tickers', processTickerData)
}

function updateMarketGraph() {
	store.dispatch({
		type: 'UPDATE_MARKET_GRAPH',
	});
}

updateMarkets();
updateMarketData();
updateMarketTickerData()
var marketsJob = schedule.scheduleJob('30 */4 * * * ', updateMarkets);
var marketStatsJob = schedule.scheduleJob('*/15 * * * * *', updateMarketData);
var marketTickerJob = schedule.scheduleJob('*/15 * * * * *', updateMarketTickerData);
var marketGraphJob = schedule.scheduleJob('10 */15 * * * *', updateMarketGraph);

socketServer.on('connection', (socket) => {
	socket.emit('state', store.getState().toJS())
});

store.subscribe(
    () => socketServer.emit('state', store.getState().toJS())
);
