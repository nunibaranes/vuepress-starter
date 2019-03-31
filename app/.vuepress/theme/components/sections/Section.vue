<template>
    <section :id="id" class="section">
        <div class="container" :class="{'direction-columns': this.$slots.header || this.$slots.footer }">
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
    @import '../../../styles/components/sections/section';
</style>
<script>
    export default {
        data () {
            return {
            }
        },
        props: {
            id: String,
        },

        computed: {
        },

        methods: {

        },
        mounted () {

        },
    }
</script>