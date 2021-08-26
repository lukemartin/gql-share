import { CopyIcon } from '@chakra-ui/icons';
import {
	Button,
	CSSObject,
	Flex,
	Heading,
	Textarea,
	useToast,
} from '@chakra-ui/react';
import copy from 'copy-to-clipboard';
import React from 'react';

interface IProps {
	headerText: string;
	value: string;
	sx?: CSSObject;
	dataTest: string;
}

function Output({ headerText, value, sx, dataTest }: IProps) {
	const toast = useToast();

	return (
		<Flex flexGrow={1} flexDirection="column" sx={sx}>
			<Flex justifyContent="space-between" alignItems="center" py="2">
				<Heading as="h2" size="md" marginBottom={2}>
					{headerText}
				</Heading>
				<Button
					colorScheme="blue"
					size="sm"
					variant="outline"
					leftIcon={<CopyIcon />}
					onClick={() => {
						copy(value);

						if (!toast.isActive(headerText)) {
							toast({
								title: `${headerText} copied to clipboard`,
								status: 'success',
								position: 'top',
								id: headerText,
							});
						}
					}}
				>
					Copy
				</Button>{' '}
			</Flex>

			<Textarea
				data-test={dataTest}
				value={value}
				readOnly
				resize="none"
				size="sm"
				height="100%"
				onFocus={(e) => e.target.select()}
			></Textarea>
		</Flex>
	);
}

export { Output };
