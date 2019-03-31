<template>
  <div class="sidebar-wrapper">
    <div class="sidebar-mask" @click="$emit('toggle-sidebar')"></div>
    <div class="sidebar">
        <div class="btn btn-reset btn-close" @click="$emit('toggle-sidebar')">
            <span class="close">
                <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 36 36">
                    <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 36 36">
                        <g fill="none" fill-rule="evenodd" stroke="#FFF" stroke-width="2">
                            <path d="M23.785 12L12 23.785M12 12l11.785 11.785"/>
                        </g>
                    </svg>
                </svg>
            </span>
            <span class="text">Close</span>
        </div>
        <NavLinks/>
        <slot name="top"/>
        <ul class="sidebar-links" v-if="items.length">
          <li v-for="(item, i) in items" :key="i" :class="'sidebar-group-' + i">
            <SidebarGroup
                    v-if="item.type === 'group'"
                    :item="item"
                    :first="i === 0"
                    :open="i === openGroupIndex"
                    :collapsable="item.collapsable || item.collapsible"
                    @toggle="toggleGroup(i)"
            />
            <SidebarLink v-else :item="item"/>
          </li>
        </ul>
        <slot name="bottom"/>
    </div>
  </div>
</template>
<style lang="scss">
    @import '../../../styles/components/layout/sidebar';
</style>
<script>
import SidebarGroup from './SidebarGroup.vue'
import SidebarLink from './SidebarLink.vue'
import NavLinks from '../../components/nav/NavLinks.vue'
import { isActive } from '../../util'
export default {
  components: { SidebarGroup, SidebarLink, NavLinks },

  props: ['items', 'isOpen'],

  data () {
    return {
      openGroupIndex: 0,
    }
  },

  created () {
    this.refreshIndex()
  },

  watch: {
    '$route' () {
      this.refreshIndex()
    },
  },
  mounted () {
      this.sidebar = document.querySelector('.sidebar-wrapper');
  },
  methods: {
    refreshIndex () {
      const index = resolveOpenGroupIndex(
        this.$route,
        this.items
      );
      if (index > -1) {
        this.openGroupIndex = index
      }
    },
    toggleGroup (index) {
      this.openGroupIndex = index === this.openGroupIndex ? -1 : index
    },

    isActive (page) {
      return isActive(this.$route, page.path)
    },

  }
}

function resolveOpenGroupIndex (route, items) {
  for (let i = 0; i < items.length; i++) {
    const item = items[i]
    if (item.type === 'group' && item.children.some(c => isActive(route, c.path))) {
      return i
    }
  }
  return -1
}
</script>

