import {
	decompressFromEncodedURIComponent,
	compressToEncodedURIComponent,
} from 'lz-string';

// TODO: Error handling
const parseQuery = (
	input: string,
): {
	error: boolean;
	query: string;
	variables: string;
	operationName: string;
	hash: string;
} => {
	const match = input.match(/\-\-data\-(binary|raw) \$?'(\{[\s\S]+\})'/);

	if (!match || !match[2])
		return {
			error: true,
			query: '',
			variables: '',
			operationName: '',
			hash: '',
		};

	const jsonQuery = match[2];

	const parsed = JSON.parse(jsonQuery);
	const variables = JSON.stringify(parsed.variables, null, 2);
	const query = parsed.query.replace(/\\n/g, '\n');
	const hash = encodeHash({ query, variables });

	return {
		...parsed,
		query,
		hash,
		variables,
	};
};

const encodeHash = ({
	query,
	variables,
}: {
	query: string;
	variables: string;
}): string =>
	`#vars=${compressToEncodedURIComponent(
		variables,
	)}query=${compressToEncodedURIComponent(query)}`;

const decodeHash = (hash: string): { query: string; variables: string } => {
	const hashQuery = hash.match(/query=([\S]+)$/)?.[1];
	const query =
		(hashQuery && decompressFromEncodedURIComponent(hashQuery)) || '';

	const hashVariables = hash.match(/vars=([\S]+)query=/)?.[1];
	const variables =
		(hashVariables && decompressFromEncodedURIComponent(hashVariables)) || '';

	return { query, variables };
};

const pushHash = (hash: string) =>
	window.history.replaceState(undefined, '', hash);

export { parseQuery, encodeHash, decodeHash, pushHash };
