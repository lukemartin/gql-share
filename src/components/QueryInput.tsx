import React from 'react';
import { Textarea } from './';
import { useQueryContext } from '../QueryContext';
import { Text, VisuallyHidden } from '../system';

function QueryInput() {
	const { input, setInput, isQueryValid } = useQueryContext();

	const isInvalid = !!input.length && !isQueryValid;

	return (
		<>
			<VisuallyHidden>
				<Text as="h2">Input</Text>
			</VisuallyHidden>
			<Textarea
				data-test="query-input"
				placeholder="1. 'Copy > Copy as cURL' from the Network tab of DevTools &#10; &#10; 2. Paste the output here"
				value={input}
				onChange={(e) => setInput(e.target.value)}
				onPaste={(e) =>
					// TODO: Update to use a ref and do this properly in the parent
					setTimeout(() => {
						// @ts-ignore
						e.target.blur();
						// @ts-ignore
						e.target.scrollTo(0, 0);
					})
				}
				invalid={isInvalid}
			></Textarea>
		</>
	);
}

export { QueryInput };
