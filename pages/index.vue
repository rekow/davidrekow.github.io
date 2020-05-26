<template>
  <section class="page-content">
    <div class="page-hero">
      <h1>&gt;&nbsp;hello!</h1>
      <h2><strong>i'm david rekow</strong> and i am a technologist, maker, and doer.</h2>
      <p><strong>i believe that</strong> human progress should serve the least among us, first.</p>
      <p><strong>i play with</strong> food, software, hardware, physical materials and language.</p>
      <p><strong>i focus on</strong> creating intuitive, highly-performant, accessible and ethical user experiences on the web.</p>
      <h3>
        <v-icon x-large>mdi-head-heart-outline</v-icon>
      </h3>
      <p>use the menu @ the bottom of the page to see more of my pics and code</p>
    </div>
  </section>
</template>

<script>
export default {
  mounted() {
    this.$root.$emit('instagram', []);
  }
};
</script>

<style lang="scss">
.page-hero {
  @include center-center;

  h1 {
    font-family: "Roboto Mono", monospace;
  }

  ul {
    list-style-type: none;
  }
}
</style>
