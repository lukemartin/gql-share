import {
	decompressFromEncodedURIComponent,
	compressToEncodedURIComponent,
} from 'lz-string';

const prettyJson = (object: any = {}): string =>
	JSON.stringify(object, null, 2);

const encodeHash = ({
	query,
	variables,
}: {
	query: string;
	variables: string;
}): string =>
	`#va=${compressToEncodedURIComponent(
		variables,
	)}qu=${compressToEncodedURIComponent(query)}}`;

const decodeHash = (hash: string): { query: string; variables: string } => {
	const hashQuery = hash.match(/qu=([\S]+)$/)?.[1];
	const query =
		(hashQuery && decompressFromEncodedURIComponent(hashQuery)) || '';

	const hashVariables = hash.match(/va=([\S]+)qu=/)?.[1];
	const variables =
		(hashVariables && decompressFromEncodedURIComponent(hashVariables)) || '';

	return { query, variables };
};

const pushHash = (hash): void =>
	window.history.replaceState(undefined, undefined, hash);

export { prettyJson, encodeHash, decodeHash, pushHash };
