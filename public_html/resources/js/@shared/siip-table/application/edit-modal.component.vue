<template>
    <b-modal
        :id="'edit'"
        :title="title"
        cancel-title="Cancelar"
        :size="size"
        ok-title="Guardar cambios"
        scrollable
        @cancel="reset"
        @ok="ok"
    >
        <edit-component ref="form" :itemId="itemId" :resource="resource" :schema="schema"></edit-component>
    </b-modal>
</template>

<script>
import EditComponent from './edit.component.vue';

export default {
    components: {
        EditComponent
    },
    name: "edit-modal",
    props: ["size", "schema", "title", 'resource', 'itemId'],
    methods: {
        reset() {
            this.$emit('reset');
        },
        ok() {
            delete this.$refs.form.model.__typename;
            this.$emit('ok', this.$refs.form.model);
        }
    }
}
</script>
