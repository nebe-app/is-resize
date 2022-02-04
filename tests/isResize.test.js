const isResize = require('../src/index');

test('it should be a valid resize', () => {
	expect(isResize('300x300')).toBe(true);
});

test('it should not be a valid resize', () => {
	expect(isResize('cic')).toBe(false);
});

test('it should throw an error if anything other than a string is sent as a', () => {
	expect(() => isResize({})).toThrowError(new Error('Supplied value must be a string.'));

	expect(() => isResize(() => console.log('cic'))).toThrowError(new Error('Supplied value must be a string.'));

	expect(() => isResize(undefined)).toThrowError(new Error('Supplied value must be a string.'));

	expect(() => isResize(NaN)).toThrowError(new Error('Supplied value must be a string.'));
});