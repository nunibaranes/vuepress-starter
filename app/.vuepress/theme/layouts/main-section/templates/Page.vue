<template>
  <div class="default-page">
    <!-- topSection -->
    <Section :class="topSectionClasses">
      <slot name="section-main" slot="main">
        <div class="content">
          <h1 class="title main-title"><pre class="pre-text">{{ data.topSection && data.topSection.title ? data.topSection.title : data.title }}</pre></h1>
        </div>
        <div v-if="data.topSection && data.topSection.figure" class="figure">
          <img v-if="data.topSection.figure.src" :src="$withBase(data.topSection.figure.src)"  alt=""/>
        </div>
      </slot>
    </Section>
    <Section :class="'main-page-section bg-gray'">
      <slot name="section-main" slot="main">
        <article>
          <Content/>
        </article>
      </slot>
    </Section>
  </div>
</template>
<style lang="scss">
  @import '../../../../styles/templates/page/page.scss';
</style>
<script>
import Section from '../../../components/sections/Section.vue'
export default {
  components: {Section},
  computed: {
      data () {
          return this.$page.frontmatter;
      },
      topSectionClasses () {
          return [
              'top-page-section',
              this.$page.frontmatter.topSection ? this.$page.frontmatter.topSection.bgColor : 'bg-dodger-blue'
          ]
      },
  },
  methods: {

  }
}
</script>