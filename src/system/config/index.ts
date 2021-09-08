import { createStitches } from '@stitches/react';
import { theme as _theme } from './theme';
import { utils as _utils } from './utils';

export const {
	styled,
	css,
	globalCss,
	keyframes,
	getCssText,
	theme,
	createTheme,
	config,
} = createStitches({
	theme: _theme,
	utils: _utils,
});

export const globalStyles = globalCss({
	'html, body, #root': {
		height: '100%',
		margin: 0,
		padding: 0,
	},
	body: {
		bg: '$slate1',
		color: '$slate12',
		fontFamily: '$body',
	},
	'#root': {
		display: 'flex',
	},
	a: {
		color: 'inherit',
		textDecoration: 'none',
	},
});
