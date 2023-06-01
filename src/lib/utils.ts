import lzString from 'lz-string';
const { decompressFromEncodedURIComponent, compressToEncodedURIComponent } = lzString;

const parseQuery = (
	input: string
): {
	error: boolean;
	query: string;
	variables: string;
	operationName: string;
	queryString: string;
} => {
	const match = input.match(/--data-(binary|raw) \$?'(\{[\s\S]+\})'/);

	if (!match || !match[2])
		return {
			error: true,
			query: '',
			variables: '',
			operationName: '',
			queryString: ''
		};

	const jsonQuery = match[2];

	const cleanedQuery = jsonQuery.replace(/\\\\"/g, '\\"');

	const parsed = JSON.parse(cleanedQuery);
	const variables = JSON.stringify(parsed.variables, null, 2);
	const query = parsed.query.replace(/\\n/g, '\n');
	const queryString = getQueryString({ query, variables });

	return {
		...parsed,
		error: false,
		query,
		variables,
		queryString
	};
};

const getQueryString = ({ query, variables }: { query: string; variables: string }): string =>
	`?vars=${compressToEncodedURIComponent(variables)}&query=${compressToEncodedURIComponent(query)}`;

const parseQueryString = ({ encodedQuery, encodedVariables }: { encodedQuery: string; encodedVariables: string }) => ({
	query: decompressFromEncodedURIComponent(encodedQuery),
	variables: decompressFromEncodedURIComponent(encodedVariables)
});

const pushHash = (hash: string) => window.history.replaceState(undefined, '', hash);

/**
 * Previous version of gqlshare encoded the query & variables in a strange hash pattern in the URL
 * This runs on mount and converts it to a more sensible format
 * eg. gqlshare.dev/#vars=[v]query=[q] => gqlshare.dev/?query=[q]&vars=[v]
 */
const redirectHashToSearch = () => {
	const hash = window.location.hash;

	if (hash) {
		const hashQuery = hash.match(/query=([\S]+)$/)?.[1];
		const hashVariables = hash.match(/vars=([\S]+)query=/)?.[1];

		if (hashQuery && hashVariables) {
			const newUrl = `/?query=${hashQuery}&vars=${hashVariables}`;

			window.location.href = newUrl;
		}
	}
};

export { parseQuery, pushHash, parseQueryString, redirectHashToSearch };
