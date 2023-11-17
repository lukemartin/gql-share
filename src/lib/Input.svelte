<script lang="ts">
	import { queryInput, output } from './queryStore';
</script>

<section
	class="grid sm:col-span-full lg:col-span-1 rounded-md bg-slate-800"
	class:outline={$queryInput.length && $output.error}
	class:outline-red-500={$queryInput.length && $output.error}
>
	<form method="POST" class="grid grid-rows-[min-content_1fr_min-content]">
		<label for="query-input" class="p-4 border-b border-b-slate-600 text-slate-200 text-sm">
			<h2>Input</h2>
		</label>
		<div class="pt-4 grid">
			<textarea
				id="query-input"
				name="query-input"
				class="resize-none min-h-[300px] sm:min-h-0 bg-transparent px-4 font-mono text-xs outline-none text-slate-300"
				required
				placeholder="1. 'Copy > Copy as cURL' from the Network tab of DevTools / Or paste a parsed JSON object here

2. Paste the output here"
				bind:value={$queryInput}
			/>
		</div>
	</form>
</section>
