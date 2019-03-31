<template>
    <section class="popup" :class="{'popup-open': isOpen, 'popup-close': !isOpen,}">
        <div class="popup-overlay" @click="$emit('toggle-popup');"></div>
        <div class="popup-container" :class="{'direction-columns': this.$slots.header || this.$slots.footer }">
            <div class="btn btn-reset btn-close" @click="$emit('toggle-popup')">
                <span class="close">
                    <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 36 36">
                        <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 36 36">
                            <g fill="none" fill-rule="evenodd" stroke="#FFF" stroke-width="2">
                                <path d="M23.785 12L12 23.785M12 12l11.785 11.785"/>
                            </g>
                        </svg>
                    </svg>
                </span>
            </div>
            <div class="section-header" v-if="this.$slots.header">
                <slot name="header"/>
            </div>
            <div class="section-content">
                <slot name="main"/>
            </div>
            <div class="section-footer"  v-if="this.$slots.footer">
                <slot name="footer"/>
            </div>
        </div>
    </section>
</template>
<style lang="scss">
    @import '../../../styles/components/popup/popup';
</style>
<script>
    export default {
        props: {
            isOpen: Boolean,
        },
        mounted () {},
        computed: {},
        methods: {},
    }
</script>