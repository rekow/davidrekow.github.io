export default {
  mode: 'spa',
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
  }
}
