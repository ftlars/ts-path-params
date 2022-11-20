/* eslint-disable unicorn/no-array-reduce */
type Substring<S extends string, T extends string> = S extends `${string}${T}${string}` ? T : never;
type ExpressParameter<Parameter extends string> = `:${Parameter}`;

const expressParameterFormatter = (parameter: string): ExpressParameter<typeof parameter> => `:${parameter}`;

export type PathParameters<Path extends string, Keys extends string> = {
	[K in Keys]: ExpressParameter<K> extends Substring<Path, ExpressParameter<K>> ? string : never
};

export const setPathParameters = <Path extends string, Keys extends string>(
	path: Path,
	parameterReplacements: PathParameters<Path, Keys>,
): string => {
	const allReplaced = Object.keys(parameterReplacements).reduce((previous, current) => {
		const replacement = (parameterReplacements as Record<string, string>)[current];
		if (replacement) {
			return replaceAll(previous, expressParameterFormatter(current), replacement);
		}

		return current;
	}, path);
	return allReplaced;
};

const escapeRegExp = (stringToEscape: string) => stringToEscape.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

const replaceAll = (stringToHandle: string, whatToReplace: string, replacement: string) => stringToHandle.replace(new RegExp(escapeRegExp(whatToReplace), 'g'), replacement);

