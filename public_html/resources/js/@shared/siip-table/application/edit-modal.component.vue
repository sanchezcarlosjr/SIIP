<template>
    <b-modal
        :id="'edit'"
        :title="title"
        cancel-title="Cancelar"
        :size="size"
        ok-title="Guardar cambios"
        scrollable
        :hide-footer="isDetailsForm"
        @cancel="reset"
        @ok="ok"
        :static="true"
    >
      <apollo-form
        ref="form"
        :schema="schema"
        :resource="resource"
        v-on="$listeners"
      />
    </b-modal>
</template>

<script src="./edit-modal.component.ts" lang="ts"></script>
