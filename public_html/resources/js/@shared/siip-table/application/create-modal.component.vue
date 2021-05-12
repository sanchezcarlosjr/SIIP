<template>
    <b-modal
        :id="'create'"
        :ok-disabled="!validated"
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
            @validated="onValidated"
            ref="form"
        />
    </b-modal>
</template>

<script>
export default {
    name: "create-modal",
    props: ["okDisabled", "title", "formOptions", "schema"],
    data() {
        return {
            model: {},
            validated: false
        };
    },
    methods: {
        onValidated(event) {
          this.validated = event;
          this.$emit('onValidated', event);
        },
        reset() {
            this.model = {};
            this.validated = false;
            this.$emit('reset');
        },
        async ok(e) {
          e.preventDefault();
          await this.$refs.form.validate();
          if (this.validated) {
            this.$nextTick(() => {
              this.$bvModal.hide('create')
            })
            this.$emit('ok', this.model);
            this.reset();
          }
        }
    }
}
</script>
