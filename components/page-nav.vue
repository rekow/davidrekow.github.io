<template>
  <v-bottom-navigation
    fixed
    dark
    grow
    shift
    app>
    <v-btn nuxt to="/">
      <span>home</span>
      <v-icon dark>mdi-home</v-icon>
    </v-btn>
    <v-btn nuxt to="/me">
      <span>me</span>
      <v-icon dark>mdi-face</v-icon>
    </v-btn>
    <v-btn nuxt to="/bakes">
      <span>my bakes</span>
      <v-icon dark>mdi-baguette</v-icon>
    </v-btn>
    <v-btn nuxt to="/makes">
      <span>my makes</span>
      <v-icon dark>mdi-stove</v-icon>
    </v-btn>
    <v-btn nuxt to="/code">
      <span>my code</span>
      <v-icon dark>mdi-code-braces</v-icon>
    </v-btn>
  </v-bottom-navigation>
</template>

<style lang="scss">
// https://github.com/vuetifyjs/vuetify/issues/8067
.v-bottom-navigation--fixed {position: fixed !important;}
.v-item-group.v-bottom-navigation .v-btn {height: inherit !important;}
</style>
