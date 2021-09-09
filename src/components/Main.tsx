import React from 'react';
import { Flex } from '../system';
import { QueryInput } from '../components';
import { useQueryContext } from '../QueryContext';
import { Output } from './Output';

export const Main = () => {
	const { outputQuery, outputVars } = useQueryContext();

	return (
		<Flex as="main" direction="column" css={{ mx: '$3', flexGrow: 1 }}>
			<Flex css={{ flexGrow: 1 }}>
				<QueryInput />
			</Flex>

			{outputQuery || outputVars ? (
				<Flex css={{ flexGrow: 5, mt: '$2' }}>
					<Output
						headerText="Query"
						value={outputQuery}
						css={{ marginRight: '$3' }}
						dataTest="output-query"
					/>

					<Output
						headerText="Variables"
						value={outputVars}
						dataTest="output-variables"
					/>
				</Flex>
			) : null}
		</Flex>
	);
};
