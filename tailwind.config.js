/** @type {import('tailwindcss').Config} */
export default {
	content: ['./index.html', './src/**/*.{svelte,js,jsx,ts,tsx}'],
	theme: {
		extend: {
			screens: {
				xs: '403px'
			}
		}
	},
	plugins: []
};
