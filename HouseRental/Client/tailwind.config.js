// tailwind.config.js
module.exports = {
  // Other configurations
  plugins: [
    function ({ addUtilities }) {
      addUtilities(
        {
          '.scrollbar-hide': {
            'overflow': 'hidden',
            '-ms-overflow-style': 'none',
            'scrollbar-width': 'none'
          },
          '.scrollbar-hide::-webkit-scrollbar': {
            'display': 'none'
          }
        },
        ['responsive', 'hover']
      )
    }
  ]
}
