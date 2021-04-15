import React from 'react';
import {
	Box,
	Button,
	Flex,
	Heading,
	IconButton,
	Link,
	useColorMode,
	useToast,
} from '@chakra-ui/react';
import { LinkIcon, MoonIcon } from '@chakra-ui/icons';
import copy from 'copy-to-clipboard';

const TOAST_ID = 1;

function Header() {
	const { toggleColorMode } = useColorMode();
	const toast = useToast();

	return (
		<Flex as="header" justifyContent="space-between" alignItems="center">
			<Heading as="h1">
				<a href="/">GraphQL Query Share</a>
			</Heading>

			<Box>
				<Link
					isExternal
					href="https://github.com/lukemartin/gql-share"
					sx={{ fontSize: 11 }}
				>
					View on GitHub
				</Link>
				<IconButton
					variant="ghost"
					marginX="4"
					icon={<MoonIcon />}
					aria-label="Toggle color mode"
					onClick={toggleColorMode}
				></IconButton>

				<Button
					colorScheme="blue"
					leftIcon={<LinkIcon />}
					onClick={() => {
						copy(window.location.href);

						if (!toast.isActive(TOAST_ID)) {
							toast({
								title: 'Query URL copied to clipboard',
								status: 'success',
								position: 'top',
								id: TOAST_ID,
							});
						}
					}}
				>
					Share Query
				</Button>
			</Box>
		</Flex>
	);
}

export { Header };
