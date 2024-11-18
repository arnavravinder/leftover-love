import { sveltekit } from '@sveltejs/kit/vite';
import Icons from 'unplugin-icons/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [
		sveltekit(),
		Icons({
			compiler: 'svelte',
			autoInstall: true
		})
	],
	esbuild: {
		supported: {
			'top-level-await': true
		}
	},
	optimizeDeps: {
		esbuildOptions: {
			target: 'esnext'
		},
		exclude: ['date-picker-svelte']
	},
	build: {
		target: 'esnext'
	}
});
