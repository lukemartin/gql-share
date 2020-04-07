import React, { useEffect, useMemo } from 'react';
import { prettyJson, encodeHash, decodeHash, pushHash } from '../utils';

const INPUT_PATTERN = /"body":"([\s\S]+)","method/;

const Home: React.FunctionComponent = () => {
	const [input, setInput] = React.useState('');
	const [outputFromHash, setOutputFromHash] = React.useState<{
		query: string;
		variables: string;
	}>();

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

	return (
		<div className="app">
			<header>
				<h1>gql-share</h1>
			</header>

			<main>
				<div className="input">
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
				</div>

				<div className="output">
					<div>
						<h2>Query</h2>
						<pre>{outputFromHash?.query || output?.query}</pre>
					</div>

					<div>
						<h2>Variables</h2>
						<pre>{outputFromHash?.variables || output?.variables}</pre>
					</div>
				</div>
			</main>
		</div>
	);
};

export default Home;
