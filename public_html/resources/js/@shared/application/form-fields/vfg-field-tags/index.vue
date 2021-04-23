<template>
    <div>
        <b-form-checkbox-group
            v-if="options.length > 0"
            v-model="value"
            :options="options"
            value-field="value"
            text-field="text"
        ></b-form-checkbox-group>
        <p v-else>No hay {{schema.label}} disponibles.
            <router-link to="lgac?createResource">Cree una para continuar.</router-link>
        </p>
    </div>
</template>
<script lang="ts" src="./vfg-field-tags.ts"></script>
<style lang="scss" scoped src="./vfg-field-tags.scss"></style>
