<script lang="ts">
	import copy from 'copy-to-clipboard';
	import Button from './Button.svelte';
	import { parseQuery, encodeHash, decodeHash, pushHash } from './utils';

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

	main {
		display: grid;
		grid-template-columns: minmax(0, 1fr) minmax(0, 1fr) minmax(0, 1fr);
		grid-template-rows: minmax(0, 1fr);
		gap: 10px;
		padding: 10px;
	}

	section {
		display: grid;
		grid-template-columns: minmax(0, 1fr);
		grid-template-rows: min-content minmax(0, 1fr);
		gap: 1px 1px;
		padding: 10px;
	}
	.section-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
</style>

<div class="container">
	<header>
		<h1>GraphQL Query Share</h1>
		<Button
			large
			success={copyStatus.url}
			on:click={() => {
				copy(window.location.href);
				flash('url');
			}}>
			{copyStatus.url ? 'Copied' : 'Share'}
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
					class:error={input && !query}
					placeholder="'Copy > Copy as cuRL' from DevTools"
					bind:value={input} />
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
					}}>
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
					}}>
					{copyStatus.variables ? 'Copied' : 'Copy'}
				</Button>
			</div>
			<div>
				<pre>{variablesOutput || hashVariables}</pre>
			</div>
		</section>
	</main>
</div>
