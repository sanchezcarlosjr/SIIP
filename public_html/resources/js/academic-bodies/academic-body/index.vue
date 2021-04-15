<template>
    <div class="p-2">
        <vue-form-generator :model="model" :schema="schema"></vue-form-generator>
        <b-button class="float-right m-3" variant="primary" @click="save">Guardar cambios</b-button>
    </div>
</template>

<script lang="ts" src="./academic-body.page.ts"></script>
<style lang="scss" scoped src="./academic-body.page.scss"></style>
