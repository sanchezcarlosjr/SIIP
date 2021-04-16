<template>
    <b-link :href="'/archivo/'+value" target="_blank">{{ schema.label }}</b-link>
</template>

<script>
const VueFormGenerator = require('vue-form-generator');
const {abstractField} = VueFormGenerator;
export default {
    mixins: [abstractField],
}
</script>
