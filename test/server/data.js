import {expect} from 'chai';
import Bittrex from 'bittrex-wrapper';
import {List, Map, Repeat} from 'immutable';
import chai from 'chai';
import chaiImmutable from 'chai-immutable';
import {addPriceData, updateCurrencies, MAX_SIZE} from '../../src/server/data';

chai.use(chaiImmutable);

describe('24 hour data for a coin', () => {
	it('if less than max_size just add', () => {
		const data = List.of(1, 2, 3);
		const updatedData = addPriceData(data, 4);
		expect(updatedData).to.equal(List.of(1, 2, 3, 4));
	});

	it('handles null new data', () => {
		const data = List.of(1, 2, 3);
		const updatedData = addPriceData(data, Map({a: 4}).get('c'));
		expect(updatedData).to.equal(List.of(1, 2, 3, -1));
	});

	it('if size = max_size, push to end and get rid of oldest value (at 0 index)', () => {
		const data = Repeat(1, MAX_SIZE).toList();
		const updatedData = addPriceData(data, 25);
		expect(updatedData).to.equal(Repeat(1, MAX_SIZE - 1).toList().insert(MAX_SIZE - 1, 25));
	});

	it('if size > max_size, trims to max_size', () => {
		const data = Repeat(1, MAX_SIZE + 100).toList();
		const updatedData = addPriceData(data, 25);
		expect(updatedData).to.equal(Repeat(1, MAX_SIZE - 1).toList().insert(MAX_SIZE - 1, 25));
	});
});

describe('updating each currency', () => {
	it('updates each currency', () => {
		const data = Map({a: List.of(4), b: List.of(5)});
		const updatedData = updateCurrencies(data, Map({a: 6, b: 9}));
		expect(updatedData).to.equal(Map({a: List.of(4, 6), b: List.of(5, 9)}));
	});

	it('handles no new data', () => {
		const data = Map({a: List.of(4), b: List.of(5)});
		const updatedData = updateCurrencies(data, undefined);
		expect(updatedData).to.equal(Map({a: List.of(4, -1), b: List.of(5, -1)}));
	});

	it('handles no data for a currency', () => {
		const data = Map({a: List.of(4), b: List.of(5)});
		const updatedData = updateCurrencies(data, Map({a: 6}));
		expect(updatedData).to.equal(Map({a: List.of(4, 6), b: List.of(5, -1)}));
	});
});