import React, { useEffect, useMemo } from 'react';
import {
	Box,
	BoxProps,
	Button,
	Flex,
	Heading,
	Textarea,
	useToast,
} from '@chakra-ui/core';
import { prettyJson, encodeHash, decodeHash, pushHash } from '../utils';

const INPUT_PATTERN = /"body":"([\s\S]+)","method/;

const Home: React.FC = () => {
	const [input, setInput] = React.useState('');
	const [outputFromHash, setOutputFromHash] = React.useState<{
		query: string;
		variables: string;
	}>();
	const toast = useToast();

	// Calculate the output
	const output: {
		query: string;
		variables: string;
	} = useMemo(() => {
		if (!input) return null;

		const matches = input.match(INPUT_PATTERN);
		const match = Array.isArray(matches) && matches[1];

		if (!match) {
			return null;
		}

		const escaped = match.replace(/\\"/g, '"');
		const parsed = JSON.parse(escaped);

		return {
			variables: prettyJson(parsed?.variables),
			query: parsed?.query?.replace?.(/\\n/g, '\n'),
		};
	}, [input]);

	// Remove hashed output from URL when manually adding input
	useEffect(() => {
		if (input) {
			setOutputFromHash(null);
			pushHash('#');
		}
	}, [input]);

	// Encode the output to URL
	useEffect(() => {
		if (output) {
			pushHash(
				encodeHash({ query: output.query, variables: output.variables }),
			);
		}
	}, [output]);

	// Take the hash on app load
	useEffect(() => {
		const hash = window.location.hash;
		if (hash) setOutputFromHash(decodeHash(hash));
	}, []);

	const copy = (text: string, type: string): void => {
		navigator.clipboard.writeText(text);
		toast({
			title: `${type} copied to clipboard`,
			position: 'top',
			duration: 3000,
		});
	};

	return (
		<Flex direction="column" h="100%">
			<Flex
				as="header"
				p={4}
				justifyContent="space-between"
				borderBottom="1px"
				borderColor="gray.200"
			>
				<Heading as="h1">gql-share</Heading>
				{(output || outputFromHash) && (
					<Button
						leftIcon="copy"
						variantColor="cyan"
						onClick={(): void => copy(window.location.href, 'Share URL')}
					>
						Share
					</Button>
				)}
			</Flex>

			<Flex flex="1">
				<Section flex="1">
					<SubHeading>Input</SubHeading>
					<Textarea
						flex="1"
						placeholder='"Copy > Copy as fetch" from the Network tab of DevTools'
						fontFamily="mono"
						fontSize="sm"
						resize="none"
						isInvalid={input && !output}
						onChange={(e): void => setInput(e.target.value)}
					></Textarea>
				</Section>

				<Section flex="1">
					<Flex justifyContent="space-between">
						<SubHeading>Query</SubHeading>
						<Button
							size="sm"
							leftIcon="copy"
							variantColor="cyan"
							onClick={(): void =>
								copy(outputFromHash?.query || output?.query, 'Query')
							}
						>
							Copy
						</Button>
					</Flex>
					<ScrollablePre>
						{outputFromHash?.query || output?.query}
					</ScrollablePre>
				</Section>

				<Section flex="1">
					<Flex justifyContent="space-between">
						<SubHeading>Variables</SubHeading>
						<Button
							size="sm"
							leftIcon="copy"
							variantColor="cyan"
							onClick={(): void =>
								copy(
									outputFromHash?.variables || output?.variables,
									'Variables',
								)
							}
						>
							Copy
						</Button>
					</Flex>
					<ScrollablePre>
						{outputFromHash?.variables || output?.variables}
					</ScrollablePre>
				</Section>
			</Flex>
		</Flex>
	);
};

const Section: React.FC<BoxProps> = ({ children, ...props }) => (
	<Flex as="section" direction="column" p={4} {...props}>
		{children}
	</Flex>
);

const SubHeading: React.FC = ({ children }) => (
	<Heading as="h2" size="lg" mb="4">
		{children}
	</Heading>
);

const ScrollablePre: React.FC = ({ children }) => (
	<Box flex="1" position="relative">
		<Box
			as="pre"
			p="4"
			position="absolute"
			top="0"
			right="0"
			bottom="0"
			left="0"
			overflow="auto"
			fontSize="sm"
			bg="gray.50"
		>
			{children}
		</Box>
	</Box>
);

export default Home;
