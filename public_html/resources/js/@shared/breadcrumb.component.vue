<template>
    <b-breadcrumb :items="items"></b-breadcrumb>
</template>

<script>

export default {
    data() {
        return {
            items: []
        }
    },
    props: ['title', 'isAPage'],
    mounted() {
        let routes = this.$route.matched;
        if (this.isAPage) {
            routes = routes.slice(routes.length - 1);
        }
        routes.forEach((route) =>
            this.items.push({
                text: route.name,
                to: {path: route.path}
            })
        );
    },
    watch: {
        title: function (newVal, oldVal) {
            this.items[this.items.length - 1].text = newVal;
        }
    }
}
</script>
