<template>
    <header>
        <!-- discober-nav  -->
        <div class="main-header" :class="headerClass">
            <Navbar @toggle-sidebar="$emit('toggle-sidebar')"></Navbar>
        </div>
    </header>
</template>
<style lang="scss">
    @import '../../../styles/components/layout/header';
</style>
<script>
    import Navbar from "./Navbar";

    export default {
        components: {Navbar},
        data () {
            return {
                scrolled: false,
                stickyHeader: false
            };
        },
        computed: {
            data () {
                return this.$page.frontmatter;
            },
            headerClass () {
                return  {
                    'light-mode':   this.$page.frontmatter.headerLightMode || this.$page.frontmatter.home  ,
                    'dark-mode':    !this.$page.frontmatter.home || !this.$page.frontmatter.headerLightMode || this.$page.frontmatter.headerDarkMode,
                    'sticky': this.stickyHeader
                }
            },
        },
        mounted () {
            window.addEventListener('scroll', this.handleScroll)
        },
        methods: {
            handleScroll () {
                let navbar = document.querySelector(".navbar");
                let sticky = navbar.offsetTop;
                if (window.pageYOffset > sticky) {
                    this.stickyHeader = true;
                } else {
                    this.stickyHeader = false;
                }
            }
        },
        destroyed () {
            window.removeEventListener('scroll', this.handleScroll);
        }
    }
</script>