export default {
  ssr: false,
  target: 'static',
  generate: {
    fallback: true
  },

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: '%s - Admin',
    title: 'PostPOS',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ]
  },

  plugins: ['~plugins/helpers.js', '~plugins/api.js'],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: [
    {
      path: '~/components',
      extensions: ['vue'],
      pathPrefix: false
    }
  ],

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: ['@nuxtjs/eslint-module', '@nuxtjs/vuetify'],

  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/auth-next',
    'vue2-editor/nuxt',
    'vue-toastification/nuxt'
  ],

  toast: {
    position: 'bottom-right'
  },

  axios: {
    baseURL: 'http://localhost:3000',
    credentials: true,
    headers: {
      common: {
        Accept: 'application/json',
        'Access-Control-Allow-Origin': 'http://localhost:3001'
      }
    }
  },

  publicRuntimeConfig: {
    axios: {
      baseURL: process.env.BASE_URL || 'http://localhost:3000'
    }
  },

  privateRuntimeConfig: {
    axios: {
      baseURL: process.env.BASE_URL || 'http://localhost:3000'
    }
  },

  vuetify: {
    treeShake: true,
    theme: {
      dark: false,
      light: true
    }
  },

  auth: {
    redirect: {
      login: '/auth',
      logout: '/auth',
      callback: '/auth',
      home: '/'
    },
    strategies: {
      local: {
        token: {
          property: 'data.token',
          global: true
        },
        user: {
          property: 'data',
          autoFetch: true
        },
        endpoints: {
          login: { url: '/v1/auth/login', method: 'post' },
          user: { url: '/v1/auth/me', method: 'get' }
        }
      }
    }
  },

  router: {
    middleware: 'auth'
  }
}
