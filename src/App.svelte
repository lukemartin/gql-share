<script lang="ts">
	import copy from 'copy-to-clipboard';
	import { parseQuery, encodeHash, decodeHash, pushHash } from './utils';
	import Button from './Button.svelte';

	let input = '';
	let parsedQuery: ReturnType<typeof parseQuery>;
	// let operationName = '';
	let query = '';
	let variables: { [index: string]: any } | undefined;
	let variablesOutput = '';
	let hashQuery: ReturnType<typeof decodeHash>['query'] = '';
	let hashVariables: ReturnType<typeof decodeHash>['variables'] = '';

	$: parsedQuery = parseQuery(input);
	// $: operationName = (parsedQuery && parsedQuery.operationName) || 'Unknown';
	$: query = parsedQuery && parsedQuery.query;
	$: variables = parsedQuery && parsedQuery.variables;
	$: variablesOutput = JSON.stringify(variables, null, 2);

	$: ({ query: hashQuery, variables: hashVariables } = decodeHash(
		window.location.hash,
	));

	$: query && variables
		? pushHash(encodeHash({ query, variables: variablesOutput }))
		: pushHash('');

	let copyStatus = {
		url: false,
		query: false,
		variables: false,
	};

	const flash = (prop: keyof typeof copyStatus) => {
		copyStatus[prop] = true;
		setTimeout(() => (copyStatus[prop] = false), 1000);
	};
</script>

<div class="container">
	<header>
		<h1>GraphQL Query Share</h1>
		<Button
			large
			success={copyStatus.url}
			on:click={() => {
				copy(window.location.href);
				flash('url');
			}}
		>
			{copyStatus.url ? 'Copied' : 'Copy Permalink'}
		</Button>
	</header>

	<main>
		<section>
			<div>
				<label for="input-textarea">
					<h2>Input</h2>
				</label>
			</div>
			<div>
				<textarea
					id="input-textarea"
					bind:value={input}
					class:error={input && !query}
					placeholder="'Copy > Copy as cURL' from the Network tab of DevTools"
				/>
			</div>
		</section>
		<section>
			<div class="section-header">
				<h2>Query</h2>
				<Button
					success={copyStatus.query}
					on:click={() => {
						copy(query || hashQuery);
						flash('query');
					}}
				>
					{copyStatus.query ? 'Copied' : 'Copy'}
				</Button>
			</div>
			<div>
				<pre>{query || hashQuery}</pre>
			</div>
		</section>
		<section>
			<div class="section-header">
				<h2>Variables</h2>
				<Button
					success={copyStatus.variables}
					on:click={() => {
						copy(variablesOutput || hashVariables);
						flash('variables');
					}}
				>
					{copyStatus.variables ? 'Copied' : 'Copy'}
				</Button>
			</div>
			<div>
				<pre>{variablesOutput || hashVariables}</pre>
			</div>
		</section>
	</main>

	<footer>
		<a href="https://github.com/lukemartin/gql-share">View on GitHub</a>
	</footer>
</div>

<style>
	.container {
		display: grid;
		grid-template-columns: minmax(0, 1fr);
		grid-template-rows: max-content minmax(0, 1fr);
		gap: 0;
		height: 100%;
	}

	header {
		padding: 10px 20px;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	footer {
		display: flex;
		justify-content: center;
		align-items: center;
		padding: 10px;
	}

	main {
		display: grid;
		grid-template-columns: minmax(0, 1fr) minmax(0, 1fr) minmax(0, 1fr);
		grid-template-rows: minmax(0, 1fr);
		gap: 0 20px;
		padding: 0 20px;
	}

	section {
		display: grid;
		grid-template-columns: minmax(0, 1fr);
		grid-template-rows: min-content minmax(0, 1fr);
		gap: 10px;
	}
	.section-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
</style>
