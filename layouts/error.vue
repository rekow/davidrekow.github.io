<template>
  <v-app dark>
    <v-content class="main">
      <v-container fluid>
        <section class="page-content">
          <div class="page-hero">
            <h1>oops</h1>
            <p>something went wrong with your request :(</p>
            <p>try returning to <nuxt-link to="/">the homepage</nuxt-link></p>
          </div>
        </section>
      </v-container>
    </v-content>
  </v-app>
</template>

<style lang="scss">
body {
  background-color: $body-background-color;
  font-family: "Roboto", "Helvetica Neue", Helvetica, Arial, sans-serif;
  font-weight: 300;
}

.page-hero {
  width: 100%;
  height: 100%;
  display: flex;
  flex-flow: column nowrap;

  h1 {
    font-size: 5em;
    margin-top: 5vh;
    margin-bottom: 5vh;
  }
}
</style>
