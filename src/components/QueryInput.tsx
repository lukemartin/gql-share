import React from 'react';
import { Textarea } from '@chakra-ui/textarea';
import { useQueryContext } from '../QueryContext';

function QueryInput() {
	const { input, setInput, isQueryValid } = useQueryContext();

	const isInvalid = Boolean(input.length && !isQueryValid);

	return (
		<Textarea
			data-test="query-input"
			value={input}
			isInvalid={isInvalid}
			variant="filled"
			placeholder="1. 'Copy > Copy as cURL' from the Network tab of DevTools &#10; &#10; 2. Paste the output here"
			size="sm"
			height="100%"
			resize="none"
			sx={{
				'::placeholder': {
					textAlign: 'center',
				},
			}}
			onChange={(e) => setInput(e.target.value)}
			onFocus={(e) => e.target.select()}
			onPaste={(e) =>
				// TODO: Update to use a ref and do this properly in the parent
				setTimeout(() => {
					// @ts-ignore
					e.target.blur();
					// @ts-ignore
					e.target.scrollTo(0, 0);
				})
			}
		></Textarea>
	);
}

export { QueryInput };
