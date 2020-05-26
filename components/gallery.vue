<template>
  <div
    :class="['gallery', 'gallery-columns-' + deviceColumns, static ? 'gallery-static' : '']"
  >
    <transition-group
      name="gallery"
      tag="div"
    >
      <div
        class="gallery-item"
        v-for="(item, i) in items"
        :key="item.id"
        :index="i + 1"
        @click="itemDetail"
      >
        <slot
          name="gallery-item"
          :item="item"
          :index="i"
        />
      </div>
      <div
        class="gallery-item gallery-see-more"
        v-if="items.length"
        key="see-more"
      >
        <slot name="see-more" />
      </div>
    </transition-group>
  </div>
</template>

<script>
export default {
  props: {
    items: {
      type: Array,
      default: () => []
    },
    columns: {
      type: Number,
      default: 5
    },
    static: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      detail: {},
      ids: []
    }
  },
  computed: {
    deviceColumns() {
      let columns;

      switch(this.$vuetify.breakpoint.name) {
        case 'xs': columns = 2; break;
        case 'sm': columns = 3; break;
        case 'md': columns = 4; break;
        case 'lg':
        case 'xl': columns = 5;
      }

      return this.columns < columns ? this.columns : columns;
    }
  },
  methods: {
    itemDetail(e) {
      const detail = this.detail;
      const newDetail = e.currentTarget;

      if (detail.classList) {
        // Undo the super hacky thing from below
        if (!this.static && +detail.getAttribute('index') % this.columns === 0 && detail.nextSibling) {
          detail.parentNode.insertBefore(detail.nextSibling, detail);
        }
        detail.classList.remove('gallery-detail');
      }

      if (detail === newDetail) {
        return this.detail = {};
      }

      // Super hacky way to (mostly) avoid grid reflows when expanding cells in rightmost column
      // by swapping the cell with its left neighbor first
      if (!this.static && +newDetail.getAttribute('index') % this.columns === 0) {
        newDetail.parentNode.insertBefore(newDetail, newDetail.previousSibling);
      }

      newDetail.classList.add('gallery-detail');
      this.detail = newDetail;
    }
  }
}
</script>


<style lang="scss">
.gallery {
  &> div {
    display: grid;
    grid-auto-flow: dense;
  }

  .gallery-item {
    position: relative;
    cursor: pointer;

    &> .v-card {
      width: 100%;
      height: 100%;
      display: flex;
      flex-flow: column nowrap;
    }

    img {
      opacity: 0.65;
      display: block;
      object-fit: cover;
      max-width: 100%;
    }

    &.gallery-detail, &:hover {
      img {
        opacity: 1
      }
    }
  }

  .gallery-enter-active, .gallery-leave-active {
    transition: all 0.2s;
  }

  .gallery-enter, .gallery-leave-to {
    opacity: 0;
    transform: translateY(5px);
  }

  @for $i from 1 through 10 {
    &.gallery-columns-#{$i} > div {
      grid-template-columns: repeat(#{$i}, 1fr);
    }
  }

  .gallery-see-more .v-card {
    @include center-center;

    a {
      text-decoration: none;
      color: inherit;

      &:hover {
        transform: translateY(-2px);
      }
    }
  }
}

.gallery:not(.gallery-static) {
  .gallery-item.gallery-detail {
    grid-row: span 2;
    grid-column: span 2;
  }

  @for $i from 2 through 10 {
    &.gallery-columns-#{$i} .gallery-item:nth-child(#{$i}n).gallery-detail {
      grid-column: #{$i - 1} / span 2;
    }
  }
}
</style>
