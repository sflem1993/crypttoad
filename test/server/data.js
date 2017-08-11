import {expect} from 'chai';
import Bittrex from 'bittrex-wrapper';
import {List, Map, Repeat} from 'immutable';
import chai from 'chai';
import chaiImmutable from 'chai-immutable';
import {addPriceData, MAX_SIZE} from '../../src/server/data';

chai.use(chaiImmutable);

describe('addPriceData', () => {
	it('if less than max_size just add', () => {
		const data = Map({
			a: Map({'price_list': List.of(1, 2, 3)})
		});
		const updatedData = addPriceData(data, 'a', 4);
		expect(updatedData).to.equal(Map({
			a: Map({'price_list': List.of(1, 2, 3, 4)})
		}));
	});

	it('handles null new data', () => {
		const data = Map({
			a: Map({'price_list': List.of(1, 2, 3)})
		});
		const updatedData = addPriceData(data, 'a', Map({a: 4}).get('b'));
		expect(updatedData).to.equal(Map({
			a: Map({'price_list': List.of(1, 2, 3, -1)})
		}));
	});

	it('if size = max_size, push to end and get rid of oldest value (at 0 index)', () => {
		const data = Map({
			a: Map({'price_list': Repeat(1, MAX_SIZE).toList()})
		});
		const updatedData = addPriceData(data, 'a', 25);
		expect(updatedData).to.equal(Map({
			a: Map({'price_list': Repeat(1, MAX_SIZE - 1).toList().insert(MAX_SIZE - 1, 25)})
		}));
	});

	it('if size > max_size, trims to max_size', () => {
		const data = Map({
			a: Map({'price_list': Repeat(1, MAX_SIZE + 100).toList()})
		});
		const updatedData = addPriceData(data, 'a', 25);
		expect(updatedData).to.equal(Map({
			a: Map({'price_list': Repeat(1, MAX_SIZE - 1).toList().insert(MAX_SIZE - 1, 25)})
		}));
	});

	it('handles null market', () => {
		const data = Map({
			a: Map({'price_list': List.of(1, 2, 3)})
		});
		const updatedData = addPriceData(data, 'b', 25);
		expect(updatedData).to.equal(Map({
			a: Map({'price_list': List.of(1, 2, 3)}),
			b: Map({'price_list': List.of(25)})
		}));
	});

	it('handles null DATA_POINTS', () => {
		const data = Map({
			a: Map({'soemthing_else': List.of(1, 2, 3)})
		});
		const updatedData = addPriceData(data, 'a', 25);
		expect(updatedData).to.equal(Map({
			a: Map({
				'soemthing_else': List.of(1, 2, 3),
				'price_list': List.of(25)
			})
		}));
	});
});