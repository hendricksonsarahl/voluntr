module.exports = ({ file, options, env }) => ({
  plugins: {
    stylelint: env == 'production' ? false: {
      config: { extends: "stylelint-config-recommended" }
    },
    'autoprefixer': env == 'production' ? options.autoprefixer : false,
    'cssnano': env === 'production' ? options.cssnano : false
  }
})