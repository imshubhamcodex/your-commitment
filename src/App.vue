<template>
  <div id="app">
    <v-app>
      <router-view />
    </v-app>
  </div>
</template>

<script>
export default {
  mounted() {
    // this.$vuetify.theme.dark = false;
    // console.log(this.$vuetify.theme.dark);
  },
};
</script>

<style>
#app {
  font-family: "Dosis", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
.font-h {
  font-size: 18px;
  font-weight: 700;
  font-family: "Dosis", sans-serif;
}
.font-sh {
  font-size: 18px;
  font-weight: 600;
  font-family: "Dosis", sans-serif;
}
.font-shs {
  font-size: 15px;
  font-weight: 600;
  font-family: "Dosis", sans-serif;
}
</style>
