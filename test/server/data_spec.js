import {expect} from 'chai';
import {List, Map, Repeat, fromJS} from 'immutable';
import chai from 'chai';
import chaiImmutable from 'chai-immutable';
import {addPriceData, updateCurrencyInfo, updateMin, updateMax, MAX_SIZE, DATA_POINTS, MARKET_STATS, makeGraph, getMarkets} from '../../src/server/data';

chai.use(chaiImmutable);

describe('addPriceData', () => {
	it('if less than max_size just add', () => {
		const data = fromJS({
			a: {[DATA_POINTS]: [1, 2, 3]}
		});
		const updatedData = addPriceData(data, 'a', 4);
		expect(updatedData).to.equal(fromJS({
			a: {[DATA_POINTS]: [1, 2, 3, 4]}
		}));
	});

	it('handles null new data', () => {
		const data = fromJS({
			a: {[DATA_POINTS]: [1, 2, 3]}
		});
		const updatedData = addPriceData(data, 'a', Map({a: 4}).get('b'));
		expect(updatedData).to.equal(fromJS({
			a: {[DATA_POINTS]: [1, 2, 3, -1]}
		}));
	});

	it('if size = max_size, push to end and get rid of oldest value (at 0 index)', () => {
		const data = Map({
			a: Map([[DATA_POINTS, Repeat(1, MAX_SIZE).toList()]])
		});
		const updatedData = addPriceData(data, 'a', 25);
		expect(updatedData).to.equal(Map({
			a: Map([[DATA_POINTS, Repeat(1, MAX_SIZE - 1).toList().push(25)]])
		}));
	});

	it('if size > max_size, trims to max_size', () => {
		const data = Map({
			a: Map([[DATA_POINTS, Repeat(1, MAX_SIZE + 100).toList()]])
		});
		const updatedData = addPriceData(data, 'a', 25);
		expect(updatedData).to.equal(Map({
			a: Map([[DATA_POINTS, Repeat(1, MAX_SIZE - 1).toList().push(25)]])
		}));
	});

	it('handles null market', () => {
		const data = fromJS({
			a: {[DATA_POINTS]: [1, 2, 3]}
		});
		const updatedData = addPriceData(data, 'b', 25);
		expect(updatedData).to.equal(fromJS({
			a: {[DATA_POINTS]: [1, 2, 3]},
			b: {[DATA_POINTS]: [25]}
		}));
	});

	it('handles null DATA_POINTS', () => {
		const data = fromJS({
			a: {'other_info': [1, 2, 3]}
		});
		const updatedData = addPriceData(data, 'a', 25);
		expect(updatedData).to.equal(fromJS({
			a: {
				'other_info': [1, 2, 3],
				[DATA_POINTS]: [25]
			}
		}));
	});
});

describe('updateMinMax', () => {
	it('min-yes', () => {
		const data = fromJS({
			a: {[DATA_POINTS]: [2, 3, 4], min: 2}
		});
		const updatedData = updateMin(data, 'a', 1);
		expect(updatedData).to.equal(fromJS({
			a: {[DATA_POINTS]: [2, 3, 4], min: 1}
		}));
	});

	it('min-no', () => {
		const data = fromJS({
			a: {[DATA_POINTS]: [2, 3, 4], min: 2}
		});
		const updatedData = updateMin(data, 'a', 4);
		expect(updatedData).to.equal(fromJS({
			a: {[DATA_POINTS]: [2, 3, 4], min: 2}
		}));
	});

	it('max-yes', () => {
		const data = fromJS({
			a: {[DATA_POINTS]: [2, 3, 4], max: 4}
		});
		const updatedData = updateMax(data, 'a', 9);
		expect(updatedData).to.equal(fromJS({
			a: {[DATA_POINTS]: [2, 3, 4], max: 9}
		}));
	});

	it('max-no', () => {
		const data = fromJS({
			a: {[DATA_POINTS]: [2, 3, 4], max: 4}
		});
		const updatedData = updateMax(data, 'a', 3);
		expect(updatedData).to.equal(fromJS({
			a: {[DATA_POINTS]: [2, 3, 4], max: 4}
		}));
	});
});

describe('updateCurrencyInfo', () => {
	it('sets data', () => {
		const data = fromJS({
			a: {[MARKET_STATS]: {a: 1, b: 2}}
		});
		const updatedData = updateCurrencyInfo(data, 'a', Map({a: 7}));
		expect(updatedData).to.equal(fromJS({
			a: {[MARKET_STATS]: {a: 7}}
		}));
	});

		it('converts non immutable object to immutable map', () => {
		const data = fromJS({
			a: {[MARKET_STATS]: {a: 1, b: 2}}
		});
		const updatedData = updateCurrencyInfo(data, 'a', {a: 7});
		expect(updatedData).to.equal(fromJS({
			a: {[MARKET_STATS]: {a: 7}}
		}));
	});

});

describe('making graph', () => {
	it('testy', () => {
		const data = fromJS({
			a: {[DATA_POINTS]: [1, 2, 3]},
		});
		const graphData = makeGraph(data, 'a');
		expect(graphData).to.equal(fromJS(
			[
				{name: 0, a: 1},
				{name: 1, a: 2},
				{name: 2, a: 3}
			]
		));
	});
});

describe('getting markets', () => {
	it('returns market names', () => {
		const data = fromJS({
			a: {[DATA_POINTS]: [1, 2, 3]},
			b: {[DATA_POINTS]: [1, 2, 3]},
			c: {[DATA_POINTS]: [1, 2, 3]}
		});
		const markets = getMarkets(data);
		expect(markets).to.equal(fromJS(
			['a', 'b', 'c']
		));
	});
});