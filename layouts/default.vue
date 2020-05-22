<template>
  <v-app dark>
    <PageNav/>
    <v-content class="main">
      <v-container fluid>
        <nuxt/>
        <Instagram ref="insta"/>
      </v-container>
    </v-content>
    <PageFooter/>
  </v-app>
</template>

<script>
import instagram from '~/services/instagram';

import PageNav from '~/components/page-nav.vue';
import PageFooter from '~/components/page-footer.vue';
import Instagram from '~/components/instagram.vue';

export default {
  components: {
    PageNav,
    PageFooter,
    Instagram
  },
  created() {
    this.$root.$on('instagram', (keys=[]) => {
      if (keys === false) {
        return this.$refs.insta.loadMedia();
      }

      if (!keys.length) {
        instagram.getFeed().then(feed => this.$refs.insta.loadMedia(feed));
      } else {
        this.$refs.insta.loadMedia(keys)
      }
    });

    this.$vuetify.theme.dark = true;
  }
}
</script>

<style lang="scss">
body {
  background-color: $body-background-color;
  font-family: "Roboto", "Helvetica Neue", Helvetica, Arial, sans-serif;
  font-weight: 300;
}
</style>
