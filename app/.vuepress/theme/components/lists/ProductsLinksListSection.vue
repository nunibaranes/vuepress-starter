<template>
    <div class="products-list">
        <a v-for="product in products" class="product" :class="formatClass(product.frontmatter.name)" :href="$withBase(product.path)">
            <div class="product-icon" :class="formatClass(product.frontmatter.name) + '-icon'"></div>
            <div class="btn btn-link">{{product.frontmatter.productName}}</div>
        </a>
    </div>
</template>
<style lang="scss">
    @import '../../../styles/components/lists/products-links-list-section';
</style>
<script>
    export default {
        components: {},
        computed: {
            products() {
                let productsList = this.$site.pages.filter(productPage => {
                    if (productPage.frontmatter.pageType === 'product') {
                        return productPage;
                    }
                });

                productsList.sort((a,b) => {
                    a = a.frontmatter.id;
                    b = b.frontmatter.id;

                    return a-b
                });
                return productsList;
            },
        },
        methods: {
            formatClass (string) {
                return string.replace(/ /g,"-");
            }
        },
    }
</script>