<template>
    <div>
        <b-form-input
            :readonly="schema.readonly"
            :id="schema.model"
            v-model="value"
            :list="schema.model.concat('select')"
            :required="schema.required"
            :state="idState"
            debounce="100"
            trim
            @blur="handleBlur"
        ></b-form-input>
        <b-form-invalid-feedback :id="schema.model.concat('feedback')">
            Ingresa un recurso correcto.
        </b-form-invalid-feedback>
        <b-form-text :id="schema.model.concat('text')">{{ texts[value] }}</b-form-text>
        <datalist :id="schema.model.concat('select')">
            <option v-for="option in options" :value="option.value">{{ option.text }}</option>
        </datalist>
    </div>
</template>
<script lang="ts" src="./vfg-field-select-graphql.ts"></script>
<style lang="scss" scoped src="./vfg-field-select-graphql.scss"></style>
