<script lang="ts">
	import githubIcon from '../assets/github.svg';
	import CopyButton from './CopyButton.svelte';
</script>

<header class="p-4 pb-0 flex justify-between">
	<h1 class="text-xl"><a href="/">GraphQL Query Share</a></h1>

	<div class="flex gap-4 items-center">
		<a
			class="text-white"
			href="https://github.com/lukemartin/gql-share"
			target="_blank"
			rel="noopener noreferrer"
			title="View project on GitHub"
		>
			<img src={githubIcon} alt="Github icon" width="24" class="text-white" />
		</a>

		<CopyButton data={window.location.href}>Share Query</CopyButton>
	</div>
</header>
