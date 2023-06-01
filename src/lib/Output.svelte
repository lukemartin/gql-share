<script lang="ts">
	import CopyButton from './CopyButton.svelte';

	export let title = '';
	export let content = '';
</script>

<section class="grid grid-rows-[min-content_1fr] rounded-md bg-slate-800 sm:overflow-hidden">
	<div class="flex items-center justify-between p-2 pl-4 border-b border-b-slate-600">
		<h2 class="text-slate-200 text-sm">{title}</h2>
		<CopyButton small data={content}>Copy</CopyButton>
	</div>
	<div class="py-4 grid sm:overflow-hidden">
		<pre class="px-4 min-h-[300px] sm:min-h-0 overflow-auto font-mono text-xs text-slate-300" role="code">{content ||
				''}</pre>
	</div>
</section>
