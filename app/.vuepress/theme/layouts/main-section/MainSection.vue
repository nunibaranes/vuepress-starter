<template>
  <section class="main-section">
    <!-- home layout-->
    <div v-if="$page.frontmatter.home" class="layout home-layout">
      <Home/>
    </div>
    <!-- page templates -->
    <div v-if="isRegularPage" class="default-layout">
      <Page :class="pageClass()">
        <slot name="page-top" slot="top"></slot>
        <slot name="page-bottom" slot="bottom"></slot>
      </Page>
    </div>
    <!-- template layout -->
    <div v-if="$page.frontmatter.template" class="layout" :class="templateLayoutClass()">
      <component :is="$page.frontmatter.template"/>
    </div>
  </section>
</template>
<script>
    // templates
    import Home from './templates/Home.vue'
    import Page from './templates/Page.vue'

    export default {
  components: {
      Home,
      Page,
  },
  computed: {
      data () {
          return this.$page.frontmatter
      },
      isRegularPage () {
          return !this.data.home && !this.data.template  && !this.isPostPage;
      },
  },
  methods: {
      pageClass () {
          const pageTypeClass = this.data.pageType ? this.data.pageType + '-page' : '';
          const pageTitle = this.data.title ? this.data.title.toLowerCase() : '';
          const pageTitleClass = pageTitle !== '' ? pageTitle.replace(/ /g,"-") + '-page' : '';

          return [
              pageTypeClass,
              pageTitleClass
          ]
      },
      templateLayoutClass () {
          const pageTemplate = this.$page.frontmatter.template.toLowerCase();
          return pageTemplate + '-layout';
      },
  }
}
</script>