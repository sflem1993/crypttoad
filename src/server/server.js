import makeStore from './store';
import {fromJS} from 'immutable';
import express from 'express';
import http from 'http';
import io from 'socket.io';
import {updateMarketList} from './data';

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

console.log("HELP");
const server2 = app.listen(9000, () => {
  let port = server2.address().port;
  console.log(`Server running at http://localhost:${port}`);
});

console.log("MEOW");
console.log("A");
console.log("B");
store.dispatch({
	type: 'UPDATE_MARKET_LISTz',
	markets: updateMarketList()
});

// store.dispatch({
// 	type: 'UPDATE_SELECTED_MARKETS',
// 	markets: {'USDT-BTC': {a: 1}}
// });

setInterval(() => {
	store.dispatch({
	type: 'UPDATE_MARKET_LISTz',
	markets: updateMarketList()
	});
}, 1000000);
socketServer.on('connection', (socket) => {
	socket.emit('state', store.getState().toJS())
});

store.subscribe(
    () => socketServer.emit('state', store.getState().toJS())
);

//socketServer.emit('state', store.getState().toJS());