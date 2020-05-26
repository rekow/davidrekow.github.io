export default {
  mode: 'spa',
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
