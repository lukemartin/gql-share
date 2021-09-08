import {
	cyanDark,
	redDark,
	greenDark,
	blueDark,
	slate,
	slateDark,
} from '@radix-ui/colors';

export const theme = {
	colors: {
		...blueDark,
		...cyanDark,
		...redDark,
		...greenDark,
		...slateDark,
		bg1: '$slate1',
		bg2: '$slate2',
		bg3: '$slate3',
		bg4: '$slate4',
		bg5: '$slate5',
		bg6: '$slate6',
		bg7: '$slate7',
		bg8: '$slate8',
		bg9: '$slate9',
		bg10: '$slate10',
		bg11: '$slate11',
		bg12: '$slate12',
	},

	fonts: {
		body: 'ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";		',
		mono: 'SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
	},
	fontSizes: {
		small: '13px',
		normal: '15px',
		medium: '19px',
		large: '23px',
	},
	fontWeights: {
		regular: 400,
		// medium: 500,
	},

	space: {
		1: '4px',
		2: '8px',
		3: '16px',
	},

	radii: {
		1: '2px',
	},
};
