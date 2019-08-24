require('dotenv').config();

export default {
  mode: 'spa',
  /*
  ** Headers of the page
  */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ],
    script: [
      { src: 'https://maps.googleapis.com/maps/api/js?key=' + process.env.GOOGLE_MAPS_API_KEY },
      { src: 'https://map.yahooapis.jp/js/V1/jsapi?appid=' + process.env.YOLP_APPID }
    ],
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },
  /*
  ** Global CSS
  */
  css: [
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
//     { src: '~/plugins/vue2-google-maps.js' },
    { src: '~/plugins/vue-jsonp.js' }
  ],
  /*
  ** Nuxt.js dev-modules
  */
  devModules: [
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
    '@nuxtjs/dotenv',
    '@nuxtjs/svg'
  ],
  /*
  ** Nuxt.js vendor
  */
//   vendor: ['vue2-google-maps'],
  /*
  ** Axios module configuration
  ** See https://axios.nuxtjs.org/options
  */
  axios: {
  },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
//     extend (config, ctx) {
//       config.externals = config.externals || [];
//       if (!ctx.isClient) {
//         config.externals.splice(0, 0, function(context, request, callback) {
//           if (/^vue2-google-maps($|\/)/.test(request)) {
//             callback(null, false);
//           } else {
//             callback();
//           }
//         });
//       }
//     }
  }
}
