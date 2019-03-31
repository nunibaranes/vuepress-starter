<template>
    <div class="standards-section">
        <div class="header">
            <h2 class="title" :class="data.titleAdditionalClass"><span>{{ data.title }}</span></h2>
        </div>
        <div class="compliance-standards-list">
            <div class="standard">
                <img :src="$withBase('/assets/images/compliance-standards-logos/dcms-logo.png')" alt="">
            </div>
            <div class="standard">
                <img :src="$withBase('/assets/images/compliance-standards-logos/group-208.png')" alt="">
            </div>
            <div class="standard">
                <img :src="$withBase('/assets/images/compliance-standards-logos/nist-logo.png')" alt="">
            </div>
            <div class="standard">
                <img :src="$withBase('/assets/images/compliance-standards-logos/enisa-logo.png')" alt="">
            </div>
            <div class="standard">
                <img :src="$withBase('/assets/images/compliance-standards-logos/csa-logo.png')" alt="">
            </div>
            <div class="standard">
                <img :src="$withBase('/assets/images/compliance-standards-logos/iot-logo.png')" alt="">
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        props: ['data'],
        components: {},
        computed: {},
        methods: {},
    }
</script>