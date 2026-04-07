/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
    "./app/**/*.{js,jsx}",
    "./src/**/*.{js,jsx}",
    "*.{js,ts,jsx,tsx,mdx}",
  ],
  prefix: "",
  theme: {
  	container: {
  		center: true,
  		padding: '2rem',
  		screens: {
  			'2xl': '1400px'
  		}
  	},
  	extend: {
  		colors: {
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			sage: {
  				'50': 'hsl(var(--color-sage-50))',
  				'100': 'hsl(var(--color-sage-100))',
  				'200': 'hsl(var(--color-sage-200))',
  				'300': 'hsl(var(--color-sage-300))',
  				'400': 'hsl(var(--color-sage-400))',
  				'500': 'hsl(var(--color-sage-500))',
  				'600': 'hsl(var(--color-sage-600))',
  				'700': 'hsl(var(--color-sage-700))',
  				'800': 'hsl(var(--color-sage-800))',
  				'900': 'hsl(var(--color-sage-900))'
  			},
  			cream: {
  				'50': 'hsl(var(--color-cream-50))',
  				'100': 'hsl(var(--color-cream-100))',
  				'200': 'hsl(var(--color-cream-200))',
  				'300': 'hsl(var(--color-cream-300))',
  				'400': 'hsl(var(--color-cream-400))',
  				'500': 'hsl(var(--color-cream-500))',
  				'600': 'hsl(var(--color-cream-600))',
  				'700': 'hsl(var(--color-cream-700))',
  				'800': 'hsl(var(--color-cream-800))',
  				'900': 'hsl(var(--color-cream-900))'
  			},
  			sidebar: {
  				DEFAULT: 'hsl(var(--sidebar-background))',
  				foreground: 'hsl(var(--sidebar-foreground))',
  				primary: 'hsl(var(--sidebar-primary))',
  				'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
  				accent: 'hsl(var(--sidebar-accent))',
  				'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
  				border: 'hsl(var(--sidebar-border))',
  				ring: 'hsl(var(--sidebar-ring))'
  			}
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		keyframes: {
  			'accordion-down': {
  				from: {
  					height: '0'
  				},
  				to: {
  					height: 'var(--radix-accordion-content-height)'
  				}
  			},
  			'accordion-up': {
  				from: {
  					height: 'var(--radix-accordion-content-height)'
  				},
  				to: {
  					height: '0'
  				}
  			},
  			'fade-in': {
  				'0%': {
  					opacity: '0',
  					transform: 'translateY(20px)'
  				},
  				'100%': {
  					opacity: '1',
  					transform: 'translateY(0)'
  				}
  			},
  			'slide-in': {
  				'0%': {
  					opacity: '0',
  					transform: 'translateX(-20px)'
  				},
  				'100%': {
  					opacity: '1',
  					transform: 'translateX(0)'
  				}
  			}
  		},
  		animation: {
  			'accordion-down': 'accordion-down 0.2s ease-out',
  			'accordion-up': 'accordion-up 0.2s ease-out',
  			'fade-in': 'fade-in 0.6s ease-out',
  			'slide-in': 'slide-in 0.8s ease-out'
  		},
  		fontFamily: {
  			serif: [
  				'Georgia',
  				'Times New Roman',
  				'serif'
  			],
  			sans: [
  				'system-ui',
  				'-apple-system',
  				'BlinkMacSystemFont',
  				'Segoe UI',
  				'Roboto',
  				'sans-serif'
  			],
  			script: [
  				'Brush Script MT',
  				'Lucida Handwriting',
  				'cursive'
  			]
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
}
