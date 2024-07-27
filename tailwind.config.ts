import type { Config } from 'tailwindcss';
import defaultTheme from 'tailwindcss/defaultTheme';

export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],

	theme: {
		extend: {
			colors: {
				cream: '#FCF6EA',
				headerBg: '#F5F5F5',
				blueNew: '#2d9ce1',
				redNew: '#f03562'
			},
			fontFamily: {
				sans: ['Jost', ...defaultTheme.fontFamily.sans]
			}
		}
	},

	plugins: []
} as Config;
