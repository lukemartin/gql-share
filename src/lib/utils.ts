import lzString from 'lz-string';
const { decompressFromEncodedURIComponent, compressToEncodedURIComponent } = lzString;

const parseQuery = (
	input: string
): {
	error: boolean;
	message: string;
	query: string;
	variables: string;
	operationName: string;
	queryString: string;
} => {
	let jsonQuery;

	if (input.trim().startsWith('{')) {
		jsonQuery = input;
	} else {
		const match = input.match(/--data-(binary|raw) \$?'(\{[\s\S]+\})'/);
		if (match && match[2]) {
			jsonQuery = match[2];
		}
	}

	if (!jsonQuery) {
		return {
			error: true,
			message: 'Input is not in a recognized format. Expected JSON or cURL text.',
			query: '',
			variables: '',
			operationName: '',
			queryString: ''
		};
	}

	const cleanedQuery = jsonQuery.replace(/\\\\"/g, '"');

	try {
		const parsed = JSON.parse(cleanedQuery);

		if (typeof parsed.query !== 'string' || typeof parsed.variables !== 'object') {
			throw new Error('Parsed JSON does not contain valid "query" or "variables" properties.');
		}

		const variables = JSON.stringify(parsed.variables, null, 2);
		const query = parsed.query.replace(/\\n/g, '\n');
		const queryString = getQueryString({ query, variables });

		return {
			...parsed,
			error: false,
			message: '',
			query,
			variables,
			queryString
		};
	} catch (e) {
		return {
			error: true,
			message: `Error parsing input: ${e.message}`,
			query: '',
			variables: '',
			operationName: '',
			queryString: ''
		};
	}
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
