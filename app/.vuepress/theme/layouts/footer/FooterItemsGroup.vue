<template>
  <div
    class="footer-group"
    :class="{ first, collapsable }"
  >
    <p class="footer-group-heading">
      <span>{{ item.title }}</span>
    </p>

      <ul ref="items" class="footer-group-items" v-if="open || !collapsable">
        <li v-for="child in item.children" :class="getItemClass(child)">
          <FooterItemLink :item="child"/>
        </li>
      </ul>
  </div>
</template>

<script>
import FooterItemLink from './FooterItemLink.vue'

export default {
  name: 'FooterGroup',
  props: ['item', 'first', 'open', 'collapsable'],
  components: { FooterItemLink },
  methods: {
      getItemClass (item) {
        let itemClass = item.frontmatter.title.toLowerCase();
          itemClass = itemClass.replace(/ /g,"_");
        return itemClass;
      }
  }
}
</script>
