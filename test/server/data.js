import {expect} from 'chai';
import Bittrex from 'bittrex-wrapper';
import {List, Map, Repeat} from 'immutable';
import chai from 'chai';
import chaiImmutable from 'chai-immutable';
import {addPriceData, MAX_SIZE} from '../../src/server/data';

chai.use(chaiImmutable);

describe('24 hour data for a coin', () => {
	it('if less than max_size just add', () => {
		const data = List.of(1, 2, 3);
		const updatedData = addPriceData(data, 4);
		expect(updatedData).to.equal(List.of(1, 2, 3, 4));
	});

	it('if size = max_size, push to front and pop latest value', () => {
		const data = Repeat(1, MAX_SIZE).toList();
		const updatedData = addPriceData(data, 25);
		expect(updatedData).to.equal(Repeat(1, MAX_SIZE - 1).toList().insert(0, 25));

	});

	it('if size > max_size, trims to max_size', () => {
		const data = Repeat(1, MAX_SIZE + 100).toList();
		const updatedData = addPriceData(data, 25);
		expect(updatedData).to.equal(Repeat(1, MAX_SIZE - 1).toList().insert(0, 25));
	});
});