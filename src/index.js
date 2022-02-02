module.exports = function isResize(value) {
	if (typeof value !== 'string') {
		throw new Error('Supplied value must be a string.');
	}

	const regexes = [
		// audio size
		/^(\d+)s(?:@([a-z0-9-]+))?(?<!-)$/g,
		// responsive print size
		/^(\d+)-(\d+)x(\d+)-(\d+)mm(?:@([a-z0-9-]+))?(?<!-)$/g,
		// print size
		/^(\d+)x(\d+)mm(?:@([a-z0-9-]+))?(?<!-)$/g,
		// responsive size
		/^(\d+)-(\d+)x(\d+)-(\d+)(?:@([a-z0-9-]+))?(?<!-)$/g,
		// regular size
		/^(\d+)x(\d+)(?:@([a-z0-9-]+))?(?<!-)$/g
	];

	let matches = [];

	for (const regex of regexes) {
		matches = matches.concat(value.match(regex) || []);
	}

	return matches.length > 0;
};
