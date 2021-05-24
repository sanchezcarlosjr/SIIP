<template>
    <div class="p-2">
      <apollo-form
        ref="form"
        :schema="formSchemas.create"
        :resource="resource"
      />
      <b-button
        class="float-right m-3"
        variant="primary"
        @click="save"
        :disabled="busy"
      >
        Guardar cambios
      </b-button>
    </div>
</template>

<script lang="ts" src="./academic-body.page.ts"></script>
