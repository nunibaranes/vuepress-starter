<template>
    <nav class="navbar" :class="bgColorClass">
        <div class="container">
            <div class="sidebar-menu" @click="$emit('toggle-sidebar')">
                <div class="btn btn-reset btn-menu">
                    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="27" viewBox="0 0 40 27">
                        <g fill="none" fill-rule="nonzero" stroke="#333537" stroke-linecap="round" stroke-width="3.92">
                            <path d="M2 2.5h36M2 13.5h36M2 24.5h36"/>
                        </g>
                    </svg>
                </div>
                <span class="no-mobile">Menu</span>
            </div>
            <a :href="$withBase('/')" class="logo">
                <img v-if="lightMode" :src="$withBase('/assets/images/logo-dark.png')" alt="">
                <img v-else-if="darkMode" :src="$withBase('/assets/images/logo-white.png')" alt="">
            </a>
        </div>
    </nav>
</template>
<script>
    export default {
        components: { },
        computed: {
            darkMode () {
                return this.$page.frontmatter.headerDarkMode || !this.$page.frontmatter.headerLightMode;
            },
            lightMode () {
                return this.$page.frontmatter.home || this.$page.frontmatter.headerLightMode;
            },
            bgColorClass () {
                return this.$page.frontmatter.topSection ? this.$page.frontmatter.topSection.bgColor : 'bg-dodger-blue' ;
            },
            hideBookADemo () {
                return this.$page.frontmatter.hideBookADemoButton === true;
            }
        },
    }
</script>