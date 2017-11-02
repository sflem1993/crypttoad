import {Map, fromJS} from 'immutable';
import {expect} from 'chai';

import reducer from '../../src/server/reducer';
import {updateMarketList} from '../../src/server/data';

describe('reducer', () => {

	it('handles SET_ENTRIES', () => {
		const initialState = Map();
		var markets = updateMarketList();
		const action = {
			type:'UPDATE_MARKET_LIST',
			markets: [{currency: 'name'}]
		};
		const nextState = reducer(initialState, action);
		expect(nextState).to.equal(fromJS({
			markets: [{currency: 'name'}]
		}));
	})
});