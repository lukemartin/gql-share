import { styled } from '..';

export const Button = styled('button', {
	boxSizing: 'border-box',
	border: 'none',
	borderRadius: '$1',
	padding: '$2',
	fontSize: '$normal',
	color: '$bg12',
	bg: '$blue6',
	display: 'inline-flex',
	alignItems: 'center',
	gap: '$2',

	'&:hover, &:focus': {
		bg: '$blue7',
	},

	variants: {
		small: {
			true: {
				fontSize: '$small',
			},
		},
		appearance: {
			default: {},
			success: {
				bg: '$green9',

				'&:hover, &:focus': {
					bg: '$green9',
				},
			},
		},
	},

	defaultVariants: {
		appearance: 'default',
	},
});

Button.displayName = 'Button';
