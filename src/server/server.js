import makeStore from './store';
import express from 'express';
import http from 'http';

import {updateMarketList} from './data';

export const store = makeStore();
const app = express();
const server = http.createServer(app);
const io = require('socket.io').listen(server)
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

updateMarketList();
console.log("MEOW");

io.on('connection', (socket) => {
	socket.emit('state', store.getState().toJS());
});

store.dispatch({
	type: 'UPDATE_MARKETS'
});
//io.emit('state', store.getState().toJS());
