import React from 'react';
import { Flex, Text } from '../system';

export const Footer = () => {
	return (
		<Flex
			as="footer"
			direction="row"
			css={{ my: '$2', justifyContent: 'center' }}
		>
			<Text size="small" subtle>
				by{' '}
				<a href="https://luke.dev" target="_blank" rel="noopener">
					Luke Martin
				</a>
			</Text>
		</Flex>
	);
};
