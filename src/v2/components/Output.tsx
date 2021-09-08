import type * as Stitches from '@stitches/react';
import React from 'react';
import { Textarea } from '.';
import { useFlash } from '../hooks/useFlash';
import { Button, config, Flex, Text } from '../system';
import copy from 'copy-to-clipboard';
import { CopyIcon } from '@modulz/radix-icons';

interface IProps {
	headerText: string;
	value: string;
	css?: Stitches.CSS<typeof config>;
	dataTest: string;
}

export const Output = ({ headerText, value, css, dataTest }: IProps) => {
	const [flash, copyButtonProps] = useFlash<{
		text: string;
		appearance?: Stitches.VariantProps<typeof Button>['appearance'];
	}>({
		defaultProps: {
			text: 'Copy',
			appearance: undefined,
		},
	});

	return (
		<Flex direction="column" css={{ flexGrow: 1, ...css }}>
			<Flex
				css={{
					justifyContent: 'space-between',
					alignItems: 'center',
					py: '$2',
				}}
			>
				<Text as="h2" size="large">
					{headerText}
				</Text>
				<Button
					small
					appearance={copyButtonProps.appearance}
					onClick={() => {
						copy(value);
						flash({ text: 'Copied', appearance: 'success' });
					}}
				>
					<CopyIcon /> {copyButtonProps.text}
				</Button>
			</Flex>

			<Textarea
				data-test={dataTest}
				value={value}
				readOnly
				css={{
					height: '100%',
				}}
			></Textarea>
		</Flex>
	);
};
