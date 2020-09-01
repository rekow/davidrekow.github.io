export default {
  mode: 'spa',
  loading: false,
  head: {
    meta: [{
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, minimal-ui'
    }]
  },
  build: {
    extractCSS: true,
    optimization: {
      splitChunks: {
        cacheGroups: {
          styles: {
            name: 'styles',
            test: /\.(css|vue)$/,
            chunks: 'all',
            enforce: true
          }
        }
      }
    }
  },
  buildModules: [
    '@nuxtjs/style-resources',
    '@nuxtjs/vuetify'
  ],
  styleResources: {
    scss: [
      '~styles/*.scss'
    ]
  },
  vuetify: {
    treeShake: true,
    theme: {
      dark: true
    }
  },
  generate: {
    fallback: true
  }
}
