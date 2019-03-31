<template>
    <div class="theme-container" :class="pageClasses" @touchstart="onTouchStart" @touchend="onTouchEnd">
        <div class="main-theme-container">
            <!-- header -->
            <Header @toggle-sidebar="toggleSidebar"/>
            <!-- sidebar -->
            <Sidebar :class="{'sidebar-open': this.isSidebarOpen, 'sidebar-close': !this.isSidebarOpen,}"
                     :isOpen="this.isSidebarOpen"
                     :items="sidebarItems"
                     @toggle-sidebar="toggleSidebar">
            </Sidebar>
            <!-- MainSection -->
            <MainSection/>
            <!-- Footer -->
            <!-- <Footer :items="footerItems"></Footer> -->
            <Footer></Footer>
        </div>
    </div>
</template>
<style lang="scss">
    @import '../styles/theme.scss';
</style>
<script>
    import Vue from 'vue'
    import NotFound from "./NotFound.vue";
    import Header from './layouts/header/Header.vue'
    import Sidebar from './layouts/sidebar/Sidebar.vue'
    import MainSection from './layouts/main-section/MainSection.vue'
    import Footer from './layouts/footer/Footer.vue'
    import nprogress from 'nprogress'
    import { resolveSidebarItems, resolveFooterItems } from './util'
    import UAParser from 'ua-parser-js'

    export default {
        components: {
            NotFound,
            Header,
            Sidebar,
            MainSection,
            Footer,
        },
        data () {
            return {
                isSidebarOpen: false,
                sidebar: null,
            }
        },
        mounted () {
            window.parseUA = new UAParser();
            // settings
            window.addEventListener('scroll', this.onScroll);
            this.isSidebarOpen = false;
            this.sidebar = document.querySelector('.sidebar-wrapper');

            // update meta tag and add scripts
            this.updateTitle();
            updateThemeColorMetaTag(this.themeColor);

            //route
            this.$router.beforeEach((to, from, next) => {
                if (to.path !== from.path && !Vue.component(to.name)) {
                    nprogress.start()
                }
                next()
            });

            this.$router.afterEach(() => {
                nprogress.done();
                this.isSidebarOpen = false
            });
        },
        watch: {
            '$route' () {
                this.updateTitle();
                this.updateThemeColor();
            },
        },
        computed: {
            /**
             * themeColor - set page's theme-color
             * get from page frontmatter the color of topSection object, and set the color code
             * @returns {String}
             */
            themeColor () {
                const { frontmatter } = this.$page;
                let topSectionBgColor = frontmatter.topSection && frontmatter.topSection.bgColor ? frontmatter.topSection.bgColor : 'bg-dodger-blue';
                let themeColor = '' ;
                switch (topSectionBgColor) {
                    case 'bg-dodger-blue':
                    case 'bg-gray':
                        themeColor = '#00569e';
                        break;
                    case 'bg-blush-pink':
                        themeColor = '#ff8183';
                        break;
                    case 'bg-aqua-marine':
                        themeColor = '#35d0ad';
                        break;
                    case 'bg-orangey-yellow':
                        themeColor = '#ffad18';
                        break;
                    case 'bg-sapphire':
                        themeColor = '#1d4ba5';
                        break;
                    default:
                        break;
                }

                return themeColor;
            },
            /**
             * shouldShowSidebar
             * check if page should show sidebar, if sidebar has items
             * @returns {Number}
             */
            shouldShowSidebar () {
                return (
                    this.sidebarItems.length
                )
            },
            /**
             * sidebarItems
             * get sidebar items (config.js)
             * @returns {Array}
             */
            sidebarItems () {
                return resolveSidebarItems(
                    this.$page,
                    this.$route,
                    this.$site,
                    this.$localePath
                )
            },
            /**
             * footerItems
             * get footer items (config.js)
             * @returns {Array}
             */
            footerItems () {
                return resolveFooterItems(
                    this.$page,
                    this.$route,
                    this.$site,
                    this.$localePath
                )
            },
            /**
             * pageClasses
             * set array of page's classes
             * @returns {Array}
             */
            pageClasses () {
                const userPageClass = this.$page.frontmatter.pageAdditionalClass;
                const pageBackgroundColor = this.$page.frontmatter.pageBackgroundColor;
                return [
                    {
                        'post-page': this.isPostPage,
                        'sidebar-open': this.isSidebarOpen,
                        'no-sidebar': !this.shouldShowSidebar,
                    },
                    userPageClass,
                    pageBackgroundColor
                ]
            },
            /**
             * isPostPage
             * check if page is under blog directory and check frontmatter property
             * @returns {boolean}
             */
            isPostPage () {
                const isPostPage = this.$page.path.indexOf('/blog/') > -1;

                return !this.$page.frontmatter.home && !this.$page.frontmatter.template  && isPostPage ;
            },
        },
        methods: {
            updateTitle () {
                // override title and description
                updateOverrideTitle(this.$title, this.$page.frontmatter.overrideTitle);
            },
            updateThemeColor () {
                // override title and description
                updateThemeColorMetaTag(this.themeColor);
            },
            /**
             * login
             * set this.userLoggedIn variable
             * @param to
             */
            login (to) {
                this.userLoggedIn = typeof to === 'boolean' ? to : !this.userLoggedIn;
            },
            /**
             * toggleSidebar
             * set this.isSidebarOpen variable
             * @param to
             */
            toggleSidebar (to) {
                this.isSidebarOpen = typeof to === 'boolean' ? to : !this.isSidebarOpen;
            },
            // side swipe
            onTouchStart (e) {
                this.touchStart = {
                    x: e.changedTouches[0].clientX,
                    y: e.changedTouches[0].clientY
                }
            },
            onTouchEnd (e) {
                const dx = e.changedTouches[0].clientX - this.touchStart.x
                const dy = e.changedTouches[0].clientY - this.touchStart.y
                if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 40) {
                    if (dx > 0 && this.touchStart.x <= 80) {
                        this.toggleSidebar(true)
                    } else {
                        this.toggleSidebar(false)
                    }
                }
            },
        },
        beforeDestroy () {
            this.updateTitle();

            updateThemeColorMetaTag(this.themeColor);
        }
    }

    /**
     * updateOverrideTitle
     * @param originalTitle
     * @param pageOverrideTitle
     */
    function updateOverrideTitle(originalTitle, pageOverrideTitle) {
        document.title = pageOverrideTitle ? pageOverrideTitle + ' | ' + originalTitle : originalTitle ;
    }
    /**
     * updateThemeColorMetaTag
     * @param value
     */
    function updateThemeColorMetaTag (value) {
        const metas = document.getElementsByTagName('meta');
        let currentThemeColor = null;

        for (let i = 0; i < metas.length; i++) {
            if (metas[i].getAttribute('name') === 'theme-color') {
                currentThemeColor = metas[i];
            }
        }

        if (currentThemeColor) {
            currentThemeColor.setAttribute('content', value);
        } else {
            const tag = document.createElement('meta');
            tag.setAttribute('name', 'theme-color');
            tag.setAttribute('content', value);
            document.head.appendChild(tag);
        }
    }


</script>
