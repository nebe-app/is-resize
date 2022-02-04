const isResize = require('../src/index');

test('it should be a valid resize', () => {
	expect(isResize('300x300')).toBe(true);
});

test('it should be an invalid resize', () => {
	expect(isResize('cic')).toBe(false);
});

test('it should be a valid audio resize', () => {
	expect(isResize('20s', 'audio')).toBe(true);
});

test('it should be an invalid audio resize', () => {
	expect(isResize('300x300', 'audio')).toBe(false);

	expect(isResize('cic', 'audio')).toBe(false);
});

test('it should be a valid print resize', () => {
	expect(isResize('210x297mm', 'print')).toBe(true);
});

test('it should be an invalid print resize', () => {
	expect(isResize('300x300', 'print')).toBe(false);

	expect(isResize('cic', 'print')).toBe(false);
});

test('it should be a valid html, image, video or fallback resize', () => {
	['html', 'image', 'video', 'fallback'].forEach((outputCategory) => {
		expect(isResize('300x300', outputCategory)).toBe(true);
	});
});

test('it should be an invalid html, image, video or fallback resize', () => {
	expect(isResize('210z297mm', 'html')).toBe(false);

	expect(isResize('20s', 'video')).toBe(false);
});

test('it should throw an error if value is not a string', () => {
	expect(() => isResize({})).toThrowError(new Error('Supplied value must be a string.'));

	expect(() => isResize(() => console.log('cic')))
		.toThrowError(new Error('Supplied value must be a string.'));

	expect(() => isResize(undefined)).toThrowError(new Error('Supplied value must be a string.'));

	expect(() => isResize(NaN)).toThrowError(new Error('Supplied value must be a string.'));
});

test('it should throw an error if outputCategory is not a string', () => {
	expect(() => isResize('300x300', {}))
		.toThrowError(new Error('Supplied outputCategory must be a string.'));

	expect(() => isResize('300x300', () => console.log('cic')))
		.toThrowError(new Error('Supplied outputCategory must be a string.'));
});

test('it should throw an error if outputCategory is not a valid outputCategory', () => {
	expect(() => isResize('300x300', 'cic'))
		.toThrowError(new Error('Supplied outputCategory must be a valid output category.'));
});