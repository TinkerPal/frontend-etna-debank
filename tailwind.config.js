// tailwind.config.js
const colors = require('tailwindcss/colors')

module.exports = {
  purge: {
    enabled: true,
    content: ['./public/*.html', './src/tailwind_dynamic_html/*.html']
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      zIndex: {
        '60': 60,
        '70': 70,
        '80': 80
       },
      inset: {
        '5/6': '85%',
      },
      maxWidth: {
        '460': '460px'
      },
      width: {
        'fit-content': 'fit-content',
        'rest': 'calc(100% - 290px)',
        '290': '290px',
        'notif': 'calc(100% - 48px)'
      },
      fontSize: {
        '8': ['8px', '10px']
      },
      height: {
        '66': '66px',
        'empty': 'calc(100vh - 346px)'
      }
    },
    fontFamily: {
      'body': ['Inter'],
    },
    fill: theme => ({
      'red': '#EB5757',
      'green': '#27AE60',
      'yellow': '#F2C94C',
      'grey': '#9CA3AF',
      'white': '#ffffff',
      'swamp': '#48A68E'
    }),
    backgroundColor: theme => ({
      ...theme('colors'),
      'blueish-black': '#191932',
      green: '#98EF10',
      'green-medium': '#34C759',
      'medium-grey': '#35354E',
      'green-success': 'rgba(39, 174, 96, 0.2)',
      'warning': 'rgba(255, 235, 153, 0.25)',
      'error': 'rgba(255, 70, 70, 0.15)',
      violet: '#5A5A89',
      'green-400': '#68D391'
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
      'green-3': '#6FCF97',
      'grey-200': '#C5C5CC',
      red: '#EB5757',
      yellow: '#FBBF24',
      'violet-100': '#9292C1'
    }),
    borderColor: theme => ({
      ...theme('colors'),
      green: '#98EF10',
      'light-violet': '#5A5A89',
      'light-grey': '#292948',
      'green-3': '#6FCF97',
      'medium-grey': '#35354E',
      red: '#EB5757',
      'green-400': '#68D391'
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
      wiggle: 'wiggle 58s ease-in-out infinite',
      'wiggle-2': 'wiggle-2 66s ease-in-out infinite',
      'wiggle-3': 'wiggle-3 74s ease-in-out infinite',
      'bounce': 'bounce 48s ease infinite',
      'bounce-2': 'bounceModified 46s ease-in-out infinite',
      'bounce-3': 'bounce3 10s ease-in-out infinite',
      spin: 'spin 1s linear infinite',
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
      bounce3: {
        '50%': {
          transform: 'translateY(-10%)'
        },
        '0%, 100%': {
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
      textOpacity: ['active', 'disabled'],
      backgroundOpacity: ['active'],
      fill: ['hover', 'focus', 'active'],
    },
    animation: ['responsive', 'motion-safe', 'motion-reduce']
  },
  plugins: []
}
