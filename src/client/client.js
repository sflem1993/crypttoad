import io from 'socket.io-client';
import {getBittrexInfo} from './../server/data';

import {Map} from 'immutable';

const socket = io(`${location.protocol}//${location.hostname}:8090`);