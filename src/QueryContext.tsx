import React, {
	createContext,
	useContext,
	useMemo,
	useState,
	ReactNode,
	useEffect,
} from 'react';
import { parseQuery, pushHash, decodeHash } from './utils';

interface IQueryContext {
	input: string;
	outputQuery: string;
	outputVars: string;
	hash: string;
	isQueryValid: boolean;
	setInput: React.Dispatch<React.SetStateAction<string>>;
}

const DEFAULT_CONTEXT = {
	input: '',
	outputQuery: '',
	outputVars: '',
	hash: '',
	isQueryValid: false,
	setInput: () => {},
};

const QueryContext = createContext<IQueryContext>(DEFAULT_CONTEXT);

function QueryContextProvider({ children }: { children: ReactNode }) {
	const [input, setInput] = useState('');

	const { query: hashQuery, variables: hashVariables } = useMemo(
		() => decodeHash(window.location.hash),
		[],
	);

	const { outputQuery, outputVars, hash, isQueryValid } = useMemo(() => {
		if (!input)
			return {
				outputQuery: '',
				outputVars: '',
				hash: '',
				isQueryValid: true,
			};

		const { query, variables, hash, error } = parseQuery(input);

		return {
			outputQuery: query,
			outputVars: variables,
			hash,
			isQueryValid: !error,
		};
	}, [input]);

	useEffect(() => {
		if (hash) pushHash(hash);
	}, [hash]);

	return (
		<QueryContext.Provider
			value={{
				input,
				setInput,
				outputQuery: outputQuery || hashQuery,
				outputVars: outputVars || hashVariables,
				hash,
				isQueryValid,
			}}
		>
			{children}
		</QueryContext.Provider>
	);
}

function useQueryContext() {
	return useContext(QueryContext);
}

export { QueryContextProvider, useQueryContext };
