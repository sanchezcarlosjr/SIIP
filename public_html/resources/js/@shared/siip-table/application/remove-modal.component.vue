<template>
    <b-modal id="remove" :title="title" cancel-title="Cancelar" ok-title="Si, deseo eliminar"
             scrollable @hide="reset" @ok="ok">
        <p>¿Realmente desea eliminar a este {{ resource }}?</p>
        <p class="text-warning"><small>Esta acción no puede ser revertida.</small></p>
    </b-modal>
</template>

<script>
export default {
    name: "remove-modal",
    props: ["title", "resource"],
    methods: {
        reset() {
            this.$emit('reset');
        },
        ok() {
            this.$emit('ok');
        },
    }
}
</script>
