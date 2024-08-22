module.exports = {
  plugins: {
    // We want to use postcss-nesting, but it needs to be
    // compatible with Tailwind, so we configure it like so:
    // See https://tailwindcss.com/docs/using-with-preprocessors#nesting
    // If we remove Tailwind, then go back to regular nesting plugin
    // 'postcss-nesting': {},
    'tailwindcss/nesting': 'postcss-nesting',
    tailwindcss: {},
    autoprefixer: {},
  },
}
