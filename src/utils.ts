import {
	decompressFromEncodedURIComponent,
	compressToEncodedURIComponent,
} from 'lz-string';

const SAMPLE_INPUT = `curl 'https://graphql.github.com/graphql/proxy' \
-H 'Connection: keep-alive' \
-H 'DNT: 1' \
-H 'User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.116 Safari/537.36' \
-H 'Content-Type: application/json' \
-H 'Accept: */*' \
-H 'Origin: https://graphql.github.com' \
-H 'Sec-Fetch-Site: same-origin' \
-H 'Sec-Fetch-Mode: cors' \
-H 'Sec-Fetch-Dest: empty' \
-H 'Accept-Language: en-GB,en-US;q=0.9,en;q=0.8' \
--data-binary $'{"query":"query GetRepository($name: String\u0021, $owner: String\u0021) {\\n  repository(name: $name, owner: $owner) {\\n    id\\n  }\\n}\\n","variables":{"name":"name","owner":"owner"},"operationName":"GetRepository"}' \
--compressed`;

// TODO: Error handling
const parseQuery = (
	input: string,
): {
	error: boolean;
	query: string;
	variables: { [index: string]: any };
	operationName: string;
} => {
	const match = input.match(/\-\-data\-binary \$?'(\{[\s\S]+\})'/);

	if (!match || !match[1])
		return {
			error: true,
			query: '',
			variables: {},
			operationName: '',
		};

	const jsonQuery = match[1];

	const parsed = JSON.parse(jsonQuery);

	return {
		...parsed,
		query: parsed.query.replace(/\\n/g, '\n'),
	};
};

const encodeHash = ({
	query,
	variables,
}: {
	query: string;
	variables: string;
}) =>
	`#vars=${compressToEncodedURIComponent(
		variables,
	)}query=${compressToEncodedURIComponent(query)}}`;

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
	window.history.replaceState(undefined, 'foo', hash);

export { SAMPLE_INPUT, parseQuery, encodeHash, decodeHash, pushHash };
