<template>
  <section class="page-content">
    <h1>hacking the mainframe</h1>
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
