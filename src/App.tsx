import React from 'react';
import { QueryContextProvider } from './QueryContext';
import { Header } from './components';
import { Footer } from './components';
import { Main } from './components';
import { Flex, globalStyles } from './system';

export const App = () => {
	globalStyles();

	return (
		<QueryContextProvider>
			<Flex direction="column" css={{ width: '100%' }}>
				<Header />
				<Main />
				<Footer />
			</Flex>
		</QueryContextProvider>
	);
};
