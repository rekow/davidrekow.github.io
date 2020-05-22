<template>
  <div class="github">
    <Gallery
      :static="true"
      :items="repos"
      :columns="4"
    >
      <template #gallery-item="{ item }">
        <div class="gh-info">
          <h4>
            <v-icon
              large
              v-if="item.fork"
            >
              mdi-source-fork
            </v-icon>
            <span>{{ item.name }}</span>
          </h4>
          <p class="gh-description">
            <span>{{ item.description || "No description." }}</span>
            <v-badge
              :content="item.language"
              inline
            >
            </v-badge>
          </p>
        </div>
        <h5 class="gh-size">
          <v-icon>mdi-folder</v-icon>
          <span>{{ item.size }} files</span>
        </h5>
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
        <div class="gh-meta">
          <v-icon small>mdi-source-fork</v-icon>
          <span>{{ item.forks }}</span>
          <v-icon small>mdi-star-outline</v-icon>
          <span>{{ item.stars }}</span>
          <v-icon small>mdi-eye-outline</v-icon>
          <span>{{ item.watchers }}</span>
        </div>
        <div class="gh-launch">
          <span class="gh-goto">
            <v-tooltip left>
              <template #activator="{ on }">
                <v-btn
                  icon
                  absolute
                  top
                  right
                  :href="item.permalink"
                  :target="'_blank'"
                  v-on="on"
                >
                  <v-icon large>mdi-github</v-icon>
                </v-btn>
              </template>
              <span>view on github</span>
            </v-tooltip>
          </span>
        </div>
      </template>

      <template #see-more>
        <a href="http://github.com/davidrekow" target="_blank">
          <v-icon x-large>mdi-github</v-icon>
          see more on github
          <v-icon small>mdi-arrow-right</v-icon>
        </a>
      </template>
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
  rockspec: 'mdi-language-lua'
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
    background-color: #333;
    display: flex;
    flex-direction: column;
    flex-flow: column nowrap;
    max-height: 30em;
  }

  h4 {
    font-family: "Roboto Mono", monospace;
    font-size: 1.5em;
    margin-top: .25em;
    margin-bottom: .5em;
  }

  .gh-size {
    background-color: rgba(0, 0, 0, 0.1);
  }

  .gh-files {
    width: 100%;
    overflow-y: scroll;
    background-color: rgba(255,255,255, 0.1);
    flex: auto;
  }

  .gh-meta {
    position: absolute;
    bottom: 5px;
    right: 5px;
  }

  span + i.v-icon,
  i.v-icon + span {
    vertical-align: middle;
    line-height: 20px;
  }

  .gallery-see-more {
    a {
      text-decoration: none;
    }
  }
}
</style>
