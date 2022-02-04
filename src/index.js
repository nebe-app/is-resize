const outputCategories = ['html', 'image', 'print', 'video', 'audio', 'fallback'];
const audioRegex = [
	// audio size
	/^(\d+)s(?:@([a-z0-9-]+))?(?<!-)$/g,
];
const printRegex = [
	// responsive print size
	/^(\d+)-(\d+)x(\d+)-(\d+)mm(?:@([a-z0-9-]+))?(?<!-)$/g,
	// print size
	/^(\d+)x(\d+)mm(?:@([a-z0-9-]+))?(?<!-)$/g,
];
const sizeRegex = [
	// responsive size
	/^(\d+)-(\d+)x(\d+)-(\d+)(?:@([a-z0-9-]+))?(?<!-)$/g,
	// regular size
	/^(\d+)x(\d+)(?:@([a-z0-9-]+))?(?<!-)$/g
];

module.exports = function isResize(value, outputCategory = null) {
	if (typeof value !== 'string') {
		throw new Error('Supplied value must be a string.');
	}

	if (outputCategory && typeof outputCategory !== 'string') {
		throw new Error('Supplied outputCategory must be a string.');
	}

	if (outputCategory && !outputCategories.includes(outputCategory)) {
		throw new Error('Supplied outputCategory must be a valid output category.');
	}

	let regexes = [];

	switch (outputCategory) {
		case 'audio':
			regexes = audioRegex;
			break;
		case 'print':
			regexes = printRegex;
			break;
		case 'html':
		case 'image':
		case 'video':
		case 'fallback':
			regexes.push(...sizeRegex);
			break;
		case null:
		default:
			regexes.push(...audioRegex, ...printRegex, ...sizeRegex);
			break;
	}

	let matches = [];

	for (const regex of regexes) {
		matches = matches.concat(value.match(regex) || []);
	}

	return matches.length > 0;
};
