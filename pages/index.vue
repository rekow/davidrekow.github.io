<template>
  <section class="page-content">
    <h1>david rekow</h1>
    <h2>(that's me!)</h2>
  </section>
</template>

<script>
export default {
  mounted() {
    this.$root.$emit('instagram', []);
  }
};
</script>
