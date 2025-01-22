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
