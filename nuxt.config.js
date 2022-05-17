export default {
  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'Programa Acompañar - Mapeo',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'format-detection', content: 'telephone=no' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Mapa interactivo del proyecto Acompañar' }
    ],
    link: [
      { rel: 'icon', type: 'image/png', href: '/favicon.png' },
      { href: 'https://fonts.googleapis.com/css2?family=Roboto+Mono:ital,wght@0,300;0,400;0,500;0,700;1,300;1,400;1,500;1,700&family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap', rel: 'stylesheet' },
      { href: 'https://api.mapbox.com/mapbox-gl-js/v1.8.1/mapbox-gl.css', rel: 'stylesheet' },
      { href: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.13.0/css/all.min.css', rel: 'stylesheet', integrity: 'sha256-h20CPZ0QyXlBuAw7A+KluUYx/3pK+c7lYEpqLTlxjYQ=', crossorigin: 'anonymous' }
    ],
    script: [
      { src: 'https://api.mapbox.com/mapbox-gl-js/v1.8.1/mapbox-gl.js' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    { src: '@/assets/scss/main.scss', lang: 'sass' }
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  env: {
    googleSheetId: process.env.GOOGLE_SHEET_ID || '',
    googleApiKey: process.env.GOOGLE_API_KEY || '',
    mapboxApiKey: process.env.MAPBOX_API_KEY || '',
    mapboxMapStyle: process.env.MAPBOX_MAP_STYLE || '',
    mapCenterLatitude: process.env.MAP_CENTER_LATITUDE || '',
    mapCenterLongitude: process.env.MAP_CENTER_LONGITUDE || '',
    mapZoomDefault: process.env.MAP_ZOOM_DEFAULT || ''
  },

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    '@nuxtjs/google-gtag'
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/buefy
    'nuxt-buefy',
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios'
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    baseURL: '/'
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  },
  'google-gtag': {
    id: process.env.GOOGLE_ANALYTICS_ID,
    config: {
      anonymize_ip: true, // anonymize IP
      send_page_view: false, // might be necessary to avoid duplicated page track on page reload
      linker: {
        domains: ['guillecro.github.io/accompany-map']
      }
    },
    debug: true, // enable to track in dev mode
    disableAutoPageTrack: false // disable if you don't want to track each page route with router.afterEach(...).
  }
}
