<template>
    <footer class="footer">
        <div class="container">
            <div class="main-group">
                <a :href="$withBase('/')" class="logo">
                    <img :src="$withBase('/assets/images/logo-white.png')" alt="">
                </a>
                <div class="social">
                    <h4 class="title">Stay Connected</h4>
                    <ul class="links">
                        <li><a href="https://www.facebook.com/SITENAME/" target="_blank"><img :src="$withBase('/assets/images/icons/facebook-icon.svg')" alt=""></a></li>
                        <li><a href="https://twitter.com/SITENAME" target="_blank"><img :src="$withBase('/assets/images/icons/twitter-icon.svg')" alt=""></a></li>
                        <li><a href="https://www.linkedin.com/company/SITENAME/" target="_blank"><img :src="$withBase('/assets/images/icons/linkedin-icon.svg')" alt=""></a></li>
                    </ul>
                </div>
                <div class="rights">
                    <p>Site Name</p>
                    <p>All Rights Reserved.</p>
                </div>
            </div>
            <!-- comments if you set items in config footer

                <ul class="footer-groups no-tablet no-mobile" v-if="items !== undefined && items.length">
                    <li v-for="(item, i) in items" :key="i">
                        <FooterItemsGroup
                                v-if="item.type === 'group'"
                                :item="item"
                                :first="i === 0"
                                :open="i === openGroupIndex"
                                :collapsable="item.collapsable || item.collapsible"
                        />
                        <FooterItemLink v-else :item="item"/>
                    </li>
                </ul> 
            -->
        </div>
    </footer>
</template>
<style lang="scss">
    @import '../../../styles/components/layout/footer';
</style>
<script>
    /**
     * remove comments if you set items in config footer
     */
    // import FooterItemsGroup from './FooterItemsGroup.vue'
    // import FooterItemLink from './FooterItemLink.vue'
    // import NavLinks from '../../components/nav/NavLinks.vue'
    // import { isActive } from '../../util'

    export default {
        components: { 
            // FooterItemsGroup, 
            // FooterItemLink, 
            // NavLinks 
        },
        // props: ['items'],
        data () {
            return {
                openGroupIndex: 0,
            }
        },
        created () {
            // this.refreshIndex()
        },
        watch: {
            '$route' () {
                // this.refreshIndex()
            },
        },
        mounted () {
        },
        methods: {
            // refreshIndex () {
            //     const index = resolveOpenGroupIndex(
            //         this.$route,
            //         this.items
            //     );
            //     if (index > -1) {
            //         this.openGroupIndex = index
            //     }                
            // },
            // isActive (page) {
            //     return isActive(this.$route, page.path)
            // },
        }
    }

    // function resolveOpenGroupIndex (route, items) {
    //     for (let i = 0; i < items.length; i++) {
    //         const item = items[i]
    //         if (item.type === 'group' && item.children.some(c => isActive(route, c.path))) {
    //             return i
    //         }
    //     }
    //     return -1
    // }
</script>