<template>
  <section class="page-content">
    <div class="page-hero">
      <h1>hacking the mainframe</h1>
      <h2>...i'm in</h2>
      <p><strong>i love writing code</strong> &mdash; it's fun, i'm good at it, it looks beautiful, it works well.</p>
      <p>i have <strong>15 years experience</strong> writing javascript, and a decade as a professional fullstack engineer.</p>
      <p>i tend to prefer <strong>abstract problem spaces </strong> - data optimization, framework architecture, platform design.</p>
      <p>i tend to excel at <strong>unobtrusive, in-place upgrades</strong> of legacy applications.</p>
      <p>i also tend to be placed in roles that define and enforce technology <strong>best practices</strong>.</p>

      <h2>
        <v-icon x-large>mdi-xml</v-icon>
      </h2>

      <div class="d-flex justify-space-around things-i-know">
        <div>
          <h3>languages</h3>
          <ul>
            <li>javascript (typescript, coffeescript)</li>
            <li>html (haml, erb, jade, pug, jsp)</li>
            <li>css (scss/sass, less, stylus)</li>
            <li>python (2.7+)</li>
            <li>java (5+)</li>
            <li>lua (4+)</li>
            <li>sh</li>
          </ul>
        </div>
        <div>
          <h3>frameworks</h3>
          <ul>
            <li>vue 1+ (vuetify, materialize, nuxt)</li>
            <li>angular 1+ (material2, ng-bootstrap)</li>
            <li>react 8+</li>
            <li>bootstrap/backbone/ember</li>
            <li>express (koa, hapi)</li>
            <li>flask.py (bottle)</li>
            <li>spring-mvc.java</li>
          </ul>
        </div>
        <div>
          <h3>build tooling</h3>
          <ul>
            <li>make</li>
            <li>webpack (babel, gulp, grunt, rollup)</li>
            <li>maven</li>
          </ul>
        </div>
        <div>
          <h3>dbs &amp; platforms</h3>
          <ul>
            <li>postgresql (mysql)</li>
            <li>redis (memcached)</li>
            <li>mongo<li>
            <li>google cloud platform</li>
            <li>aws</li>
            <li>heroku</li>
            <li>*nix (mac OS, ubuntu, mint, gentoo)</li>
          </ul>
        </div>
      </div>
    </div>
    <Github ref="github"/>
  </section>
</template>

<script>
import Github from '~/components/Github';

export default {
  components: {
    Github
  },
  mounted() {
    this.$root.$emit('instagram', false);
    this.$refs.github.loadRepos();
  }
}
</script>

<style lang="scss">
.things-i-know {
  width: 100%;
}
</style>
