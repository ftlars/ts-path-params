const config = {
	roots: ['<rootDir>/test/'],
	transform: {
		'^.+\\.(tsx|ts)?$': 'ts-jest',
	},
	testRegex: '(.*(\\.|/)(test|spec))\\.(tsx|ts)?$',
	moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
};

// eslint-disable-next-line unicorn/prefer-module
module.exports = config;
