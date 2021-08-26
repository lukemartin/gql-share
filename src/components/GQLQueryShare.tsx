import React from 'react';
import { Flex } from '@chakra-ui/react';
import { Header } from './Header';
import { QueryInput } from './QueryInput';
import { useQueryContext } from '../QueryContext';
import { Output } from './Output';

function GQLQueryShare() {
	const { outputQuery, outputVars, isQueryValid } = useQueryContext();

	return (
		<Flex flexDirection="column" height="100%" p="4">
			<Header />

			<Flex flexBasis="100%" marginTop="4" direction="column">
				<Flex flexGrow={1}>
					<QueryInput />
				</Flex>

				<Flex
					marginTop="4"
					sx={{
						flexBasis: isQueryValid ? '80%' : '0%',
						display: isQueryValid ? 'flex' : 'none',
					}}
				>
					<Output
						headerText="Query"
						value={outputQuery}
						sx={{ marginRight: 8 }}
						dataTest="output-query"
					/>

					<Output
						headerText="Variables"
						value={outputVars}
						dataTest="output-variables"
					/>
				</Flex>
			</Flex>
		</Flex>
	);
}

export { GQLQueryShare };
