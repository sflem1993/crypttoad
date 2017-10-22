import makeStore from './store';
import Server from 'socket.io';
import express from 'express';

export const store = makeStore();
const io = new Server().attach(8090);
const app = express();
var path = require('path');

app.get('/', (req, res) => {
	res.send("react apps");
// res.sendFile(__dirname + '/dist/index.html');
});

app.use('/static', express.static(path.resolve(__dirname + '/../../dist')));


const server = app.listen(9000, () => {
  let port = server.address().port;
  console.log(`Server running at http://localhost:${port}`);
});


io.on('connection', (socket) => {
	socket.emit('state', store.getState().toJS());
});

store.dispatch({
	type: 'UPDATE_MARKETS'
});
io.emit('state', store.getState().toJS());
