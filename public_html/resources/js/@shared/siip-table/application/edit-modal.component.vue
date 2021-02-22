<template>
    <b-modal
        :id="'edit'+title"
        :title="title"
        cancel-title="Cancelar"
        ok-title="Aceptar cambios"
        scrollable
        @cancel="reset"
        @ok="ok"
    >
        <vue-form-generator :model="model" :schema="schema"></vue-form-generator>
    </b-modal>
</template>

<script>
export default {
    name: "edit-modal",
    props: ["model", "schema", "title"],
    methods: {
        reset() {
            this.$emit('reset');
        },
        ok() {
            this.$emit('ok');
        }
    }
}
</script>
