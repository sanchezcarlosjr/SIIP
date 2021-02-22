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
    props: ['isAPage'],
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
        '$route.matched': function (newVal, oldVal) {
            this.items = []
            newVal.forEach((route) =>
                this.items.push({
                    text: route.name,
                    to: {path: route.path}
                })
            );
        }
    }
}
</script>
