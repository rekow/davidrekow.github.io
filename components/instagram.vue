<template>
  <Gallery :items="media">
    <template #gallery-item="{ item }">
      <img
        :src="item.url"
        :id="item.id">
      <span class="ig-caption">{{ item.caption }}</span>
    </template>

    <template #see-more>
      <a href="http://instagram.com/i.made.these" target="_blank">
        <v-icon x-large>mdi-instagram</v-icon>
        see more on instagram
        <v-icon small>mdi-arrow-right</v-icon>
      </a>
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
.gallery > div {
  grid-gap: 0;
}

.gallery-item {
  display: flex;
  background-color: white;

  &.gallery-see-more {
    background-color: #333;
  }

  .ig-caption {
    visibility: hidden;
    color: white;
    margin: 0;
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 35%;
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
</style>
