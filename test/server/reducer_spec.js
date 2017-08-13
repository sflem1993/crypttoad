import {Map, fromJS} from 'immutable';
import {expect} from 'chai';

import reducer from '../../src/server/reducer';

describe('reducer', () => {
	it('handles UPDATE_MARKETS', () => {
		const state = Map();
		const action = {
			type:'UPDATE_MARKETS',
			newCurrencyData: {
				'BTC-FUT': 12
			}
		};
		const nextState = reducer(state, action);
		expect(nextState).to.equal(fromJS({
			'BTC-FUT': {
				'price_list': [12]
			}
		}));
	});
});