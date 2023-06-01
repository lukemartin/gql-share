<script lang="ts">
	import copy from 'copy-to-clipboard';

	import Button from './Button.svelte';

	export let small = false;
	export let data;

	let isCopied = false;

	const handleClick = () => {
		copy(data);
		isCopied = true;

		setTimeout(() => {
			isCopied = false;
		}, 2000);
	};
</script>

<Button {small} on:click={handleClick}>
	{#if isCopied}
		Copied
	{:else}
		<slot />
	{/if}
</Button>
