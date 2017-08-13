import makeStore from './store';
import Server from 'socket.io';

export const store = makeStore();
const io = new Server().attach(8090);

io.on('connection', (socket) => {
	socket.emit('state', store.getState().toJS());
});

store.dispatch({
	type: 'UPDATE_MARKETS'
});
io.emit('state', store.getState().toJS());