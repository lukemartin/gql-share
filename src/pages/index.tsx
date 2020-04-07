import React, { useEffect, useMemo } from 'react';

import { prettyJson } from '../utils';

const INPUT_PATTERN = /"body":"([\s\S]+)","method/;

const Home: React.FunctionComponent = () => {
	const [input, setInput] = React.useState('');

	const output: {
		query: string;
		variables: string;
	} | null = useMemo(() => {
		if (!input) return null;

		const matches = input.match(INPUT_PATTERN);
		const match = Array.isArray(matches) && matches[1];

		if (!match) {
			// EFFECT
			// setHashOutput
			// push
			return null;
		}

		const escaped = match.replace(/\\"/g, '"');
		const parsed = JSON.parse(escaped);

		return {
			variables: prettyJson(parsed?.variables),
			query: parsed?.query?.replace?.(/\\n/g, '\n'),
		};
	}, [input]);

	useEffect(() => {
		console.log(output);
	}, [output]);

	return (
		<div>
			<h1>gql-share</h1>
			<p>
				From the Network tab of devtools, right click on a `gql` query and
				select &quot;Copy &gt; Copy as fetch&quot;.
			</p>

			<h2>Input</h2>
			<textarea
				onChange={(e): void => setInput(e.target.value)}
				value={input}
				cols={100}
				rows={10}
			></textarea>

			<hr />

			<h2>Query</h2>
			<pre>{output?.query}</pre>

			<h2>Variables</h2>
			<pre>{output?.variables}</pre>
		</div>
	);
};

export default Home;
