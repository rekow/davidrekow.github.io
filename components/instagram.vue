<template>
  <Gallery :items="media" class="instagram">
    <template #gallery-item="{ item }">
      <v-hover #default="{ hover }">
        <div>
          <img
            :src="item.url"
            :id="item.id">
          <span class="ig-caption">{{ item.caption }}</span>

          <v-tooltip left v-if="hover">
            <template #activator="{ on }">
              <v-btn
                absolute
                top
                right
                icon
                :href="item.permalink"
                :target="'_blank'"
                v-on="on"
              >
                <v-icon large>mdi-instagram</v-icon>
              </v-btn>
            </template>
            <span>view on instagram</span>
          </v-tooltip>
        </div>
      </v-hover>
    </template>

    <template #see-more>
      <v-card
        dark
        outlined
        hover
        href="http://instagram.com/i.made.these"
        target="_blank"
      >
        <v-icon x-large>mdi-instagram</v-icon>
        see more on instagram
        <v-icon small>mdi-arrow-right</v-icon>
      </v-card>
    </template>
  </Gallery>
</template>

<script>
import instagram from '~/services/instagram';

import Gallery from '~/components/gallery.vue';

export default {
  components: {
    Gallery
  },
  data() {
    return {
      media: []
    }
  },
  methods: {
    loadMedia(ids) {
      if (ids && ids.length) {
        Promise.all(ids.map(id => instagram.getMedia(id)))
          .then(media => this.media = media);
      } else {
        this.media = [];
      }
    },
    loadPost(media) {
      window.open(media.permalink, '_blank');
    }
  }
}
</script>


<style lang="scss">
.instagram {
  &.gallery > div {
    grid-gap: 0;
  }

  .gallery-item {
    // background-color: white;

    &.gallery-see-more {
      background-color: #333;
    }

    .ig-caption {
      visibility: hidden;
      margin: 0;
      padding: 2px;
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 35%;
      color: white;
      font-size: 9pt;
      overflow: hidden;
      white-space: pre-line;
      background-color: rgba(0, 0, 0, 0.7);
    }

    &.gallery-detail {
      .ig-caption {
        padding: 5px;
        height: 25%;
        font-size: 11pt;
      }
    }

    &.gallery-detail, &:hover {
      .ig-caption {
        visibility: visible;
      }
    }
  }
}
</style>
