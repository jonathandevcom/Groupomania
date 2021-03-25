<!-- Page principale VueJs avec utilisation de router-vue pour la redirection -->
<template>
  <div id="app">
    <header-top></header-top>
    <router-view></router-view>
    <footer-bottom></footer-bottom>
  </div>
</template>

<script>
import Header from "./components/Header.vue";
import Footer from "./components/Footer.vue";

export default {
  name: "App",
  components: {
    "header-top": Header,
    "footer-bottom": Footer,
  },
};
</script>

<style>
</style>