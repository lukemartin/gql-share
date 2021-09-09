import type * as Stitches from '@stitches/react';
import {
	GitHubLogoIcon,
	MoonIcon,
	Share2Icon,
	SunIcon,
} from '@modulz/radix-icons';
import React from 'react';
import { AccessibleIcon, Button, Flex, Text } from '../system';
import { useFlash } from '../hooks/useFlash';
import copy from 'copy-to-clipboard';

export const Header = () => {
	const [flash, shareButtonProps] = useFlash<{
		text: string;
		appearance?: Stitches.VariantProps<typeof Button>['appearance'];
	}>({
		defaultProps: {
			text: 'Share Query',
			appearance: undefined,
		},
	});

	return (
		<Flex
			as="header"
			direction="row"
			css={{
				m: '$3',
				justifyContent: 'space-between',
			}}
		>
			<Text as="h1" size="large">
				<a href="/">GraphQL Query Share</a>
			</Text>

			<Flex css={{ alignItems: 'center' }}>
				<a
					href="https://github.com/lukemartin/gql-share"
					target="_blank"
					rel="noopener noreferrer"
					title="View project on GitHub"
				>
					<AccessibleIcon label="View project on GitHub">
						<GitHubLogoIcon />
					</AccessibleIcon>
				</a>

				{/*<button onClick={() => {}}>
					<AccessibleIcon label="Toggle dark mode">
						<MoonIcon />
					</AccessibleIcon>
				</button>*/}

				<Button
					css={{ ml: '$3' }}
					appearance={shareButtonProps.appearance}
					onClick={() => {
						copy(window.location.href);
						flash({ text: 'Copied', appearance: 'success' });
					}}
				>
					<Share2Icon /> {shareButtonProps.text}
				</Button>
			</Flex>
		</Flex>
	);
};
