<script lang="ts">
	import { onMount } from 'svelte';

	import Header from './lib/Header.svelte';
	import Footer from './lib/Footer.svelte';
	import Input from './lib/Input.svelte';
	import Output from './lib/Output.svelte';

	import { output, searchOutput } from './lib/queryStore';
	import { parseQueryString, pushHash as pushSearch, redirectHashToSearch } from './lib/utils';

	/**
	 * Redirect if parans are specified in the old style
	 */
	onMount(() => {
		redirectHashToSearch();
	});

	/**
	 * Grab query & variables from the URL query string
	 */
	onMount(() => {
		const urlParams = new URLSearchParams(window.location.search);
		const encodedQuery = urlParams.get('query');
		const encodedVariables = urlParams.get('vars');
		const { query, variables } = parseQueryString({ encodedQuery, encodedVariables });
		searchOutput.set({ query, variables });
	});

	/**
	 * Push new query string when we have valid output
	 */
	$: {
		if ($output.queryString) {
			pushSearch($output.queryString);
		}
	}
</script>

<div class="sm:h-screen sm:grid sm:grid-rows-[min-content_1fr_min-content]">
	<Header />

	<main class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 p-4 gap-4 sm:overflow-hidden">
		<Input />
		<Output title="Query" content={$output.query || $searchOutput.query} />
		<Output title="Variables" content={$output.variables || $searchOutput.variables} />
	</main>

	<Footer />
</div>
