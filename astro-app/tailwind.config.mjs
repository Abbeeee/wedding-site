/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			colors: {
				transparent: 'transparent',
				current: 'currentColor',
				'white': '#ffffff',
				'black': '#000000',
				"primary": "#262a34",
				"secondary": "#1E61CD",
				"accent": "#757263",
				"background": "#f2f1ee",
			  },
			maxWidth: {
				'container': 'calc(min(100% - 32px, 1024px))',
			  },
		},
	},
	plugins: [],
}
