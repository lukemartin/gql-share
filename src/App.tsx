import React from 'react';
import { GQLQueryShare } from './components/GQLQueryShare';
import { QueryContextProvider } from './QueryContext';

function App() {
	return (
		<QueryContextProvider>
			<GQLQueryShare />
		</QueryContextProvider>
	);
}

export { App };
