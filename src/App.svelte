<script lang="ts">
	import copy from 'copy-to-clipboard';
	import Button from './Button.svelte';
	import {
		// SAMPLE_INPUT,
		parseQuery,
		encodeHash,
		decodeHash,
		pushHash,
	} from './utils';

	let input = '';
	let parsedQuery: ReturnType<typeof parseQuery>;
	// let operationName = '';
	let query = '';
	let variables: { [index: string]: any };
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
			buttonProps={{ class: 'large' }}
			on:click={() => copy(window.location.href)}>
			Share
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
				<Button on:click={() => copy(query || hashQuery)}>Copy</Button>
			</div>
			<div>
				<pre>{query || hashQuery}</pre>
			</div>
		</section>
		<section>
			<div class="section-header">
				<h2>Variables</h2>
				<Button on:click={() => copy(variablesOutput || hashVariables)}>
					Copy
				</Button>
			</div>
			<div>
				<pre>{variablesOutput || hashVariables}</pre>
			</div>
		</section>
	</main>
</div>
