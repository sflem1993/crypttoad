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

//updateMarketList();
console.log("MEOW");
console.log("A");
console.log("B");
store.dispatch({
	type: 'UPDATE_MARKET_LISTz',
	markets: [{currency: 'namezz'}, {currency: 'namezzzzzz'}]
});

socketServer.on('connection', (socket) => {
	socket.emit('state', store.getState().toJS())
});

store.subscribe(
    () => io.emit('state', store.getState().toJS())
);

console.log("state : " + store.getState());
//io.emit('state', store.getState().toJS());