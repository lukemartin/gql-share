import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
	styles: {
		global: {
			'html, body, #root': {
				height: '100%',
			},
			body: {},
			textarea: {
				fontFamily: 'mono',
			},
		},
	},
	config: {
		initialColorMode: 'dark',
		useSystemColorMode: true,
	},
});

export { theme };
