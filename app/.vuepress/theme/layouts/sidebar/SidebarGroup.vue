<template>
  <div
    class="sidebar-group"
    :class="{ first, collapsable }"
  >
    <p
      class="sidebar-heading"
      :class="{ open }"
      @click="$emit('toggle')"
    >
      <span
        class="group-icon"
        v-if="collapsable"
        :class="open ? 'open' : 'close'">
      </span>
      <span>{{ item.title }}</span>
    </p>

    <DropdownTransition>
      <ul
        ref="items"
        class="sidebar-group-items"
        v-if="open || !collapsable"
      >
        <li v-for="child in item.children" :class="getItemClass(child)">
          <SidebarLink :item="child"/>
        </li>
      </ul>
    </DropdownTransition>
  </div>
</template>

<script>
import SidebarLink from './SidebarLink.vue'
import DropdownTransition from '../../components/dropdown/DropdownTransition.vue'

export default {
  name: 'SidebarGroup',
  props: ['item', 'first', 'open', 'collapsable'],
  components: { SidebarLink, DropdownTransition },
  methods: {
      getItemClass (item) {
        let itemClass = item.frontmatter.title.toLowerCase();
          itemClass = itemClass.replace(/ /g,"_");
          itemClass = itemClass.replace(/\(/g,"");
          itemClass = itemClass.replace(/\)/g,"");
        return itemClass;
      }
  }
}
</script>
