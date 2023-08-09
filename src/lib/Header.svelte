<script lang="ts">
	import githubIcon from '../assets/github.svg';
	import CopyButton from './CopyButton.svelte';
</script>

<header class="p-4 pb-0 flex flex-wrap gap-4 justify-end items-center">
	<h1 class="w-full xs:w-auto text-xl text-center"><a href="/">GraphQL Query Share</a></h1>

	<div class="flex-grow flex gap-4 items-center justify-end">
		<a
			class="text-white"
			href="https://github.com/lukemartin/gql-share"
			target="_blank"
			rel="noopener noreferrer"
			title="View project on GitHub"
		>
			<img src={githubIcon} alt="Github icon" width="24" class="text-white" />
		</a>

		<CopyButton data={window.location}>Share Query</CopyButton>
	</div>
</header>
