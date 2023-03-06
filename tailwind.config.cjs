/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			boxShadowColor: {
				blackTransparent: 'rgba(0, 0, 0, 0.3)'
			},
			animation: {
				dropDownAppear: 'dropDownAppear 0.3s ease',
				hueRotation: 'hueRotation 16s ease-in-out infinite',
				transformRight: 'rightTransform 8s linear infinite',
				appearFromTop: 'appearFromTop 0.8s ease-in-out'
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
				},
				appearFromTop: {
					'0%': { opacity: 0, transform: 'translateY(-20%)' },
					'100%': { opacity: 1, transform: 'translateY(0)' }
				}
			}
		}
	},
	plugins: []
};
