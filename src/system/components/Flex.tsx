import { styled } from '../';
import { Box } from './Box';

export const Flex = styled(Box, {
	display: 'flex',

	variants: {
		direction: {
			column: {
				flexDirection: 'column',
			},
			row: {
				flexDirection: 'row',
			},
		},
	},
});

Flex.displayName = 'Flex';
