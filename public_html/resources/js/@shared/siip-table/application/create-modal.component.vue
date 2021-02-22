<template>
    <b-modal id="create"
             :ok-disabled="okDisabled"
             :title="title"
             cancel-title="Cancelar"
             ok-title="Añadir"
             scrollable
             @cancel="reset"
             @ok="ok">
        <vue-form-generator
            :model="model"
            :options="formOptions"
            :schema="schema"
            @validated="onValidated">
        </vue-form-generator>
    </b-modal>
</template>

<script>
export default {
    name: "create-modal",
    props: ["okDisabled", "title", "model", "formOptions", "schema"],
    methods: {
        onValidated(event) {
            this.$emit('onValidated', event);
        },
        reset() {
            this.$emit('reset');
        },
        ok() {
            this.$emit('ok');
        }
    }
}
</script>
