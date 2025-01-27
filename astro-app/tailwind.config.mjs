/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			colors: {
				transparent: 'transparent',
				current: 'currentColor',
				'white': '#fcfaf8',
				'black': '#000000',
				"primary": "#262a34",
				"secondary": "#1E61CD",
				"accent": "#757263",
				"accent-400": "#bbb9af",
				"accent-300": "#dddcd7",
				"accent-200": "#e4e3df",
				"background": "#F5F1EB",

			},
			maxWidth: {
				'container': 'calc(min(100% - 32px, 1024px))',
				'container-roomy': 'calc(min(100% - 64px, 1024px))',
				'container-full': 'calc(100% - 64px)',
			},
			fontFamily: {
				'mrs-eaves': [
					'"mrs-eaves"',
					'serif',
				],
				'mrs-eaves-small-caps': [
					'"mrs-eaves-roman-small-caps"',
					'serif',
				],
				'mrs-eaves-all-small': [
					'"mrs-eaves-roman-all-small-ca"',
					'serif',
				],
				'mrs-eaves-lining': [
					'"mrs-eaves-roman-lining"',
					'serif',
				],
				'geographica': [
					'"geographica"',
					'sans-serif',
				],
				'geographica-script': [
					'"geographica-script"',
					'sans-serif',
				],
			},
		},
		screens: {
			'xs': '480px',
			'sm': '640px',
			'md': '768px',
			'lg': '1024px',
			'xl': '1280px',
			'2xl': '1536px',
		  }
	},
	plugins: [],
}
