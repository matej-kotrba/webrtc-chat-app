/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			animation: {
				dropDownAppear: 'dropDownAppear 0.3s ease',
				hueRotation: 'hueRotation 16s ease-in-out infinite',
				transformRight: 'rightTransform 8s linear infinite'
			},
			keyframes: {
				dropDownAppear: {
					'0%': { opacity: 0, transform: 'translateY(-10%)' },
					'100%': { opacity: 1, transform: 'translateY(0)' }
				},
				hueRotation: {
					'0%, 100%': { filter: 'hue-rotate(0deg)' },
					'50%': { filter: 'hue-rotate(360deg)' }
				},
				rightTransform: {
					'0%': { transform: 'translateX(0)' },
					'100%': { transform: 'translateX(100%)' }
				}
			}
		}
	},
	plugins: []
};
