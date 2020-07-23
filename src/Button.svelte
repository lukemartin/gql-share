<script lang="ts">
	export let large = false;
	export let success = false;
</script>

<button class:large class:success on:click>
	<slot />
</button>
