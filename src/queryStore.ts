import { create } from 'zustand';
import { parseQuery, pushHash, decodeHash } from './utils';

type QueryStore = {
	input: string;
	outputQuery: string;
	outputVars: string;
	hash: string;
	isQueryValid: boolean;
	setInput: (input: string) => void;
};

const calculateState = (input: string) => {
	if (!input) {
		return {
			outputQuery: '',
			outputVars: '',
			hash: '',
			isQueryValid: true,
		};
	}
	const { query, variables, hash, error } = parseQuery(input);

	// TODO: This probably shouldn't be here
	if (hash) pushHash(hash);

	return {
		input,
		outputQuery: query,
		outputVars: variables,
		hash,
		isQueryValid: !error,
	};
};

export const useQueryStore = create<QueryStore>((set) => ({
	input: '',
	outputQuery: decodeHash(window.location.hash).query || '',
	outputVars: decodeHash(window.location.hash).variables || '',
	hash: '',
	isQueryValid: false,
	setInput: (input) => set((_) => calculateState(input)),
}));
