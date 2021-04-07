<template>
    <div>
        <b-form-input
            :id="schema.model"
            v-model="value"
            :list="schema.model.concat('select')"
            :readonly="schema.readonly"
            :required="schema.required"
            :state="idState"
            debounce="500"
            trim
            @blur="handleBlur"
            @change="showFeedback"
        ></b-form-input>
        <b-form-invalid-feedback :id="schema.model.concat('feedback')">
            Ingresa un recurso correcto.
        </b-form-invalid-feedback>
        <b-form-text :id="schema.model.concat('text')">{{ feedback }}</b-form-text>
        <datalist :id="schema.model.concat('select')">
            <option v-for="option in options" :value="option.value">{{ option.text }}</option>
        </datalist>
    </div>
</template>
<script lang="ts" src="./vfg-field-select-graphql-id.ts"></script>
<style lang="scss" scoped src="./vfg-field-select-graphql-id.scss"></style>
