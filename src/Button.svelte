<script lang="ts">
	export let buttonProps = {};
</script>

<button {...buttonProps} on:click>
	<slot />
</button>
