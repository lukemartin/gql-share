import { styled } from '../';

export const Text = styled('span', {
	fontFamily: '$body',
	color: '$bg12',
	margin: 0,

	variants: {
		size: {
			small: {
				fontSize: '$small',
				fontWeight: '$regular',
			},
			normal: {
				fontSize: '$normal',
				fontWeight: '$regular',
			},
			medium: {
				fontSize: '$medium',
				fontWeight: '$regular',
			},
			large: {
				fontSize: '$large',
				fontWeight: '$regular',
			},
		},
		subtle: {
			true: {
				color: '$bg11',
			},
		},
	},

	defaultVariants: {
		size: 'normal',
	},
});

Text.displayName = 'Text';
