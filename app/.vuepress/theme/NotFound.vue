<template>
  <div class="theme-container">
    <div class="content page-404">
      <img :src="$withBase('/assets/images/404-not-found.svg')" alt="" title="Page not found">
      <h1 class="title main-title">Something seems to be missing</h1>
      <p>Unfortunately the page you are looking for is not here.</p>
      <p>You might try going back to our <router-link to="/">homepage</router-link></p>
    </div>
  </div>
</template>
<style lang="scss">
  @import '../styles/common/default';
  @import '../styles/theme.scss';
</style>
<script>
export default {
  components: {},
  methods: {},
  mounted() {
      document.title = this.$title + ' | 404' ;
  }
}
</script>
