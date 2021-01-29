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
    props: ['title'],
    mounted() {
        this.$route.matched.forEach((route) =>
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
