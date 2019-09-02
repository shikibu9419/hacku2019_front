require('dotenv').config();

export default {
  env: {
    YOLP_APPID: process.env.YOLP_APPID,
    GOOGLE_MAPS_API_KEY: process.env.GOOGLE_MAPS_API_KEY,
    API_URL: process.env.API_URL,
    SOCKET_SERVER_URL: process.env.SOCKET_SERVER_URL,
  },

  mode: 'spa',
  /*
  ** Headers of the page
  */
  head: {
    title: 'Mille Feuille',
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
    '@fortawesome/fontawesome-svg-core/styles.css'
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
//     { src: '~/plugins/vue-jsonp.js' },
    { src: '~/plugins/font-awesome', ssr: false },
    { src: '~/plugins/axios.js', ssr: false },
    { src: '~/plugins/global-component' },
    { src: '~/plugins/vue-tagsinput.js'},
    { src: '~/plugins/socket.io' }
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
    ['@nuxtjs/pwa', {icon: false} ],
    '@nuxtjs/dotenv',
    '@nuxtjs/svg',
    '@nuxtjs/proxy',
    '@nuxtjs/toast',
    'nuxt-fontawesome'
  ],
  /*
  ** Nuxt.js vendor
  */
  vendor: ['socket.io-client'],
  /*
  ** Axios module configuration
  ** See https://axios.nuxtjs.org/options
  */
  axios: {
    proxy: true,
    baseURL: process.env.API_URL
  },
/*
  proxy: {
    '/api': { target: process.env.API_URL, pathRewrite: {'^/api': ''} }
  },
*/
  toast: {
    position: 'top-center',
    duration: 2500
  },

  fontawesome: {
    imports: [
      {
        set: '@fortawesome/free-solid-svg-icons',
        icons: ['fas']
      },
    ]
  },
  /*
   ** Build configuration
  */
  build: {
  }
}
