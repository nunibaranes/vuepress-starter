<template>
  <div class="list-item" :class="{ first, collapsable }">
    <h4 class="list-item-heading" :class="{ open }" @click="$emit('toggle')">
      <span class="group-icon" v-if="collapsable" :class="open ? 'open' : 'close'"></span>
      <span>{{ item.title }}</span>
    </h4>
    <DropdownTransition>
      <div v-if="open || !collapsable" class="list-item-content">
        <slot name="content"/>
      </div>
    </DropdownTransition>
  </div>
</template>
<style lang="scss">
  @import '../../../styles/components/lists/list-item-collapsable';
</style>
<script>
import DropdownTransition from '../dropdown/DropdownTransition.vue'

export default {
  props: ['item', 'first', 'open', 'collapsable'],
  components: { DropdownTransition },
  methods: {
      getItemClass (item) {
        let itemClass = item.frontmatter.title.toLowerCase();
          itemClass = itemClass.replace(/ /g,"_");
        return itemClass;
      }
  }
}
</script>
