<template>
    <ul class="social-share-buttons">
        <li v-if="shouldShowItem('facebook')" class="facebook">
            <a :href="setShareLink('facebook')" target="_blank">
                <svg xmlns="http://www.w3.org/2000/svg" width="9" height="16" viewBox="0 0 9 16">
                    <path fill="#FFF" fill-rule="nonzero" d="M8.661.003L6.502 0C4.077 0 2.51 1.546 2.51 3.938v1.815H.34A.333.333 0 0 0 0 6.08v2.63c0 .18.152.326.34.326h2.17v6.638c0 .18.152.326.34.326H5.68c.188 0 .34-.146.34-.326V9.036h2.537c.188 0 .34-.146.34-.326V6.08a.32.32 0 0 0-.099-.231.347.347 0 0 0-.24-.096H6.021V4.214c0-.74.183-1.115 1.186-1.115H8.66c.187 0 .339-.147.339-.327V.33a.333.333 0 0 0-.339-.327z"/>
                </svg>
            </a>
        </li>
        <li v-if="shouldShowItem('twitter')" class="twitter">
            <a :href="setShareLink('twitter')" target="_blank">
                <svg xmlns="http://www.w3.org/2000/svg" width="19" height="15" viewBox="0 0 19 15">
                    <path fill="#FFF" fill-rule="nonzero" d="M19 1.775a7.96 7.96 0 0 1-2.238.596A3.825 3.825 0 0 0 18.475.277a7.997 7.997 0 0 1-2.476.92A3.94 3.94 0 0 0 13.154 0C11 0 9.256 1.696 9.256 3.787c0 .297.034.586.1.863A11.175 11.175 0 0 1 1.325.692a3.679 3.679 0 0 0-.527 1.904c0 1.315.688 2.474 1.733 3.153a3.984 3.984 0 0 1-1.765-.476v.048c0 1.835 1.344 3.366 3.126 3.714-.327.086-.671.133-1.027.133-.252 0-.495-.024-.734-.07.496 1.505 1.935 2.6 3.64 2.63a7.965 7.965 0 0 1-4.84 1.62 8.52 8.52 0 0 1-.93-.052A11.25 11.25 0 0 0 5.974 15c7.17 0 11.09-5.772 11.09-10.778l-.013-.49A7.667 7.667 0 0 0 19 1.775z"/>
                </svg>
            </a>
        </li>
        <li v-if="shouldShowItem('linkedin')" class="linkedin">
            <a :href="setShareLink('linkedin')" target="_blank">
                <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15">
                    <g fill="#FFF" fill-rule="evenodd">
                        <path d="M15 15h-3.204v-4.744c0-1.133-.024-2.588-1.668-2.588-1.669 0-1.924 1.232-1.924 2.505V15H5V5.243h3.075v1.332h.043C8.547 5.81 9.593 5 11.154 5 14.4 5 15 7.02 15 9.649V15zM2 4C.893 4 0 3.104 0 2s.892-2 2-2a2.002 2.002 0 0 1 0 4zM0 15h3V5H0z"/>
                    </g>
                </svg>

            </a>
        </li>
    </ul>
</template>
<style lang="scss">
    @import '../../../styles/components/social-media/social-share-buttons';
</style>
<script>
    export default {
        props: {
            path: String,
            title: String,
            items: Array
        },
        components: {},
        computed: {},
        methods: {
            shouldShowItem (itemString) {
                const itemsArr = this.items;
                return itemsArr.some(item => item === itemString);
            },
            setShareLink (to) {
                const baseUrl = 'https://www.sitename.com' ; // window !== undefined ? window.location.protocol + "//" + window.location.host : 'https://www.sitename.com' ;
                const urlToShare = encodeURIComponent(baseUrl + this.path);

                switch (to) {
                    case 'facebook':
                        return 'https://www.facebook.com/share.php?u=' + urlToShare + '&title=' + this.title;
                        break;
                    case 'twitter':
                        return 'https://twitter.com/intent/tweet?status=' + urlToShare + this.title;
                        break;
                    case 'linkedin':
                        return 'https://www.linkedin.com/shareArticle?mini=true&url=' + urlToShare + '&title=' + this.title + '&source=' + baseUrl;
                        break;
                    default:
                        break;
                }
            }
        }
    }
</script>