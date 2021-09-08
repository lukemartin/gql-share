import * as Stitches from '@stitches/react';

type PaddingValue = Stitches.PropertyValue<'padding'>;
type MarginValue = Stitches.PropertyValue<'margin'>;
type BackgroundColorValue = Stitches.PropertyValue<'backgroundColor'>;

export const utils = {
	p: (value: PaddingValue) => ({
		paddingTop: value,
		paddingBottom: value,
		paddingLeft: value,
		paddingRight: value,
	}),
	pt: (value: PaddingValue) => ({
		paddingTop: value,
	}),
	pr: (value: PaddingValue) => ({
		paddingRight: value,
	}),
	pb: (value: PaddingValue) => ({
		paddingBottom: value,
	}),
	pl: (value: PaddingValue) => ({
		paddingLeft: value,
	}),
	px: (value: PaddingValue) => ({
		paddingLeft: value,
		paddingRight: value,
	}),
	py: (value: PaddingValue) => ({
		paddingTop: value,
		paddingBottom: value,
	}),

	m: (value: MarginValue) => ({
		marginTop: value,
		marginBottom: value,
		marginLeft: value,
		marginRight: value,
	}),
	mt: (value: MarginValue) => ({
		marginTop: value,
	}),
	mr: (value: MarginValue) => ({
		marginRight: value,
	}),
	mb: (value: MarginValue) => ({
		marginBottom: value,
	}),
	ml: (value: MarginValue) => ({
		marginLeft: value,
	}),
	mx: (value: MarginValue) => ({
		marginLeft: value,
		marginRight: value,
	}),
	my: (value: MarginValue) => ({
		marginTop: value,
		marginBottom: value,
	}),

	bg: (value: BackgroundColorValue) => ({
		backgroundColor: value,
	}),
};
