<template>
    <div>
        <b-form-input
            :id="schema.model"
            v-model="value"
            :list="schema.model.concat('select')"
            autocomplete="off"
            :readonly="schema.readonly"
            :required="schema.required"
            debounce="500"
        ></b-form-input>
        <datalist :id="schema.model.concat('select')">
            <option v-for="option in options" :value="option.value">{{ option.text }}</option>
        </datalist>
    </div>
</template>
<script lang="ts" src="./vfg-field-select-graphql-id.ts"></script>
<style lang="scss" scoped src="./vfg-field-select-graphql-id.scss"></style>
