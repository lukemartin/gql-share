import React, { useMemo, useState } from 'react';
import {
	Box,
	Button,
	Flex,
	Heading,
	IconButton,
	Tab,
	TabList,
	TabPanel,
	TabPanels,
	Tabs,
	Textarea,
	useColorMode,
} from '@chakra-ui/react';
import { LinkIcon, MoonIcon } from '@chakra-ui/icons';

function App() {
	const { toggleColorMode } = useColorMode();
	const [inputValue, setInputValue] = useState('');
	const outputQueryValue = useMemo(() => {
		if (!inputValue) return '';

		return inputValue.split('').reverse().join('');
	}, [inputValue]);
	const outputVarsValue = useMemo(() => {
		if (!inputValue) return '';

		return inputValue.toUpperCase();
	}, [inputValue]);

	return (
		<Flex flexDirection="column" height="100%" p="4">
			<Flex as="header" justifyContent="space-between" alignItems="center">
				<Heading as="h1">GraphQL Query Share</Heading>
				<Box>
					<IconButton
						aria-label="Toggle color mode"
						variant="ghost"
						icon={<MoonIcon />}
						marginRight="4"
						onClick={toggleColorMode}
					></IconButton>

					<Button colorScheme="blue" leftIcon={<LinkIcon />}>
						Share Query
					</Button>
				</Box>
			</Flex>

			<Flex flexBasis="100%" marginTop="4" direction="column">
				<Flex alignItems="stretch" flexGrow={1}>
					<Textarea
						height="100%"
						variant="filled"
						resize="none"
						placeholder="1. 'Copy > Copy as cURL' from the Network tab of DevTools &#10; &#10; 2. Paste the output here"
						size="sm"
						sx={{
							'::placeholder': {
								textAlign: 'center',
							},
						}}
						value={inputValue}
						isInvalid={inputValue.length === 3}
						onChange={(e) => setInputValue(e.target.value)}
						onFocus={(e) => e.target.select()}
					></Textarea>
				</Flex>

				{!!inputValue && (
					<Flex marginTop="4" flexBasis="70%">
						<Flex flexGrow={1} flexDirection="column">
							<Heading as="h2" size="md" marginBottom={2}>
								Query
							</Heading>
							<Textarea
								height="100%"
								value={outputQueryValue}
								readOnly
								resize="none"
								onFocus={(e) => e.target.select()}
							></Textarea>
						</Flex>
						<Flex flexGrow={1} flexDirection="column" marginLeft={4}>
							<Heading as="h2" size="md" marginBottom={2}>
								Variables
							</Heading>
							<Textarea
								height="100%"
								value={outputVarsValue}
								readOnly
								resize="none"
								onFocus={(e) => e.target.select()}
							></Textarea>
						</Flex>
					</Flex>
				)}
			</Flex>
		</Flex>
	);
}

export { App };
