<script lang="ts">
	export let large: boolean | undefined = false;
	export let success: boolean | undefined = false;
</script>

<button class:large class:success on:click>
	<slot />
</button>
