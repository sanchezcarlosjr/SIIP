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
