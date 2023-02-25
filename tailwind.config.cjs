/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			animation: {
				dropDownAppear: 'dropDownAppear 0.3s ease'
			},
			keyframes: {
				dropDownAppear: {
					'0%': { opacity: 0, transform: 'translateY(-10%)' },
					'100%': { opacity: 1, transform: 'translateY(0)' }
				}
			}
		}
	},
	plugins: []
};
