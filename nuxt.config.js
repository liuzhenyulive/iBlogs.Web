module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: 'iblogs.web',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'The web for https://iblogs.site' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  modules: ['bootstrap-vue/nuxt'],
  /*
 ** Plugins to load before mounting the App
 */
  plugins: [
    {
      src: "~/plugins/main.js",
      ssr: true
    },
    {
      src: "~/plugins/headroom.js",
      ssr: true
    }
  ],
  /*
  ** Customize the progress bar color
  */
  loading: { color: '#3B8070' },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** Run ESLint on save
    */
    extend (config, { isDev, isClient }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  }
};
