<template>
    <div class="home-page">
        <nav class="page-vertical-nav no-tablet no-mobile">
            <ul>
                <li v-for="(section, index) in this.sections" :key="index" class="item" >
                    <div class="item-nav" :data-scroll-to="section.elem.id" :class="{'active': section.isActive}" @click="onClickPageVerticalNavItem(section)">
                        <span class="cd-dot"></span>
                    </div>
                </li>
            </ul>
        </nav>
        <Section :id="data.topSection.id"
                 :isMaskedSection="data.topSection.isMaskedSection"
                 :class="homeSectionClasses(data.topSection)">
            <slot name="section-main" slot="main">
                <div class="content">
                    <h1 class="title main-title"><span>{{ data.topSection.title }}</span></h1>
                    <p class="text">{{ data.topSection.text }}</p>
                </div>
            </slot>
        </Section>
        <Section v-for="(section, index) in data.sections"
                 :key="section.id"
                 :id="section.id"
                 :class="homeSectionClasses(section)">
            <slot v-if="section.header" name="section-header" slot="header">
                <h2 class="title" :class="section.titleAdditionalClass"><span>{{ section.title }}</span></h2>
                <h6 v-if="section.subtitle" class="sub-title"><span>{{ section.subtitle }}</span></h6>
            </slot>
            <slot name="section-main" slot="main">
                <div v-if="section.figure" class="figure">
                    <img :src="$withBase(section.figure.src)" alt="">
                </div>
                <div class="content">
                    <h2 v-if="!section.header" class="title" :class="section.titleAdditionalClass"><span>{{ section.title }}</span></h2>
                    <h6 v-if="!section.header && section.subtitle" class="sub-title"><span>{{ section.subtitle }}</span></h6>
                    <p v-if="section.text" class="text">{{ section.text }}</p>
                </div>
            </slot>
        </Section>
    </div>
</template>
<style lang="scss">
    @import '../../../../styles/templates/home/home';
</style>
<script>
    import Section from '../../../components/sections/Section.vue'

    export default {
        components: {Section},
        mounted () {
            window.addEventListener("scroll", this.handleHomeScroll);
            const home = document.querySelector('.home-page');
            const sections = Array.from(home.querySelectorAll('.home-section'));

            this.sections = sections.map((section, index) => {
                this.totalHomeSectionsHeight += section.offsetHeight;
                return {'elem': section, 'isActive': index === 0};
            });
        },
        beforeDestroy() {
            window.removeEventListener("scroll", this.handleHomeScroll)
        },
        data () {
          return {
              sections: [],
              totalHomeSectionsHeight: 0,
              isVideosSteps: true,
          }
        },
        computed: {
            data () {
                return this.$page.frontmatter;
            },
            /**
             * set Tabs data content
             */
            setTabsData () {
                const sectionTabs = this.data.sections.find(section => {
                    if (section.id === 'section4' && section.tabsData) {
                        return section;
                    }
                });
                return sectionTabs.tabsData.map(tab => {
                    let tabPanelSteps = null;
                    if (tab.panel.steps) {
                        const tabId = tab.id;
                        let index = 1;
                        tabPanelSteps = tab.panel.steps.map((step) => {
                            const data = {
                                id: tabId + '_' + index,
                                stepNum: '_' + index,
                                isActive: false,
                                label: step.label,
                                src: step.src
                            };
                            index++;
                            return data;
                        });
                    }
                    return {
                        id: tab.id,
                        isActive: false,
                        title: tab.title,
                        shortTitle: tab.shortTitle,
                        panel: {
                            headerTitle: tab.panel.headerTitle ? tab.panel.headerTitle : null,
                            steps: tabPanelSteps,
                        }
                    };
                });
            },
        },
        methods: {
            /**
             * set home scroll methods
             */
            handleHomeScroll () {
                this.setPageVerticalNavActiveItemSection();
            },
            /**
             * set active section in page-vertical-nav on scroll
             */
            setPageVerticalNavActiveItemSection () {
                let fromTop = window.scrollY;
                let windowHeight = window.innerHeight;
                let verticalCenterPos = fromTop + (windowHeight / 3);
                let offset = document.documentElement.scrollTop + window.innerHeight;
                let scrolledToBottom = offset > this.totalHomeSectionsHeight;
                this.sections.map((section, index) => {
                    if (!scrolledToBottom) {
                        let sectionElem = section.elem;
                        section.isActive = sectionElem.offsetTop <= verticalCenterPos && sectionElem.offsetTop + sectionElem.offsetHeight > verticalCenterPos;
                    } else  {
                        section.isActive = (this.sections.length - 1) === index;
                    }
                });
            },
            /**
             * set active section in page-vertical-nav on click
             * @param clickedSection: object
             */
            onClickPageVerticalNavItem (clickedSection) {
                this.scrollToElement(clickedSection.elem.offsetTop);
                setTimeout(() => {
                    for (let i = 0; this.sections.length > i ; i++) {
                        const sectionObj = this.sections[i];
                        sectionObj.isActive = clickedSection === sectionObj;
                    }
                }, 1500)
            },
            scrollToElement(pos) {
                const currentPos = window.scrollY||window.screenTop;
                if(currentPos<pos){
                    for(let i = currentPos; i <= pos; i+=10){
                        setTimeout(function(){
                            window.scrollTo(0, i);
                        }, 0);
                    }
                } else {
                    let i = currentPos;
                    let x;
                    x = setInterval(function(){
                        window.scrollTo(0, i);
                        i -= 10;
                        if(i<=pos){
                            clearInterval(x);
                        }
                    }, 0);
                }
            },
            /**
             * set section classes
             * @param section
             * @returns {*[]}
             */
            homeSectionClasses (section) {
                return [
                    'home-section',
                    (section.id) ,
                    section.bgColor,
                    section.additionalClass
                ]
            },
        },
    }
</script>

