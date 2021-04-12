// tailwind.config.js
const colors = require('tailwindcss/colors')

module.exports = {
  purge: {
    enabled: true,
    content: ['./public/*.html']
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
    fontFamily: {
      'body': ['Inter'],
    },
    backgroundColor: theme => ({
      ...theme('colors'),
      'blueish-black': '#191932',
    }),
    textColor: theme => ({
      ...theme('colors'),
      'faux-purple': '#5A5A89',
      'light-violet': '#7B7EB1',
      'primary-gray': '#6D7175',
      'ford-light': '#898989',
      'faux': '#404047'
    }),
    borderColor: theme => ({
      ...theme('colors'),
      green: '#98EF10',
      'light-violet': '#5A5A89'
    }),
    gradientColorStops: theme => ({
      ...theme('colors'),
      'light-blue': '#3541F1',
      'dark-blue': '#1F2386',
      navy: '#1F2497',
      primrose: '#23287D'
    }),
    ringColor: theme => ({
      ...theme('colors'),
      violet: '#AFB2E9',
    }),
    ringOffsetColor: {
      black: colors.black,
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
    },
  },
  plugins: [
  ]
}
