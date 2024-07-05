import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [sveltekit()],
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
