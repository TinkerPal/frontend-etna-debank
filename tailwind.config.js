// tailwind.config.js
const colors = require('tailwindcss/colors')

module.exports = {
  purge: {
    enabled: true,
    content: ['./public/*.html']
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      maxWidth: {
        '460': '460px'
      },
      width: {
        'fit-content': 'fit-content',
        'rest': 'calc(100% - 24rem)'
      }
    },
    fontFamily: {
      'body': ['Inter'],
    },
    backgroundColor: theme => ({
      ...theme('colors'),
      'blueish-black': '#191932',
      green: '#98EF10',
      'medium-grey': '#35354E'
    }),
    textColor: theme => ({
      ...theme('colors'),
      'faux-purple': '#5A5A89',
      'light-violet': '#7B7EB1',
      'primary-gray': '#6D7175',
      'ford-light': '#898989',
      'faux': '#404047',
      'electric-green': '#5EFF5A',
      'grey-100': '#C4C4C4',
      green: '#98EF10',
    }),
    borderColor: theme => ({
      ...theme('colors'),
      green: '#98EF10',
      'light-violet': '#5A5A89',
      'light-grey': '#292948',
      'medium-grey': '#35354E'
    }),
    gradientColorStops: theme => ({
      ...theme('colors'),
      'light-blue': '#3541F1',
      'dark-blue': '#1F2386',
      navy: '#1F2497',
      primrose: '#23287D',
      'medium-blue': 'rgba(31, 35, 134, 0.4)'
    }),
    ringColor: theme => ({
      ...theme('colors'),
      violet: '#AFB2E9',
    }),
    ringOffsetColor: {
      black: colors.black,
    },
    animation: {
      wiggle: 'wiggle 12s ease-in-out infinite',
      'wiggle-2': 'wiggle-2 14s ease-in-out infinite',
      'wiggle-3': 'wiggle-3 18s ease-in-out infinite',
      'bounce': 'bounce 10s ease infinite',
      'bounce-2': 'bounceModified 8s ease-in-out infinite',
      spin: 'spin 1s linear infinite'
    },
    keyframes: {
      spin: {
        from: {
          transform: 'rotate(0deg)'
        },
        to: {
          transform: 'rotate(360deg)'
        },
      },
      wiggle: {
        '0%, 100%': {
          transform: 'rotate(-3deg)'
        },
        '50%': {
          transform: 'rotate(3deg)'
        },
      },
      bounce: {
        '0%, 100%': {
          transform: 'translateY(10%)'
        },
        '50%': {
          transform: 'translateY(0)'
        },
      },
      bounceModified: {
        '0%, 100%': {
          transform: 'translateX(-5%)'
        },
        '50%': {
          transform: 'translateY(0)'
        },
      },
      'wiggle-2': {
        '0%, 100%': {
          transform: 'rotate(4deg)'
        },
        '50%': {
          transform: 'rotate(-4deg)'
        },
      },
      'wiggle-3': {
        '0%, 100%': {
          transform: 'rotate(-2deg)'
        },
        '50%': {
          transform: 'rotate(2deg)'
        },
      },
    }
  },
  variants: {
    extend: {
      opacity: ['disabled'],
      gradientColorStops: ['disabled'],
      textColor: ['disabled'],
      ringColor: ['focus'],
      boxShadow: ['focus'],
      outline: ['focus'],
      ringOffsetWidth: ['focus'],
      ringOffsetColor: ['focus'],
      textDecoration: ['focus-visible'],
      textOpacity: ['active'],
      backgroundOpacity: ['active'],
    },
    animation: ['responsive', 'motion-safe', 'motion-reduce']
  },
  plugins: []
}
