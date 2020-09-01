<template>
  <div class="github">
    <Gallery
      :static="true"
      :items="repos"
      :columns="4"
    >
      <template #gallery-item="{ item }">
        <v-card
          dark
          outlined>
          <v-card-title>
            <v-icon
              medium
              v-if="item.fork"
              inline
            >
              mdi-source-fork
            </v-icon>
            <span>{{ item.name }}</span>
          </v-card-title>


          <v-card-text>
            {{ item.description || "(no description available)" }}
            <v-badge
              :content="item.language"
              inline
            >
            </v-badge>
          </v-card-text>

          <v-divider />

          <v-card-subtitle>
            <v-icon>mdi-folder</v-icon>
            <span>{{ item.size }} files</span>

            <div class="float-right">
              <v-icon small>mdi-source-fork</v-icon>
              <span>{{ item.forks }}</span>
              <v-icon small>mdi-star-outline</v-icon>
              <span>{{ item.stars }}</span>
              <v-icon small>mdi-eye-outline</v-icon>
              <span>{{ item.watchers }}</span>
            </div>
          </v-card-subtitle>

          <div class="gh-files">
            <v-treeview
              dense
              open-on-click
              transition
              hoverable
              expand-icon="mdi-chevron-down"
              item-children="files"
              item-key="sha"
              :items="item.files"
              :load-children="expandContent"
            >
              <template #prepend="{ item, open }">
                <v-icon
                  v-if="item.type === 'dir'"
                  medium
                >
                  {{ open ? 'mdi-folder-open' : 'mdi-folder' }}
                </v-icon>
                <v-icon
                  v-else
                  medium
                >
                  {{ iconForFile(item.name) }}
                </v-icon>
              </template>

              <template #label="{ item }">
                <v-hover #default="{ hover }">
                  <div>
                    <span>{{item.name}}</span>
                    <v-btn icon v-if="hover">
                      <v-icon
                        small
                        @click="viewFile(item)"
                      >
                        mdi-launch
                      </v-icon>
                    </v-btn>
                  </div>
                </v-hover>
              </template>
            </v-treeview>
          </div>

          <v-card-actions>
            <v-tooltip left>
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
                  <v-icon large>mdi-github</v-icon>
                </v-btn>
              </template>
              <span>view on github</span>
            </v-tooltip>

            <v-btn
              :href="item.permalink"
              :target="'_blank'"
            >
              view on github<v-icon small>mdi-arrow-right</v-icon>
            </v-btn>
          </v-card-actions>
        </v-card>
      </template> <!-- end #gallery-item -->

      <template #see-more>
        <v-card
          dark
          outlined
          hover
          href="http://github.com/davidrekow"
          target="_blank"
        >
          <v-icon x-large>mdi-github</v-icon>
          see more on github
          <v-icon small>mdi-arrow-right</v-icon>
        </v-card>
      </template>

      </v-card>
    </Gallery>
  </div>
</template>

<script>
import github from '~/services/github';

import Gallery from '~/components/gallery';

const FILE_ICONS   = {
  html: 'mdi-language-html5',
  css: 'mdi-language-css3',
  js: 'mdi-nodejs',
  json: 'mdi-code-json',
  md: 'mdi-language-markdown-outline',
  coffee: 'mdi-coffee-outline',
  gitignore: 'mdi-git',
  npmignore: 'mdi-npm',
  yml: 'mdi-cog',
  yaml: 'mdi-cog',
  license: 'mdi-share-variant',
  cakefile: 'mdi-cake-variant',
  makefile: 'mdi-wrench',
  dockerfile: 'mdi-docker',
  lua: 'mdi-language-lua',
  rockspec: 'mdi-language-lua',
  vue: 'mdi-vue-js'
};

export default {
  components: {
    Gallery
  },
  data() {
    return {
      repos: []
    }
  },
  methods: {
    loadRepos(ids) {
      if (!ids) {
        return github.getRepos().then(repos => this.loadRepos(repos))
      }

      Promise.all(ids.map(id => github.getRepo(id)))
        .then(repos => this.repos = repos.sort((a, b) => b.stars - a.stars));
    },
    viewFile(file) {
      window.open(file.permalink, '_blank');
    },
    async expandContent(item) {
      item.files = await github.getRepoContents(item.repo, item.path);
    },
    iconForFile(filename) {
      const ext = filename.split('.').pop().toLowerCase();
      return FILE_ICONS[ext] || '';
    }
  }
}
</script>

<style lang="scss">
.github {
  .gallery > div {
    grid-gap: 5px;
  }

  .gallery-item {
    background-color: inherit;
    min-height: 55vh;
    max-height: 80vh;

    .v-card {
      width: 100%;
      height: 100%;
      display: flex;
      flex-flow: column nowrap;

      &> * {
        flex: 0 auto;
      }
    }
  }

  .v-card__title {
    font-family: "Roboto Mono", monospace;
    word-break: break-word;
    max-height: 8vh;
    overflow: hidden;
    text-overflow: ellipsis;

    .v-icon {
      margin-right: 5px;
    }
  }

  .v-card__text {
    height: 10vh;
  }

  .gh-files {
    min-height: 40vh;
    flex: 1 1 0 !important;
    overflow: hidden;
    overflow-y: scroll;
    background-color: rgba(255,255,255, 0.1);
  }

  span + i.v-icon,
  i.v-icon + span {
    vertical-align: middle;
  }

  .gallery-see-more {
    a {
      text-decoration: none;
    }
  }
}
</style>
