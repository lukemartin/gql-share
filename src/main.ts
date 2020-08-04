import App from './App.svelte';

const root = document.getElementById('root');
let app;

if (root) {
	app = new App({
		target: root,
	});
}

export default app;
