<script lang="ts">
	export let type: 'button' | 'submit' | 'reset' | null | undefined = 'button';
	export let small = false;
	export let element: HTMLButtonElement | undefined = undefined;
</script>

<button
	class="rounded-md py-2 px-4 bg-pink-700 text-md hover:bg-pink-600"
	class:text-sm={small}
	{type}
	bind:this={element}
	on:click><slot /></button
>
