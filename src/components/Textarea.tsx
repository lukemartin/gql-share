import { styled } from '../system';

export const Textarea = styled('textarea', {
	boxSizing: 'border-box',
	bg: '$bg3',
	border: '1px solid $bg7',
	borderRadius: '$1',
	outline: 'none',
	p: '$2',
	resize: 'none',
	width: '100%',
	fontFamily: '$mono',
	color: '$bg11',
	'&::placeholder': {
		textAlign: 'center',
	},

	'&:hover, &:focus': {
		borderColor: '$bg8',
	},

	variants: {
		invalid: {
			true: {
				borderColor: '$red7',
				'&:hover, &:focus': {
					borderColor: '$red8',
				},
			},
		},
	},
});
