/* eslint-disable import/extensions */
/* eslint-disable import/no-extraneous-dependencies */
import {describe, expect, test} from '@jest/globals';
import {setPathParameters, type PathParameters} from '../src/index';

describe(setPathParameters.name, () => {
	describe('replacing', () => {
		test('replace parameter at the end', () => {
			const apiPath = '/path/:id' as const;
			const replacements: PathParameters<typeof apiPath, 'id'> = {
				id: '1',
			};
			const expectedResult = '/path/1';
			expect(setPathParameters(apiPath, replacements)).toBe(expectedResult);
		});
		test('replace parameter in the middle', () => {
			const apiPath = '/:id/path' as const;
			const replacements: PathParameters<typeof apiPath, 'id'> = {
				id: '1',
			};
			const expectedResult = '/1/path';
			expect(setPathParameters(apiPath, replacements)).toBe(expectedResult);
		});

		test('replace two parameters', () => {
			const apiPath = '/:id/:name' as const;
			const replacements: PathParameters<typeof apiPath, 'id' | 'name'> = {
				id: '1',
				name: 'lars',
			};
			const expectedResult = '/1/lars';
			expect(setPathParameters(apiPath, replacements)).toBe(expectedResult);
		});

		test('replace multiple instances of one parameter', () => {
			const apiPath = '/:id/:name/:id' as const;
			const replacements: PathParameters<typeof apiPath, 'id' | 'name'> = {
				id: '1',
				name: 'lars',
			};
			const expectedResult = '/1/lars/1';
			expect(setPathParameters(apiPath, replacements)).toBe(expectedResult);
		});

		describe('Cases from express documentation', () => {
			test('Separated by hyphen', () => {
				const apiPath = '/flights/:from-:to';
				const replacements: PathParameters<typeof apiPath, 'from' | 'to'> = {from: 'LAX', to: 'SFO'};
				const expectedResult = '/flights/LAX-SFO';

				expect(setPathParameters(apiPath, replacements)).toBe(expectedResult);
			});

			test('Separated by dot', () => {
				const apiPath = '/plantae/:genus.:species';
				const replacements: PathParameters<typeof apiPath, 'genus' | 'species'> = {genus: 'Prunus', species: 'persica'};
				const expectedResult = '/plantae/Prunus.persica';

				expect(setPathParameters(apiPath, replacements)).toBe(expectedResult);
			});

			test('With regexp', () => {
				const apiPath = '/user/:userId(\\d+)';
				const replacements: PathParameters<typeof apiPath, 'userId'> = {userId: '42'};
				const expectedResult = '/user/42(\\d+)';

				expect(setPathParameters(apiPath, replacements)).toBe(expectedResult);
			});
		});
	});
});

